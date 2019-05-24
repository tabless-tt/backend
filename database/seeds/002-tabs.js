
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tabs')
  // .del()
    .then(function () {
      // Inserts seed entries
      return knex('tabs').insert([
        {
        user_id: 1,  
        // user: 'lambda',
        title: 'google', 
        website: 'https://google.com/',
        category: 'search engine',
        favicon: 'https://www.google.com/favicon.ico',
        description: 'This is my favorite search engine'
      },
      {
        user_id: 1, 
        // user: 'lambda', 
        title: 'twitter', 
        website: 'https://twitter.com/',
        category: 'socialmedia',
        favicon: 'https://twitter.com/favicon.ico',
        description: 'always using twitter'
      },
      {
        user_id: 3, 
        // user: 'lambda', 
        title: 'twitter', 
        website: 'https://twitter.com/',
        category: 'socialmedia',
        favicon: 'https://twitter.com/favicon.ico',
        description: 'always using twitter'
      },
      ]);
    });
};
