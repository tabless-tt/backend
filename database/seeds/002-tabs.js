
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
        userId: 1,  
        title: 'google', 
        website: 'https://google.com/',
        catagory: 'search engine',
        favicon: 'https://www.google.com/favicon.ico',
        description: 'This is my favorite search engine'
      },
      {
        userId: 1,  
        title: 'twitter', 
        website: 'https://twitter.com/',
        catagory: 'socialmedia',
        favicon: 'https://twitter.com/favicon.ico',
        description: 'always using twitter'
      },
      ]);
    });
};
