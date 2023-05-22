/**
 * Module dependencise
 */

import { access, unlink } from 'fs/promises';
import path from "path";
import { Debug } from '../utilities.js';

const { IMAGES_FOLDER } = process.env;

const Image = {
  /**
   * Deletes file from filesystem
   * @param {String} filename 
   * @param {(error, success: Boolean)} callback 
   */

  async remove(filename, callback = null) {
    // make sure filename is not an empty string
    if (filename.trim().length === 0) {
      if (callback) callback({ code: 500, message: 'Empty filename' });
      return;
    }

    const filepath = path.resolve(IMAGES_FOLDER + filename);

    try {
      // check if file exists
      await access(filepath);

      // remove file if exists
      await unlink(filepath);

      Debug.server('File Deleted');

      if (callback) callback(null, true);
    } catch (error) {
      Debug.server('Failed to Delete File');
      console.log(error);
      if (callback) callback({ code: 500, message: error });
    }
  }
}

export default Image;
