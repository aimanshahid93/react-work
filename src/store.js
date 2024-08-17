import create from 'zustand';

const useStore = create(set => ({
  categories: [],
  addWidget: (categoryName, widget) =>
    set(state => ({
      categories: state.categories.map(cat =>
        cat.name === categoryName ? { ...cat, widgets: [...cat.widgets, widget] } : cat
      )
    })),
  removeWidget: (categoryName, widgetId) =>
    set(state => ({
      categories: state.categories.map(cat =>
        cat.name === categoryName ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) } : cat
      )
    })),
  setCategories: (categories) => set({ categories })
}));

export default useStore;
