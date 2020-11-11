import React from "react";

function Testimonial() {
  return (
    <div>
      <div class="card testimonial-card animate__animated animate__fadeInTopRight">
        <h2 class="card-header">Quote</h2>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <footer class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
