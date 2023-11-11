import { ref, watch } from 'vue';

export const menuPath = ref([{ name: '首页' }]);

let cacheObj = {};

// export const forceCache = (key: string) => {
//   const refV = cacheObj[key];
//   sessionStorage.setItem(`store:${key}`, JSON.stringify(refV.value));
// };

function cacheRef(obj) {
  cacheObj = obj;
  Object.keys(obj).forEach((key) => {
    const refV = obj[key];
    const val = sessionStorage.getItem(`store:${key}`);
    if (val) {
      refV.value = JSON.parse(val);
    }
    watch(refV, (newValue) => {
      sessionStorage.setItem(`store:${key}`, JSON.stringify(newValue));
    });
  });
}

const all = { menuPath };
const cached = {};
cacheRef(cached);

export const admin = ref({});

export default all;
