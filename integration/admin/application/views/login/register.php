<div class="content">

    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>

    <div class="register-default-box">
        <h1>Register</h1>
        <!-- register form -->
        <form method="post" action="<?php echo URL; ?>login/register_action" name="registerform">
           
            <!-- the email input field uses a HTML5 email type check -->
            <label for="login_input_email">
                User's email
                <span style="display: block; font-size: 14px; color: #999;">
                    (please provide a <span style="text-decoration: underline; color: mediumvioletred;">real email address</span>,
                    you'll get a verification mail with an activation link)
                </span>
            </label>
            <input id="login_input_email" class="login_input" type="email" name="user_email" required />
            <label for="login_input_password_new">
                Password (min. 6 characters!
                <span class="login-form-password-pattern-reminder">
                    Please note: using a long sentence as a password is much much safer then something like "!c00lPa$$w0rd").
                    Have a look on
                    <a href="http://security.stackexchange.com/questions/6095/xkcd-936-short-complex-password-or-long-dictionary-passphrase">
                        this interesting security.stackoverflow.com thread
                    </a>.
                </span>
            </label>
            <input id="login_input_password_new" class="login_input" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />
            <input id="package" name="package" type="hidden" value="<?php echo htmlspecialchars($_GET["pack"]); ?>"/>
            <input type="submit"  name="register" value="Register" />

        </form>
    </div>

    <?php if (FACEBOOK_LOGIN == true) { ?>
        <div class="register-facebook-box">
            <h1>or</h1>
            <a href="<?php echo $this->facebook_register_url; ?>" class="facebook-login-button">Register with Facebook</a>
        </div>
    <?php } ?>

</div>
