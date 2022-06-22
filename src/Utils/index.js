const scrollView = (modal) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
};

const tahun = [];
for (let i = new Date().getFullYear(); i >= 1900; i--) {
  tahun.push({ id: i, value: i });
}

export { scrollView, tahun };
