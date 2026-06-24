import cron from 'node-cron';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';

export const startCronJobs = () => {
  // Run every day at midnight (00:00)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily task to generate sample shows...');
    await generateSampleShows();
  });
};

export const generateSampleShows = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if any shows exist for today
    const existingShows = await Show.find({
      showDateTime: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // If there are already shows, do not create sample shows
    if (existingShows.length > 0) {
      console.log('Shows already exist for today. Skipping sample show generation.');
      return;
    }

    // Pick 4 random movies
    const randomMovies = await Movie.aggregate([{ $sample: { size: 4 } }]);

    if (randomMovies.length === 0) {
      console.log('No movies found to generate shows.');
      return;
    }

    const showsToCreate = [];

    randomMovies.forEach((movie) => {
      // Create a few sample show times for each movie (e.g., 10:00 AM, 2:00 PM, 6:00 PM)
      const showTimes = [10, 14, 18];

      showTimes.forEach((hour) => {
        const showDate = new Date();
        showDate.setHours(hour, 0, 0, 0);

        showsToCreate.push({
          movie: movie._id,
          showDateTime: showDate,
          showPrice: 150, // Default sample price
          occupiedSeats: {}
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
      console.log(`Successfully generated ${showsToCreate.length} sample shows for 4 random movies.`);
    }
  } catch (error) {
    console.error('Error generating sample shows:', error);
  }
};
