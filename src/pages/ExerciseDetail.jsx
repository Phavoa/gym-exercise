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
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id: exerciseid } = useParams();

  // Fetch exercise details
  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        if (exerciseid) {
          const fetchedExercise = await fetchData(
            `exercises/exercise/${exerciseid}`
          );
          setExerciseDetail(fetchedExercise);
        }
      } catch (error) {
        console.error("Error fetching exercise detail", error);
      }
    };

    fetchExerciseDetail();
  }, [exerciseid]);

  useEffect(() => {
    const fetchExerciseRelatedData = async () => {
      try {
        const { name, target, equipment } = exerciseDetail;
        
        // Ensure all necessary fields are available before fetching related data
        if (name && target && equipment) {
          const [
            fetchedExerciseVideos,
            targetExerciseData,
            equipmentExerciseData,
          ] = await Promise.all([
            fetchDataYouTube(`search?query=${name}`),
            fetchData(`exercises/target/${target}`),
            fetchData(`exercises/equipment/${equipment}`),
          ]);

          setExerciseVideos(fetchedExerciseVideos.contents);
          setTargetMuscleExercises(targetExerciseData);
          setEquipmentExercises(equipmentExerciseData);
        }
      } catch (error) {
        console.error("Error fetching exercise related data", error);
      }
    };

    fetchExerciseRelatedData();
  }, [exerciseDetail]);

  // console.log(equipmentExercises);

  return (
    <Box>
      <Details exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
