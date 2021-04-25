<template>
<div id="instructions-text" class="text-center">
  <p>
    Text instructions intentionally removed.
  </p>
</div>
</template>


<style scoped lang="scss">
@import "../../styles/Body.scss";

#instructions-text {
  padding: 2rem 5rem;
  padding-top: 0;
}
@media (max-width: 1199px) {
  #instructions-text {
    padding: 1rem 2.5rem;
    padding-top: 0;
  }
}
@media (max-width: 749px) {
  #instructions-text {
    padding: 0;
  }
}
.red {
  color: red;
  font-weight: bold;
}
.uline {
  text-decoration: underline;
}
p.image {
  text-align: center;
}
p.image > img {
  width: 100%;
  max-width: 650px;
  border: rgba(52, 58, 63, 0.35) solid 2px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
}
</style>
