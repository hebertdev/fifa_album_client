import { useState, useEffect, useContext } from "react";

//next modified
import RouterLink from "components/Next/Link";

//react confetti
import Confetti from "react-confetti";

//services
import { get_questions, question_answerer } from "services/questions";

//context
import AlertContext from "contexts/AlertContext";
import UserContext from "contexts/UserContext";

//materail
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Toolbar,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

//assets
import cover_min from "assets/sobre.webp";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await get_questions();
        setQuestions(data.results);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, []);

  return (
    <>
      <Toolbar />
      <Container
        disableGutters
        sx={{
          padding: "15px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Gana sobres de stickers respondiendo preguntas
        </Typography>

        {questions.map((question) => (
          <QuestionCard key={question.slug} question={question} />
        ))}
      </Container>
    </>
  );
}

function QuestionCard({ question }) {
  const [questionModified, setQuestionModified] = useState(question);
  const { alertSms } = useContext(AlertContext);
  const { setTotalPacks, totalPacks } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  useEffect(() => {
    setIsExpanded(questionModified.is_participant);
  }, [questionModified]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleQuestionAnswerer = async () => {
    try {
      const data = await question_answerer(questionModified.slug, {
        answer: value,
      });
      setQuestionModified(data.question);
      if (data.is_correct) {
        alertSms("Respuesta correcta", "success", true);
        setTotalPacks(totalPacks + 1);
        setAnswerIsCorrect(true);
      } else {
        alertSms("Respuesta incorrecta", "error", true);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) {
        //convert object to string
        const sms = Object.values(error.response.data).join(" ");
        alertSms(sms, "error", true);
      } else {
        alertSms("error al responder la pregunta", "error", true);
      }
    }
  };

  const handleClose = () => {
    setAnswerIsCorrect(false);
  };

  return (
    <>
      <Accordion
        expanded={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
        sx={{
          backgroundColor: `${
            questionModified.is_participant ? "#9b002e0f" : ""
          }`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={questionModified.slug + "-header"}
        >
          <Typography>
            {" "}
            <b>{questionModified.question}</b>{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {questionModified.picture && (
            <picture>
              <img
                src={questionModified.picture}
                alt={questionModified.question}
                style={{
                  maxWidth: "150px",
                }}
              />
            </picture>
          )}
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <FormLabel id={questionModified.slug}>
              {" "}
              {questionModified.is_participant
                ? "Ya respondiste a esta pregunta"
                : "Marca la respuesta correcta"}{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby={questionModified.slug}
              value={value}
              onChange={handleChange}
            >
              {questionModified.answers.map((answer) => (
                <FormControlLabel
                  key={answer.slug}
                  value={answer.slug}
                  control={<Radio />}
                  label={answer.answer}
                  sx={{
                    border: `${
                      answer.is_participant
                        ? `${
                            answer.is_correct === true
                              ? "2px solid green"
                              : "2px solid red"
                          }`
                        : "none"
                    }`,
                    borderRadius: "5px",
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <br />
          {!questionModified.is_participant && (
            <Button
              onClick={handleQuestionAnswerer}
              variant="outlined"
              disabled={!value.length > 0}
            >
              <Typography>Enviar</Typography>
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      {answerIsCorrect && <Confetti />}

      <Dialog open={answerIsCorrect} onClose={handleClose}>
        <DialogContent>
          <Typography sx={{ textAlign: "center" }}>
            <b>¡Felicidades!</b> <br /> Has ganado un sobre de stickers
          </Typography>
          <Card sx={{ height: "100%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={cover_min.src}
                alt="cover"
                sx={{ height: "100%", maxWidth: "300PX" }}
              />
            </CardActionArea>
          </Card>
          <Button
            variant="contained"
            size="small"
            sx={{
              margin: "auto",
              mt: 2,
              display: "block",
              textAlign: "center",
            }}
            component={RouterLink}
            href="/worldcup/packs"
          >
            Ir a mis sobres
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
