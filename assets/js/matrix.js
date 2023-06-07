

(function () {
  new ClipboardJS('.copybtn');

  const coffeebtn = document.getElementById('coffeebtn');
  const coffeeimg = document.getElementById('coffeeimg');

  coffeebtn.addEventListener('click', function () {
    coffeeimg.classList.toggle("hidden")
  });

})()


const App = {
  data() {
    return {
      js_code: ``,
      canvas_width: 1000,
      canvas_heidth: 400,
      canvas_back_color: "#000",
      canvas_border: "1px solid green",

      matrix_number: 111,
      str_height: 14,
      min_y: 888,
      max_y: 1666,
      min_length: 30,
      max_length: 70,
      min_font: 8,
      max_font: 18,
      matrix_color_r: 0,
      matrix_color_g: 255,
      matrix_color_b: 0,
      matrix_color_a_min: 1,
      matrix_color_a_max: 7,
      min_speed: 3,
      max_speed: 8,
    };
  },
  computed: {
    changeData() {
      const {
        canvas_width,
        canvas_heidth,
        canvas_back_color,
        canvas_border,

        str_height,
        matrix_number,
        min_y,
        max_y,
        min_length,
        max_length,
        min_font,
        max_font,
        matrix_color_r,
        matrix_color_g,
        matrix_color_b,
        matrix_color_a_min,
        matrix_color_a_max,
        min_speed,
        max_speed,
      } = this;
      return {
        canvas_width,
        canvas_heidth,
        canvas_back_color,
        canvas_border,

        str_height,
        matrix_number,
        min_y,
        max_y,
        min_length,
        max_length,
        min_font,
        max_font,
        matrix_color_r,
        matrix_color_g,
        matrix_color_b,
        matrix_color_a_min,
        matrix_color_a_max,
        min_speed,
        max_speed,
      };
    },
  },
  watch: {
    changeData: function () {
      this.initCancas();
      this.generateCode();
    },
  },
  mounted() {
    this.initCancas();
    this.generateCode();
  },
  methods: {
    generateCode() {
      console.log("生成代码")
      this.js_code = `//Matrix 矩阵 黑客帝国字符雨下落 JavaScript代码生成器 https://suiyan.cc/matrix

      const CANVAS_BORDER = "${this.canvas_border}";
      const CANVAS_BACK_COLOR = "${this.canvas_back_color}";
      const CANVAS_WIDHT = ${this.canvas_width};
      const CANVAS_HEIDHT = ${this.canvas_heidth};

      const MATRIX_NUMBER = ${this.matrix_number}; // 矩阵列数
      const STRING_HEIGHT = ${this.str_height}; // 字符串高度
      // 字符串列起始坐标
      const MIN_Y = ${this.min_y};
      const MAX_Y = ${this.max_y};
      // 矩阵每列字符数
      const MIN_LENGTH = ${this.min_length};
      const MAX_LENGTH = ${this.max_length};
      // 字体大小
      const MIN_FONT = ${this.min_font};
      const MAX_FONT = ${this.max_font};
      // 字符样色
      const MATRIX_COLOR_R = ${this.matrix_color_r};
      const MATRIX_COLOR_G = ${this.matrix_color_g};
      const MATRIX_COLOR_B = ${this.matrix_color_b};
      // 字符颜色的透明度
      const MIN_AP = ${this.matrix_color_a_min};
      const MAX_AP = ${this.matrix_color_a_max};
      // 下落速度
      const MIN_SPEED = ${this.min_speed};
      const MAX_SPEED = ${this.max_speed};

      // 创建 Canvas 画布
      const canvas = document.getElementById("matrix");
      canvas.width = CANVAS_WIDHT;
      canvas.height = CANVAS_HEIDHT;
      canvas.style = "border:" + CANVAS_BORDER + ";";

      // 获取 2D 上下文
      const ctx = canvas.getContext("2d");
      // 创建一个矩阵
      const mymatrix = [];
      for (let i = 0; i < MATRIX_NUMBER; i++) {
        mymatrix.push(getMatrix());
      }
      /**
       * 绘制场景中的矩阵
       */
      function draw() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 设置画布背景为黑色
        ctx.fillStyle = CANVAS_BACK_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        mymatrix.forEach((matrix) => {
          ctx.font = matrix.font;
          ctx.fillStyle = matrix.color;
          matrix.strs.forEach((c) => {
            // 绘制字符串
            ctx.fillText(c.s, c.x, c.y);
          });
        });

        //更新矩阵
        matrixUpdate(mymatrix);

        // 循环调用draw函数以实现动画效果
        requestAnimationFrame(draw);
      }

      function matrixUpdate(mxs) {
        mxs.forEach((mx, index) => {
          mx.strs.forEach((c) => {
            c.y += mx.speed;
          });

          if (mx.strs[0].y > canvas.height + 50) {
            // console.log(mx.strs[0].y)
            mxs.splice(index, 1);
            let tmparr = getMatrix();
            mxs.push(tmparr);
          }
        });
      }

      /**
       * 生成一组竖排的字符串
       * @returns {*[]}
       */
      function getMatrix() {
          // 定义字符串数组
          const mx = {};
          const strings = [];
      
          let length = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH + 1)) + MIN_LENGTH;
          let currentY = -getRandomInt(MIN_Y, MAX_Y); // 当前 Y 坐标
          let currentX = getRandomInt(0 - 16, canvas.width + 16);
          let ap = getRandomInt(MIN_AP, MAX_AP); // 颜色透明度
      
          for (let i = 0; i < length; i++) {
              // 生成随机字符
              const c = getRandomInt(33, 127);
              const randomChar = String.fromCharCode(c);
              // 更新 Y 坐标
              currentY += STRING_HEIGHT;
      
              strings.push({
                  s: randomChar,
                  x: currentX,
                  y: currentY
              });
          }
      
          mx.color = \`rgba(\${MATRIX_COLOR_R},\${MATRIX_COLOR_G},\${MATRIX_COLOR_B},\${ap / 10})\`;
          mx.font = \`\${getRandomInt(MIN_FONT, MAX_FONT)}px system-ui\`;
          mx.strs = strings;
          mx.speed = getRandomInt(MIN_SPEED, MAX_SPEED);
          return mx;
      }

      /**
       * 将生成介于 a 和 b 之间的随机整数
       * @param a
       * @param b
       * @returns {*}
       */
      function getRandomInt(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
      }

      draw();
      `
    },
    initCancas() {

      const CANVAS_BORDER = this.canvas_border;
      const CANVAS_BACK_COLOR = this.canvas_back_color;
      const CANVAS_WIDHT = this.canvas_width;
      const CANVAS_HEIDHT = this.canvas_heidth;

      const MATRIX_NUMBER = this.matrix_number; // 矩阵列数
      const STRING_HEIGHT = this.str_height; // 字符串高度
      // 字符串列起始坐标
      const MIN_Y = this.min_y;
      const MAX_Y = this.max_y;
      // 矩阵每列字符数
      const MIN_LENGTH = this.min_length;
      const MAX_LENGTH = this.max_length;
      // 字体大小
      const MIN_FONT = this.min_font;
      const MAX_FONT = this.max_font;
      // 字符样色
      const MATRIX_COLOR_R = this.matrix_color_r;
      const MATRIX_COLOR_G = this.matrix_color_g;
      const MATRIX_COLOR_B = this.matrix_color_b;
      // 字符颜色的透明度
      const MIN_AP = this.matrix_color_a_min;
      const MAX_AP = this.matrix_color_a_max;
      // 下落速度
      const MIN_SPEED = this.min_speed;
      const MAX_SPEED = this.max_speed;

      // 创建 Canvas 画布
      const canvas = document.getElementById("matrix");
      canvas.width = CANVAS_WIDHT;
      canvas.height = CANVAS_HEIDHT;
      canvas.style = "border:" + CANVAS_BORDER + ";";

      // 获取 2D 上下文
      const ctx = canvas.getContext("2d");
      // 创建一个矩阵
      const mymatrix = [];
      for (let i = 0; i < MATRIX_NUMBER; i++) {
        mymatrix.push(getMatrix());
      }
      /**
       * 绘制场景中的矩阵
       */
      function draw() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 设置画布背景为黑色
        ctx.fillStyle = CANVAS_BACK_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        mymatrix.forEach((matrix) => {
          ctx.font = matrix.font;
          ctx.fillStyle = matrix.color;
          matrix.strs.forEach((c) => {
            // 绘制字符串
            ctx.fillText(c.s, c.x, c.y);
          });
        });

        //更新矩阵
        matrixUpdate(mymatrix);

        // 循环调用draw函数以实现动画效果
        requestAnimationFrame(draw);
      }

      function matrixUpdate(mxs) {
        mxs.forEach((mx, index) => {
          mx.strs.forEach((c) => {
            c.y += mx.speed;
          });

          if (mx.strs[0].y > canvas.height + 50) {
            mxs.splice(index, 1);
            let tmparr = getMatrix();
            mxs.push(tmparr);
          }
        });
      }

      /**
       * 生成一组竖排的字符串
       * @returns {*[]}
       */
      function getMatrix() {
        // 定义字符串数组
        const mx = {};
        const strings = [];

        let length = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH + 1)) + MIN_LENGTH;
        let currentY = -getRandomInt(MIN_Y, MAX_Y); // 当前 Y 坐标
        let currentX = getRandomInt(0 - 16, canvas.width + 16);
        let ap = getRandomInt(MIN_AP, MAX_AP); // 颜色透明度

        for (let i = 0; i < length; i++) {
          // 生成随机字符
          const c = getRandomInt(33, 127);
          const randomChar = String.fromCharCode(c);
          // 更新 Y 坐标
          currentY += STRING_HEIGHT;

          strings.push({
            s: randomChar,
            x: currentX,
            y: currentY
          });
        }

        mx.color = `rgba(${MATRIX_COLOR_R},${MATRIX_COLOR_G},${MATRIX_COLOR_B},${ap / 10})`;
        mx.font = `${getRandomInt(MIN_FONT, MAX_FONT)}px system-ui`;
        mx.strs = strings;
        mx.speed = getRandomInt(MIN_SPEED, MAX_SPEED);
        return mx;
      }
      /**
       * 将生成介于 a 和 b 之间的随机整数
       * @param a
       * @param b
       * @returns {*}
       */
      function getRandomInt(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
      }

      draw();
    },
  },

};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");