/**
 * Module dependencies.
 */

import debug from 'debug';

/**
 * Uses debug
 * @param {String} tag 
 * @param {*} text 
 * Usage: print('tag', 'text')
 * Extra tags can be used by print(['tag', 'tag', 'text'])
 */

function print(tag, text) {
  if (typeof(text) === 'string') {
    debug(`Set2Score:${tag}`)(text);
  }

  if (text instanceof Array) {
    let extraTags = '';
    let actualText = text.pop();

    for (let i = 0; i < text.length; i++) {
      extraTags += `:${text[i]}`;      
    }

    debug(`Set2Score:${tag}${extraTags}`)(actualText);
  }
};

/**
 * Defines top level tags for print
 */

const Debug = {
  server(text) {
    print('Server', text);
  },

  database(text) {
    print('Database', text);
  },

  auth(text) {
    print('Auth', text);
  }
};

export default Debug;
