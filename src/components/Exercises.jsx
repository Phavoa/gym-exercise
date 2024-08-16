import { Stack, Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import { useEffect, useState } from "react";

const Exercises = ({ setExercises, exercises, bodyPart }) => {

    // console.log(exercises)
    const [currentPage, setCurrentpage] = useState(1);
    const exercisePerPage = 9;

    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    // const indexPagedExercise = currentPage * 9;
    // const pagedExercise = [...exercises].splice(currentPage, indexPagedExercise)

    const paginate = (e, value) => {
        setCurrentpage(value);

        window.scroll({top: 1200, behavior: 'smooth'})
    }

    useEffect(() => {
        const fetchExercisesData = async () => {
            try {
                let fetchedExercises = [];

                if (bodyPart === "all") {
                    fetchedExercises = await fetchData("exercises");
                } else {
                    fetchedExercises = await fetchData(`exercises/bodyPart/${bodyPart}`);
                }

                setExercises(fetchedExercises);
            } catch (error) {
                console.error(error);
            }
        };

        fetchExercisesData();
    }, [bodyPart, setExercises]);
    // console.log(exercises)
  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            count={Math.ceil(exercises.length / exercisePerPage)}
            color="standard"
            shape="rounded"
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
