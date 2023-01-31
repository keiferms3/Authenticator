import 'package:authenticator/model/account.dart';

class UriParser {
  Account parseOtpUri(String uri) {
    // TODO: Implement parsing logic
    final parsedUri = Uri.parse(uri);
    return Account(uuid: 'abcd');
  }
}
