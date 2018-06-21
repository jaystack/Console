<template>
    <div class="fadezoom">
        <div class="box">
            <h4 class="title is-4">Account</h4>
            <hr>
            <div class="columns">
                <div class="column">
                    <b-field label="Name">
                        <b-input value="John Appleseed"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Email"
                             type="is-danger"
                             message="This email is invalid">
                        <b-input type="email"
                                 value="john@apple.com"
                                 maxlength="30">
                        </b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-field label="Username"
                             type="is-success"
                             message="This username is available">
                        <b-input value="johnsilver" maxlength="30"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Password"
                             type="is-warning"
                             :message="['Password is too short', 'Password must have at least 8 characters']">
                        <b-input value="123" type="password" maxlength="30"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-field label="Subject">
                        <Selector :options="options" label="label"></Selector>
                    </b-field>
                </div>
                <div class="column"></div>
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
