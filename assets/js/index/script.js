document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  //Detect Closest Edge
  function closestEdge(x, y, w, h) {
    var topEdgeDist = distMetric(x, y, w / 2, 0);
    var bottomEdgeDist = distMetric(x, y, w / 2, h);
    var leftEdgeDist = distMetric(x, y, 0, h / 2);
    var rightEdgeDist = distMetric(x, y, w, h / 2);
    var min = Math.min(
      topEdgeDist,
      bottomEdgeDist,
      leftEdgeDist,
      rightEdgeDist
    );
    switch (min) {
      case leftEdgeDist:
        return "left";
      case rightEdgeDist:
        return "right";
      case topEdgeDist:
        return "top";
      case bottomEdgeDist:
        return "bottom";
    }
  }

  //Distance Formula
  function distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  }

  var boxes = document.querySelectorAll(".gallery-images");
  console.log("Found gallery boxes:", boxes.length);

  for (var i = 0; i < boxes.length; i++) {
    console.log("Processing box", i, boxes[i]);

    boxes[i].onmouseenter = function (e) {
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);

      // FIX: Sử dụng children thay vì childNodes để tránh text nodes
      var image = this.children[0]; // Element đầu tiên
      var overlay = this.children[1]; // Element thứ hai (hoặc tùy structure)

      // Hoặc tìm bằng selector cụ thể (recommend)
      // var image = this.querySelector('img');
      // var overlay = this.querySelector('.overlay');

      console.log(
        "Mouse enter - Image:",
        image,
        "Overlay:",
        overlay,
        "Edge:",
        edge
      );

      // Kiểm tra elements tồn tại
      if (!image || !overlay) {
        console.warn("Image or overlay not found in:", this);
        return;
      }

      switch (edge) {
        case "left":
          overlay.style.top = "0%";
          overlay.style.left = "-100%";
          gsap.to(overlay, { duration: 0.5, left: "0%" });
          gsap.to(image, { duration: 0.5, scale: 1.2 });
          break;
        case "right":
          overlay.style.top = "0%";
          overlay.style.left = "100%";
          gsap.to(overlay, { duration: 0.5, left: "0%" });
          gsap.to(image, { duration: 0.5, scale: 1.2 });
          break;
        case "top":
          overlay.style.top = "-100%";
          overlay.style.left = "0%";
          gsap.to(overlay, { duration: 0.5, top: "0%" });
          gsap.to(image, { duration: 0.5, scale: 1.2 });
          break;
        case "bottom":
          overlay.style.top = "100%";
          overlay.style.left = "0%";
          gsap.to(overlay, { duration: 0.5, top: "0%" });
          gsap.to(image, { duration: 0.5, scale: 1.2 });
          break;
      }
    };

    boxes[i].onmouseleave = function (e) {
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);

      // FIX: Sử dụng children thay vì childNodes
      var image = this.children[0];
      var overlay = this.children[1];

      // Hoặc tìm bằng selector cụ thể
      // var image = this.querySelector('img');
      // var overlay = this.querySelector('.overlay');

      console.log(
        "Mouse leave - Image:",
        image,
        "Overlay:",
        overlay,
        "Edge:",
        edge
      );

      // Kiểm tra elements tồn tại
      if (!image || !overlay) {
        console.warn("Image or overlay not found in:", this);
        return;
      }

      switch (edge) {
        case "left":
          gsap.to(overlay, { duration: 0.5, left: "-100%" });
          gsap.to(image, { duration: 0.5, scale: 1.0 });
          break;
        case "right":
          gsap.to(overlay, { duration: 0.5, left: "100%" });
          gsap.to(image, { duration: 0.5, scale: 1.0 });
          break;
        case "top":
          gsap.to(overlay, { duration: 0.5, top: "-100%" });
          gsap.to(image, { duration: 0.5, scale: 1.0 });
          break;
        case "bottom":
          gsap.to(overlay, { duration: 0.5, top: "100%" });
          gsap.to(image, { duration: 0.5, scale: 1.0 });
          break;
      }
    };
  }
});
