export default function normalizeSliders(slidersClass, swiperContainerClass) {
  const sliders = Array.from(document.getElementsByClassName(slidersClass));
  console.log("slidres", sliders);
  let maxHeight = sliders[0].offsetHeight;
  sliders.forEach((slider) => {
    if (maxHeight < slider.offsetHeight) {
      maxHeight = slider.offsetHeight;
    }
  });
  sliders.forEach((slider) => {
    slider.style.height = `${maxHeight}px`;
  });
  const swiperContainer = document.querySelector("." + swiperContainerClass);

  swiperContainer.style.height = `${maxHeight + 80}px`;
}
