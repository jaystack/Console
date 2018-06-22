<template>
    <div class="fadezoom">
        <div class="box">
            <h4 class="title is-4">Account</h4>
            <hr>
            <div class="columns">
                <div class="column">
                    <b-field label="First Name">
                        <b-input value="John"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Last Name">
                        <b-input value="Appleseed"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-field label="Username">
                        <b-input value="johnsilver" maxlength="30" disabled></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Subject">
                        <Selector :options="options" label="label" expanded></Selector>
                    </b-field>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Selector from "../../components/Selector";
export default {
  data: () => ({
    options: [
      {
        label: "Option One"
      },
      {
        label: "Option Two"
      }
    ]
  }),
  components: {
    Selector
  }
};
</script>
