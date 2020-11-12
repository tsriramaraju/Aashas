import { connect, ConnectionOptions } from 'mongoose';
import 'colors';

/**
 * Helps in connecting to mongodb atlass
 * @param uri - URL for database connection
 * @param options  - Connection settings
 */
export const connectDB = async (uri: string, options: ConnectionOptions) => {
  try {
    await connect(uri, options);
    console.log(`Database connected...`.green);
  } catch (err) {
    console.log(`error in connection Database\n${err}`.red);

    process.exit(1);
  }
};
