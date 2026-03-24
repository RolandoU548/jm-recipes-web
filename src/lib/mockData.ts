// src/lib/mockData.ts
// Fallback mock data used when Sanity env vars are absent or queries return empty.

export const mockRecipes = [
  {
    _id: 'mock-recipe-1',
    _type: 'recipe',
    title: 'Fluffy Blueberry Pancakes',
    slug: { current: 'fluffy-blueberry-pancakes' },
    mainImage: null,
    prepTime: 10,
    cookTime: 20,
    rating: 4.8,
    tags: ['Breakfast', 'Easy', 'Vegetarian'],
    _createdAt: '2024-03-15T10:00:00Z',
    ingredients: [
      { _type: 'block', _key: 'i1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: '1 ½ cups all-purpose flour', marks: [] }] },
      { _type: 'block', _key: 'i2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: '2 tablespoons sugar', marks: [] }] },
      { _type: 'block', _key: 'i3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: '1 teaspoon baking powder', marks: [] }] },
      { _type: 'block', _key: 'i4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's4', text: '½ teaspoon baking soda', marks: [] }] },
      { _type: 'block', _key: 'i5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: '1 cup buttermilk', marks: [] }] },
      { _type: 'block', _key: 'i6', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's6', text: '1 egg', marks: [] }] },
      { _type: 'block', _key: 'i7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: '1 cup fresh blueberries', marks: [] }] },
      { _type: 'block', _key: 'i8', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's8', text: '2 tablespoons melted butter', marks: [] }] },
    ],
    instructions: [
      { _type: 'block', _key: 'inst1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'In a large bowl, whisk together flour, sugar, baking powder, and baking soda.', marks: [] }] },
      { _type: 'block', _key: 'inst2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'In a separate bowl, mix buttermilk, egg, and melted butter.', marks: [] }] },
      { _type: 'block', _key: 'inst3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: 'Pour wet ingredients into dry and stir until just combined. Fold in blueberries.', marks: [] }] },
      { _type: 'block', _key: 'inst4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'Heat a non-stick skillet over medium heat. Pour ¼ cup batter per pancake and cook until bubbles form, then flip.', marks: [] }] },
      { _type: 'block', _key: 'inst5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'Serve warm with maple syrup and extra blueberries.', marks: [] }] },
    ],
  },
  {
    _id: 'mock-recipe-2',
    _type: 'recipe',
    title: 'Creamy Avocado Pasta',
    slug: { current: 'creamy-avocado-pasta' },
    mainImage: null,
    prepTime: 15,
    cookTime: 15,
    rating: 4.6,
    tags: ['Lunch', 'Vegan', 'Gluten-Free Option'],
    _createdAt: '2024-03-16T10:00:00Z',
    ingredients: [
      { _type: 'block', _key: 'i1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: '300g pasta of choice', marks: [] }] },
      { _type: 'block', _key: 'i2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: '2 ripe avocados', marks: [] }] },
      { _type: 'block', _key: 'i3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: '2 cloves garlic', marks: [] }] },
      { _type: 'block', _key: 'i4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'Juice of 1 lemon', marks: [] }] },
      { _type: 'block', _key: 'i5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: '¼ cup fresh basil', marks: [] }] },
      { _type: 'block', _key: 'i6', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'Salt and pepper to taste', marks: [] }] },
    ],
    instructions: [
      { _type: 'block', _key: 'inst1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Cook pasta according to package directions. Reserve ½ cup pasta water before draining.', marks: [] }] },
      { _type: 'block', _key: 'inst2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'In a food processor, blend avocados, garlic, lemon juice, and basil until smooth. Season with salt and pepper.', marks: [] }] },
      { _type: 'block', _key: 'inst3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: 'Toss hot pasta with avocado sauce, adding pasta water to reach desired consistency.', marks: [] }] },
      { _type: 'block', _key: 'inst4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'Serve immediately, topped with cherry tomatoes and fresh basil.', marks: [] }] },
    ],
  },
] as const;

export const mockPosts = [
  {
    _id: 'mock-post-1',
    _type: 'post',
    title: '10 Tips for Meal Prepping Like a Pro',
    slug: { current: '10-tips-meal-prepping' },
    mainImage: null,
    tags: ['Tips', 'Meal Prep', 'Productivity'],
    _createdAt: '2024-03-18T10:00:00Z',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Meal prepping is one of the best ways to save time during the week while still eating healthy, nourishing food. With a bit of planning, you can set yourself up for success every single day.', marks: [] }] },
    ],
  },
] as const;

export const mockPodcasts = [
  {
    _id: 'mock-podcast-1',
    _type: 'podcast',
    title: 'Ep. 1 – The Minimalist Kitchen Philosophy',
    slug: { current: 'ep-1-minimalist-kitchen' },
    audioUrl: '',
    _createdAt: '2024-03-20T10:00:00Z',
    description: [
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'In our debut episode, we explore what it truly means to cook minimally — fewer ingredients, more flavor, and a whole lot of joy.', marks: [] }] },
    ],
  },
] as const;

export type MockRecipe = typeof mockRecipes[number];
export type MockPost = typeof mockPosts[number];
export type MockPodcast = typeof mockPodcasts[number];