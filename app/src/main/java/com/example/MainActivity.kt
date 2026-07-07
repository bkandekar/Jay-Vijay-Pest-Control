package com.example

import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(
          modifier = Modifier
            .fillMaxSize()
            .statusBarsPadding()
            .navigationBarsPadding()
        ) { innerPadding ->
          val webViewRef = remember { mutableStateOf<WebView?>(null) }

          BackHandler(enabled = true) {
            webViewRef.value?.let {
              if (it.canGoBack()) {
                it.goBack()
              } else {
                finish()
              }
            } ?: finish()
          }

          AndroidView(
            factory = { context ->
              WebView(context).apply {
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                settings.allowFileAccess = true
                settings.allowContentAccess = true
                settings.databaseEnabled = true
                settings.useWideViewPort = true
                settings.loadWithOverviewMode = true
                
                webViewClient = object : WebViewClient() {
                  override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?
                  ): Boolean {
                    val url = request?.url?.toString() ?: ""
                    // Intercept external intents: WhatsApp, tel:, and maps
                    if (url.startsWith("https://wa.me") || url.startsWith("tel:") || url.contains("maps.google") || url.contains("google.com/maps")) {
                      try {
                        val intent = android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url))
                        context.startActivity(intent)
                        return true
                      } catch (e: Exception) {
                        e.printStackTrace()
                      }
                    }
                    return false
                  }
                }
                webViewRef.value = this
                loadUrl("file:///android_asset/index.html")
              }
            },
            modifier = Modifier.fillMaxSize()
          )
        }
      }
    }
  }
}


