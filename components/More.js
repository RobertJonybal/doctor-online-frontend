import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../stores/store";
import { Theme } from "./Theme";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";

import {
  Container,
  Header,
  Content,
  Button,
  Text,
  List,
  View,
  Icon,
  ListItem,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Left
} from "native-base";
import FooterApp from "./footer";
import { withNamespaces } from "react-i18next";

import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import CollapsingToolbar from "react-native-collapse-view";
import authStore from "../stores/authStore";

class More extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("more:settings"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  render() {
    const { t, i18n, navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableHighlight>
          <List>
            <ListItem
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Left>
                <Icon name="md-settings" large style={{ color: "#00bfff" }} />
                <Text>{t("more:settings")}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
              </Right>
            </ListItem>

            <ListItem>
              <Left>
                <Icon name="ios-call" large style={{ color: "#00bfff" }} />
                <Text>{t("more:contactus")}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon name="md-bulb" large style={{ color: "#00bfff" }} />
                <Text>{t("more:aboutus")}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
              </Right>
            </ListItem>
            <ListItem onPress={() => authStore.logoutUser()}>
              <Left>
                <Icon name="log-out" large style={{ color: "#00bfff" }} />
                <Text>{t("more:logout")}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon name="ios-glasses" large style={{ color: "#00bfff" }} />
                <Text>{t("more:medicalinformation")}</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 13 }} note>
                  {t("more:commingsoon")}
                </Text>
              </Right>
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("Notification")}
            >
              <Left>
                <Icon name="home" large style={{ color: "#00bfff" }} />
                <Text>{t("more:notification")}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
              </Right>
            </ListItem>
          </List>
        </TouchableHighlight>
        {/* <FooterApp /> */}
      </View>
    );
  }
}

// export default observer(More);
export default withNamespaces(["more", "common"], { wait: true })(More);
