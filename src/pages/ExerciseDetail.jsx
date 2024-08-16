import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { fetchData, fetchDataYouTube } from "../utils/fetchData";
import Details from "../components/Details";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const { id: exerciseid } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        let fetchedExercise = {};
        let fetchedExerciseVideos = [];

        if (exerciseid) {
          fetchedExercise = await fetchData(`exercises/exercise/${exerciseid}`);
        setExerciseDetail(fetchedExercise);

     
          if(fetchedExercise.name) {
            fetchedExerciseVideos = await fetchDataYouTube(`search?query=${exerciseDetail.name}`);
        setExerciseVideos(fetchedExerciseVideos);

          }
        }

      } catch (error) {
        console.error("Error fetching exercise data", error);
      }
    };

    fetchExercisesData();
  }, [exerciseid]);

  console.log(exerciseDetail);
  return (
    <Box>
      <Details exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises />
    </Box>
  );
};

export default ExerciseDetail;
