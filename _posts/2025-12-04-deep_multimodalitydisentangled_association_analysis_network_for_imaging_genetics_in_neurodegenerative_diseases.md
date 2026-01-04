---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJQGIBEP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIF6zLQ7LfIBo%2FKUn2aLUExuc%2FMK87HtIynxAX%2FIbbppZAiBxjVdC3hzoSRzPQKfVGM3EPPXtbF8uZFyuzJF3sP5ngir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMnoAdR3N1H18HRLg7KtwDruxXigHtWWvUqp73AAFXwFbItfirv6o1m4hFi%2BV2EpX2OpgzWmuIQDriY2G4qlfGuf5NIT2Umk3UkyHCYHWYJ3J3xaAlWSsl1aEq0shx6pt8LoTT40778QZYxhx7LB6SwNUQrdlDLNARtN9v2lCdxtNvN9L47iClN67Ctrx4e9Gvgxx2WudvfDgwskErD8xrTCQXnn%2BWs%2FusGC%2BEr75n91uy%2BKwmuzQ%2FNiopoztP%2BeCdoaKkg6r9sgTkLQ4zipbEyz2ruXpWU7d086L6ZygaQFi7DsNz1%2F3JsHYp%2B8hb5I%2FVTQl6IqDb9pObzq75ZAejbxAa5M%2Bjzdv8gnXnHfsn1wN8wVErUcpnp7dYGs3UuEYyjAMCcq4ovwkJOVI%2Bvvo5SKahDD%2Bnkvws1eSB1XFyEJjlc2NAIY4HXq5kxu0G6GpGNycMjwtvUsEw00PIUGklHvA7iekPkKFvIMpjWSR7VaceNoN7GxMgieoT6DQSEInJJLC6E6bkggUEIw70oIcAx95cptqO32BsqNUj4bH3xnKKqrzzO3EMzyw3PjFnZewZ%2FgJJ%2BzL4ML9qhvz%2BNXPhps9BKkXVAgDNeQ9u29a22y2gYRPnx5kL2mVVfm6lMk3Mgre7svpLtpDt%2BFgwte7pygY6pgGEEUCDOgL0hbVV7RXWQxivDQGPp%2BBYjFu%2BstCDWawWG7XugrF6kEtG7jumAOdtMS%2B5BkBKuCqI2MttFx%2Bo5kF3UtDBAMa7th4yiVztGsvBbXoUK4vdWbLRgrSzIVd0PdQSD5Pty8mRLlxSuD9HoZ2NfwM3B2T7ctwVy%2FZW4ASkAlhOvGglv6J%2Fit1%2F%2FxHxc1RqNrXS0P16iEANM2L%2F9jw7nDlkovX%2B&X-Amz-Signature=a2436bb14394e0fd836fa0f59307e97b9fc3f902be25ea0fefca253ec8f6d82a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJQGIBEP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIF6zLQ7LfIBo%2FKUn2aLUExuc%2FMK87HtIynxAX%2FIbbppZAiBxjVdC3hzoSRzPQKfVGM3EPPXtbF8uZFyuzJF3sP5ngir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMnoAdR3N1H18HRLg7KtwDruxXigHtWWvUqp73AAFXwFbItfirv6o1m4hFi%2BV2EpX2OpgzWmuIQDriY2G4qlfGuf5NIT2Umk3UkyHCYHWYJ3J3xaAlWSsl1aEq0shx6pt8LoTT40778QZYxhx7LB6SwNUQrdlDLNARtN9v2lCdxtNvN9L47iClN67Ctrx4e9Gvgxx2WudvfDgwskErD8xrTCQXnn%2BWs%2FusGC%2BEr75n91uy%2BKwmuzQ%2FNiopoztP%2BeCdoaKkg6r9sgTkLQ4zipbEyz2ruXpWU7d086L6ZygaQFi7DsNz1%2F3JsHYp%2B8hb5I%2FVTQl6IqDb9pObzq75ZAejbxAa5M%2Bjzdv8gnXnHfsn1wN8wVErUcpnp7dYGs3UuEYyjAMCcq4ovwkJOVI%2Bvvo5SKahDD%2Bnkvws1eSB1XFyEJjlc2NAIY4HXq5kxu0G6GpGNycMjwtvUsEw00PIUGklHvA7iekPkKFvIMpjWSR7VaceNoN7GxMgieoT6DQSEInJJLC6E6bkggUEIw70oIcAx95cptqO32BsqNUj4bH3xnKKqrzzO3EMzyw3PjFnZewZ%2FgJJ%2BzL4ML9qhvz%2BNXPhps9BKkXVAgDNeQ9u29a22y2gYRPnx5kL2mVVfm6lMk3Mgre7svpLtpDt%2BFgwte7pygY6pgGEEUCDOgL0hbVV7RXWQxivDQGPp%2BBYjFu%2BstCDWawWG7XugrF6kEtG7jumAOdtMS%2B5BkBKuCqI2MttFx%2Bo5kF3UtDBAMa7th4yiVztGsvBbXoUK4vdWbLRgrSzIVd0PdQSD5Pty8mRLlxSuD9HoZ2NfwM3B2T7ctwVy%2FZW4ASkAlhOvGglv6J%2Fit1%2F%2FxHxc1RqNrXS0P16iEANM2L%2F9jw7nDlkovX%2B&X-Amz-Signature=a2436bb14394e0fd836fa0f59307e97b9fc3f902be25ea0fefca253ec8f6d82a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHM4ZMTZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDFFp%2FQ3UvKx2JWwEUT3CJ4RNl896si5PIpQklso8DuXgIhAKEu9cOyCrDRdkDbvElDxlLTv0RH4M7kUuDRy9Pp50r%2FKv8DCDAQABoMNjM3NDIzMTgzODA1IgwXTNzrkXWD3FikTYIq3APnqrtA4%2FCHktD37UEsB1hzW%2FfdTJ61C5iZAI%2Fi7xotFw9hdV913KMf5Av2gQOXaQDOgV8wbjb9ob8HdSZmx0N3mdbx74Xokw5ms8t2DzJNZzsvmwWl7My8FS%2FbaKQbsgA1XnMcmwiWKmi6rcUFikUqSK0A0ffoL8tMaJTlMPvvvPWPnGowPxd7aeZAn0WhjedTDX5m66PdOTmpdEi7bRucr9CjAJpsGRa5eG%2BDGQpRXlCtYdwf%2BfYZ751%2FpRVHKtvuALkDCO7VYaiGq%2BgHTOLjJuXXp99L0W3ku2vxDU71%2B3z6QQOHVE9Rqhn8Mz8yj%2FIz63n50h7rENYbaILer%2BFZXcDzHJL0UqCxAqpbtqBVO%2BptIQIu1sKCI4zMG%2BE9CF0br3rXgOs8giGhqtF%2FZM5wyA%2BkmleLgX5qGgBwDccWSssG9VfRZ2bO7AhDMe43rdzjLfAVbKxkNJrXH4TMyW4Z4T5iApK%2Bl4SBKizUNwoD%2BAAUH3ejtNeOmHvAZ3PyIdlCMoV0oOPu2Il2%2B2BsifGvWk7l1nT68UelzN95lbyLEtao5r2V0c1a0LJSGRhDGAWh7f2eN9wAa05TaDt%2FWgyWXnMYqf9vRnE2475xcLTe2O%2BYPae33xVJk%2B3hUDCq8enKBjqkAceXben7JH1fR%2B93gcJPjvJySvwzTPJStNiCJZiUhVRAGdIgFlNXyPBefD1F1GIlyrqiyJ9oZvNcbhtXdhY%2FEkjj%2Bewz%2BNc4c0RNsT%2BgmqAVK3leY1Orcy%2BLJUpnvi9mkx5uaVj20t6TaIJs0AyywPld0pWxpGacXAPCL0yS20YRajMg3rZLd0utxWRBElaWSxGzRn0UJU%2BGEkG7al1IGXQjXhCT&X-Amz-Signature=05b324daee5c315237b8b866ee4262caa59e1c87e4672a7b43dadf1fc60daed3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMVMOT7S%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIQCrkrtnxyF5JPBzLu0Cj2YEuOa38TYcZzXynuwK4YgCaQIfLP2o53JFpijGQfyZ%2B2FzsoI5I7xFJ2ogjG%2B8g0B7Sir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMS91p6j8BaJXXiGPCKtwDINZWtlveTB9%2FnUkVsKVmdJy6%2BoI5rirjYBoAzCTckiaFOyVQlMBgKWSa0RlbbbxEhZW3tg2hNg1uYmILge8Q9Lc4jvkad6JxmD%2FgrW2XniPGTUZVJqeLfvSTTJGZDi98n8J9GmUChuZBX181HTHsCqzvGXCoWu8icXN2hOHR9nUNYbhCqX9oS9DgMRJ5jeoH3sDvzXxXuPZiPIQL%2F%2FvLXEZyAGT%2FBg5kbKzQR1A3jQ5jmAAii2cwGyurASnzuu878sACjedWTO5jf%2BCPlBMXht%2FNNS9uVEJbfVoULYupWvOev9qfPNKo%2BklNhqzzS58Td0t1AeDs6gs8QOrcC99xlkZ9y4eGlKUzKuqWwAzyyHjnPJVU2NIcArZMCI2XhXxh4XBBjSVp6I2%2BE%2F8J6LtvCLNe63cYYG1bcCBHmG1Mr94ZKXONxSjqJVg63VLKruW0%2BSv8N6g3lEiDbp7Jsm7hehw2ZGhvPE576qYDn%2BDQfuHrmxdVth21Qgy7mG4kMkRywc0VDfyFhrZzK%2BDjDexodSXGG3OXgVg%2B9%2FtixLXWCfmGo9O1GXyot5XkupKswK%2FHBArRvAQFN6pd0Q%2Fu8vQTBNhalD3kbWmiwjJIf87EFo4qXuJ91SbF301zSHMw1uLpygY6pgEEdoQkbExarCKEylZRtl0edKZZNCE89glIKooDkiGp6LZoUtNvycoE%2FWexTsLObvwQQnXu9%2F1kulCxifY2HC3xpjJupfbwPazP80%2FNBWRxsF%2BQ3WZ8RPd236x7RIRMUsitRkk%2FlwpPih5s6fpFv4lE0QGqDx28We4CKvMIG9t1rzm48mV%2FS4fNVPOzIZW4zcIqrF8i34mUGuEIcCFtBre3BX8H3Qh5&X-Amz-Signature=6737557f8adb8916a3c344239199fe53f144d79d86466a313244e6c81da63457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMVMOT7S%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIQCrkrtnxyF5JPBzLu0Cj2YEuOa38TYcZzXynuwK4YgCaQIfLP2o53JFpijGQfyZ%2B2FzsoI5I7xFJ2ogjG%2B8g0B7Sir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMS91p6j8BaJXXiGPCKtwDINZWtlveTB9%2FnUkVsKVmdJy6%2BoI5rirjYBoAzCTckiaFOyVQlMBgKWSa0RlbbbxEhZW3tg2hNg1uYmILge8Q9Lc4jvkad6JxmD%2FgrW2XniPGTUZVJqeLfvSTTJGZDi98n8J9GmUChuZBX181HTHsCqzvGXCoWu8icXN2hOHR9nUNYbhCqX9oS9DgMRJ5jeoH3sDvzXxXuPZiPIQL%2F%2FvLXEZyAGT%2FBg5kbKzQR1A3jQ5jmAAii2cwGyurASnzuu878sACjedWTO5jf%2BCPlBMXht%2FNNS9uVEJbfVoULYupWvOev9qfPNKo%2BklNhqzzS58Td0t1AeDs6gs8QOrcC99xlkZ9y4eGlKUzKuqWwAzyyHjnPJVU2NIcArZMCI2XhXxh4XBBjSVp6I2%2BE%2F8J6LtvCLNe63cYYG1bcCBHmG1Mr94ZKXONxSjqJVg63VLKruW0%2BSv8N6g3lEiDbp7Jsm7hehw2ZGhvPE576qYDn%2BDQfuHrmxdVth21Qgy7mG4kMkRywc0VDfyFhrZzK%2BDjDexodSXGG3OXgVg%2B9%2FtixLXWCfmGo9O1GXyot5XkupKswK%2FHBArRvAQFN6pd0Q%2Fu8vQTBNhalD3kbWmiwjJIf87EFo4qXuJ91SbF301zSHMw1uLpygY6pgEEdoQkbExarCKEylZRtl0edKZZNCE89glIKooDkiGp6LZoUtNvycoE%2FWexTsLObvwQQnXu9%2F1kulCxifY2HC3xpjJupfbwPazP80%2FNBWRxsF%2BQ3WZ8RPd236x7RIRMUsitRkk%2FlwpPih5s6fpFv4lE0QGqDx28We4CKvMIG9t1rzm48mV%2FS4fNVPOzIZW4zcIqrF8i34mUGuEIcCFtBre3BX8H3Qh5&X-Amz-Signature=f41ad306af48cc9b3ac72683258088e79e99833e675e03961fc1ee1f173a65e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TB5SYTUI%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDNWHrFTZQ0wb1w5%2FB8zlhoXiixg5BHG4IC2NBesdad9QIgab6QTH5Fl4551WZw%2BXq2yeFdUlfbyv9%2FOj%2B%2BAriZHzAq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDCrPIE2iKVX1ByUZKircAzAu8aBgbZDbnOIH78%2Bngon%2F%2BwcwPt2THMP8WSKPWnULbIxUdOf7FFavx0i76g1Tn7i%2F218QyMo4EtEtTBc9oAque2dDFgIVzk%2B21E6y8UyAXDIDNAZHJOsBR9IN8zIrrNUysUvMAG5am9P6tUaaHaBvw2wDE3yBAjNi8DlkmK37gJPr0CsmkofqVXR1hD1kaclSJAXs5HvRyWPszp1oQQZVB9CMerqD9MOp3kJ%2Bv9F2tsQOOyIxZUbghTk4%2BOX8GgCsTCvF3cc4t6gM6RuzqAsKxqd5oQC%2FUWsFn%2FHDb%2F8PpHA2%2FrZJ5cc5E98KzTIYksF5W9qq21EfAtErZFoksx2fEuVoJqteqI0NIUhlMpr18s3j1hPBdSE5DykSC5gF2X9HStVrX3k5DNyjWCa2pOfBJHuv7VxM6cf5zKDYyRzkfdJvcFKGGYHMKTtmvUTBDpWvfSyavWGhIa11DMfGR9nhfDUXqw%2Fi8gyeqJKsJAOp3%2FmskZxCTZVyevodUw422fWDRMurBOt7xYKB0XhBuTwph20aT8rOgTu2QI80%2B5JCeZ3fmzyv37GJyAqXvwvCOgY75G3VNH%2FqsRE5E24%2FGNxkK8n2E7%2FlEvq7VLANqKcZttZpvPshJ%2BmgU%2BWVMJL76coGOqUBp%2BAvKhfOAw5AdmrGx3u4DnXd0p4%2FnGQGEGWn5%2B%2FF6m2Em8gcaJr%2B5hDOYl31B%2BjxYhCyHGkDheVpoLH2GG2PVX%2BgED2MoPJDOEu18A21MIDrA2p9GbVPZiQazKqEbKwsZGdZLZFOGzjPS6g%2BRj0nbrp%2BS%2Fcp2Ol2Lm%2B9NBsGT3qu0eERK6tBAFkNgvoC%2B6XLfqBW5BhGYCdm2tdgwHfy7s5PEzHa&X-Amz-Signature=f86f49a2d3aa09961e7ec0b4b093574434c888a584fd343665b83cbb2e24e565&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KRLBCR5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIAY6P3AwdGgKRuDma0lPTyGWSrLhsaOLuO4t7WqpwrH9AiEAlhd8356Hq9H4Qs6FkEZiqHcioPdKIXrjvmktdWUyeXEq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDEiWxUD36gmc0ZDQIircA7fMXhN4VOtYExBJs4Hlm6UGM1Je97wX0tIoVz32ij4tTwEE%2Bu3H5o4K6CqDf%2FBwxCq66Rw%2FBBOe7eV126p99%2Bma3yXXWSUTHo1yb1WUiZn%2BO7KSyRcSvQvj2Z8uOA1xX8SuDRczGaghO0TsILJeFmup5SuLGN0dS43mGg%2BrW1CO5kKK8KnjUkuXXpKNzpKi2QDy5aEmpX1rR8jBq1Wq%2BOnTAHCD2p3VwoyNqB3%2BYHzHUTTcGcD9Gihlnrb%2BU92Q9XYvE7sRN7AWvWrELbKqHExF8hod3ufDx80HJG7GRgXAn54v2e6vwg1C0mCRmeTDzlVmXchuUcYltbCrSUA1daXUIWZvGjQuY4UEdMEPMoi39T9j%2Fvl2IkqhyrChfaAx1BLsVCbCsk8SAKEbUZqI49b%2FMJUnNi95jb0ZCZMHbGuBNzqkjNBa1gaX8GWlvNUSXgZRnc2kk6ZaZflhaeH8P%2BSZwszrDo3GGygcYYaOWmSwccDyoZysuXZNZbp3sh8%2F47dJ1Fsn5iWI%2Fwb%2FbRvivg3kb%2FNYsB2lEYQiAvYxQqBBvoUpIizmh9l0rK0H1gloFQin1tjbyEcI3o2jShtresl3P6QuL3fzQ%2FY3WHbLz3RUHtFeLJ%2FNRHXor2VSMN%2Fm6coGOqUBPvb1dPlGUXvWBVzzLjX2Z14%2BeTDb6vJ4W5a0DPgvDDHF56ouAHl%2B62iNpwoOA9WqipRDWzeswYtY%2B0Oc9D8GL5lgQWKv3QiC%2B7bZzE20XWLrpVsbghlNDR6YqJKwZhO%2FiADXE2b1sqPVt2vecNlJIArZXftbNgMain0loy1FzEOot%2FB7vvXj%2BF2g3Qedlv1KdPstTIlBoqoiQ3l6j4XafJNZh1mG&X-Amz-Signature=480a05d1545514ac5f752b359b4b5643f037028429ba211a9f8a0fba372c4342&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBRTMNAO%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCguQaNlohnWKpZi1PaPMjIpLO2lg7vWT6PBtvC3qT5SQIgB%2FJTw0VlC2io8vZnvQR3ag0yLyEB5MrLH0NK1Gm9K3Aq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDJhst6bTgjoDSLhSlircA2ntcMI4KRQ2O67xV587fdlDGmYiTCidmdCROyYQgmZnfIZIHfra4HPCJozOUkIk5J8%2Bo0idJ7TmBkzF4y1avEEuEbGHsqdCCOTzozI4TwZlCLHAq%2F%2BS5y426Jl4dimInR4Ifc7y%2F9G7%2BUXGSYXGVDJUEAUyMNyhltvj5u6WF3oTTAsXKrZ3KiSGf3iI%2Fky%2FsiLe6CfCeus2d7fTmwdlVJnm2nE%2B5Ua7oq6X8EXhiCksALkUuvk8pr6Ju18QtvFL7iDLReOb76986A11b4IsEYq1ufrJTMAACFnBDPXLX2CPluvYtNlxpelg19vCgS3Mz83qxcV9FE11RltCg9Ia8s7DNmlYV14cxSDOZvSX8obtCOTZK6kPHo%2B56u%2FMjdYwP73DSFneI7d2Vt5fndiXQZtZBI%2FEuCpjY81jz4QQBScBi0T4WkvTeyaK0GZuO6m9GwtFS7nqW5449rijYRFqBWKucMfCYs3JT35%2BCr4JkUPrLV5%2BelvDe51tLS87K%2B4qcGjFjjKPW3TmAJvXSRcEDZej%2Fc0A29FLRrnStXSULeKi7%2FiKxjUP5%2FyoM34Xo4dYNBaVW%2FU%2F0OYjjuCF4bI4PadMN4olKKBOr3FTVjo1T%2FAap79Xu%2F4xk83k1O3hMN%2F%2F6coGOqUBUHXPvQYQgJt3THIpnGCMbbnjGlfdfkErcpcenA1Lmm9uiN01gff7ujFcUTyamLmbJ0ygsMf1pwoF9cVpdlh91kuG9EOyTqfsVMbEST8Go4oCuvOFDY%2FIq0XbvW%2FMxIZrlwTCz%2F2yc1OAw8E0wC7mNzfGNJLvUAX61A6Jku8WZH99gskpN8cbGMKwMcMU%2BmqINYZuz9%2B6AtZFlOW4CS7V9QmdmE1g&X-Amz-Signature=bc9833f9511c27bca07932a3f58cc15d76f9a83432e10af1d3ea17aba81e34f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STOTP5B3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHn9fWOlkkoS%2B0m47%2BvBi0%2F%2Fc%2BF7vvd%2FvIREooYS9sz0AiBHXrnOnCasqB3XkdE%2BzW2cv07lO5DONSMRGWgvqju3xir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMr1Zl98drq99BGNT1KtwDu%2FjsowXaYgUCaXjG9o6tn0JY4P3f7CECChdow5wj9BBpldjwuJp3CfTofVNbNWo%2FrsxnabXZYb6dug6lYJWw%2BGAVgjCN%2F4zARa4ufCkYaZROm6D516zaG66Cr4fEiTZOQXMafaN7%2BdHP0%2FzFzouoNQPHdn14y7f3J8p9TNgYrEHs7eUQ%2B3GcdybU0VMbyyjPBR96GiMkosIo390MsGm68m0d3loOH5PQYcfcRFd7033ZgwHvRse853ZptXTtpR7KZoDJupNfrq8chyqvjZCK7bVRTaEkrPx5Rcn%2FXi5BzoJ9fPII8DAWcMHpDtp8K6JMC12M1ghOUUZvQ1GKhOy%2FMO%2FDYzsnSfa7ZIMJbU5Wj%2BIn1c68nc9Qr8e0WgGCA8RhO5sO2SHEYq%2BdB9LnDJhH%2BPYvwFbBSaj6%2BUwn0kU0%2BvpI%2F868viM2tOijNV2rgfHDfExp5xo5lgAy8y8f7L4qVtBIDBTMdrU0ZO9Ti4qkT%2FCw6bikv7x2sQc8o0Pk4T%2FCiccL984DDcMJAQW3buXHDzem7w9iDLZkTXGZ%2B3epImFnKL%2BYFvqvt0JkV7GBEqX1XtlDWdjaCFjlzZKU9EWlwgmTGQVkVLc8XXsGu5XqTNRzjtdJe%2Fc%2FGSRQVfwwkvvpygY6pgHF820A1auojbVg3dasNo9qjd21XwWXjrrj3T8VJu4BOdXGRCj9IXW1GkzqSk%2BWDDKYZN%2Frkh13%2FhmoBC1Ia88R3hVowu7lH6WmCsX%2BL0fZpAXRpPDXhhVwpRsRfo0pfGo2Y6zftnkBKWqiEAf2%2F6P5LoAlIojdy9cWwFyAois8KkuazdjEDQMOiD2RMV9%2FMGiT5n%2BT6cMLXbLiTEawVNvhunf%2BU%2FzU&X-Amz-Signature=06d81c34c1c0e550a122f799dbafc94e00d5c44cf6497fad6c7e80a8625bce2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STOTP5B3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHn9fWOlkkoS%2B0m47%2BvBi0%2F%2Fc%2BF7vvd%2FvIREooYS9sz0AiBHXrnOnCasqB3XkdE%2BzW2cv07lO5DONSMRGWgvqju3xir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMr1Zl98drq99BGNT1KtwDu%2FjsowXaYgUCaXjG9o6tn0JY4P3f7CECChdow5wj9BBpldjwuJp3CfTofVNbNWo%2FrsxnabXZYb6dug6lYJWw%2BGAVgjCN%2F4zARa4ufCkYaZROm6D516zaG66Cr4fEiTZOQXMafaN7%2BdHP0%2FzFzouoNQPHdn14y7f3J8p9TNgYrEHs7eUQ%2B3GcdybU0VMbyyjPBR96GiMkosIo390MsGm68m0d3loOH5PQYcfcRFd7033ZgwHvRse853ZptXTtpR7KZoDJupNfrq8chyqvjZCK7bVRTaEkrPx5Rcn%2FXi5BzoJ9fPII8DAWcMHpDtp8K6JMC12M1ghOUUZvQ1GKhOy%2FMO%2FDYzsnSfa7ZIMJbU5Wj%2BIn1c68nc9Qr8e0WgGCA8RhO5sO2SHEYq%2BdB9LnDJhH%2BPYvwFbBSaj6%2BUwn0kU0%2BvpI%2F868viM2tOijNV2rgfHDfExp5xo5lgAy8y8f7L4qVtBIDBTMdrU0ZO9Ti4qkT%2FCw6bikv7x2sQc8o0Pk4T%2FCiccL984DDcMJAQW3buXHDzem7w9iDLZkTXGZ%2B3epImFnKL%2BYFvqvt0JkV7GBEqX1XtlDWdjaCFjlzZKU9EWlwgmTGQVkVLc8XXsGu5XqTNRzjtdJe%2Fc%2FGSRQVfwwkvvpygY6pgHF820A1auojbVg3dasNo9qjd21XwWXjrrj3T8VJu4BOdXGRCj9IXW1GkzqSk%2BWDDKYZN%2Frkh13%2FhmoBC1Ia88R3hVowu7lH6WmCsX%2BL0fZpAXRpPDXhhVwpRsRfo0pfGo2Y6zftnkBKWqiEAf2%2F6P5LoAlIojdy9cWwFyAois8KkuazdjEDQMOiD2RMV9%2FMGiT5n%2BT6cMLXbLiTEawVNvhunf%2BU%2FzU&X-Amz-Signature=a42b1353e5a1277a78d914efa49bc4488f4180298f025fe94b0bb3320ff00d78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644OQTNC6%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIBqefrIwFKJpBeNL%2BRjo0EMFnFziA6g29jnUdyokRS0fAiEAvNij3utUM2NH2%2FcAkun8VWUU51TDRqgRcN9rHfmQFZ4q%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDAihHzAFpj9rIbFziCrcA4pWG38hQQYnhNr9KpKDBkCIsqznvDbDwxIsEu2NDJvZfqfYyp2QHM1mmOog0t2mGbVJGaM6aSCFBlQhBdDuFYjdg7A0Ak35YIzVJKXjIZfJ1Q%2B1GJhUMrq%2FRgBl%2FTO3c%2BXivaRAvvpcKFaS%2B9qdW5h7CpodXDKH2XEy1pS3n%2FOak9hTvHZ1wZ7tuzl83Bv%2B1RKIH6aO19sz5YZaoiqq6acNWGArWzqLYD4FAWN1YyV7WXImW3AfC502v3mTMoxex5ErKRMoNyGwGBtSasPDoKz1CBoSDH2DIRQY4xhp3FJv49XhVCw%2BEFt5mUNblPDmYHd7fobe5xVuC3VaAvx0JAehhnfBrr1yes3IP8QMjyWwcVvaoW5Ms8g89IBfiF5YGNJtN9yhilNlcMDDRo9hbh%2Bac9UgBBPq1F11gvKg2YcpUpP8BRs%2BvYY5mCgUbf3JjMzDccLHA0ybXyjtgIOSHYNCLhpPjAa%2BuKPUySeuXwRIK%2BgbbX6DUYN2Me6cQOD2a%2BJAUsshM0Taxqq%2BpqCNto6SC92qdDVRRAD17bT%2FhdmWWX0JPdhsAE6XoKcNgltsEFLpfOEnO9woJQq0%2FjhLcamTFQrrH8Is%2B70Nrr31km28w2HqzFezbQ0ouUVEMMTz6coGOqUBYtN09%2BZ9Yqgf%2BJHHZJtsydRiil7J7jBKM3PFHwk6rvRTAk%2Fn1ErpsRVBzw5gQidP1GJ7HlMkLeE3lCpBd0hw2prcQgscF0hXBPDR2NzMoO15IBr6lHm5G7g47Lpp5RdheOGJYYWjC9F%2FNQ1Isp%2BDBtjGdSXKH6VB%2BEBVcSB9DZr9%2B4casvqRwnp8Uz6bXdg64ximMObOhmTBMAednDLYzXeoR%2FaW&X-Amz-Signature=e368c4cb537dfd8900ab0d7819058e1b470ce6d60123adc93a3464d6191fb7b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5XXJPNM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIA7GEL3jJUBwC64c1FCSW1FvADoxMm9qrmPYmCdDSHcCAiEA2u2xs1WXUBxUNYLAYy9eLQi6DVjW17Fxc7uEoyFayHQq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIHEKAJOTvrg5znJbircA359EU8Z%2BVuRT%2F%2BlEVVfvoEreeWf0ayT%2BZeJKDFA%2FnZ9g%2F1RbyTo7Z%2FCLL1wkS6bT%2B7dFga9Ka82lOY6WJ58RZKh3SQl9cds9EIPhIZ1t3x2HxdIPcJbJpCsXR6AlkEcLIkjjwYUAH%2BfjiZphqi3fHDrdPfciY5A6FQInZJR7ZRcB%2BoYopo3KNPxGsKUM%2F17Bt8GfieJVU8OiueqLnfpR0iYkGCkJbjuzelLo4K9uXC390Ez3ZDyVg7Erd7muAuEBB62zoDAHonBJOjJoIPwsEQtF%2Fs2HGjVJc3jzvoJ%2BUsKVryPTh6jZnG%2Bm7dAAqZJKpn0q093UEmnUPI9aTU%2Fg78Z7SCeQLp%2BfWE9vn7l2CMqtA082FczY5INrLbcQMNyKjOOYsZUF0VZvLhHZ3V%2F4jo8AbAnslz%2Bgh4iMbjIcRpdrR%2FECl%2FPaqagLgoYtacrbt2%2FAAfc%2FFr9e7G6dpNvg%2Boy%2BieMTHQihuuVI7tnppIxRyTlNcw%2FmKOQYHmJxIQn41jx9IdTf5SMtBDa68jbupw6yGL%2FeufaP6DDskrMm43YbmVWPYzL6g8sOGMPWLgLL2du0boTUDZ5%2BkTz%2Fd7LmX1OCGSpVwc%2BRc1RcLW9p%2BP4LyVLhZ0vBc%2FUq%2FpxMJzn6coGOqUBD4%2BiU0B8uL%2BB3W3uMuq4OHBzQ13Q%2BfZi9JnBKPrrc5CAn9X6d29A5OHnrRvbTiXmEVaPg1bvAJzaeqPsx8%2BackEj5X9g2oL3zT%2F6BqvhaIhWa4wztBA7vDxwrYaNAP5FjZYqdSp7FDycBIxBofCZlk8%2F3HJlzyYbKK152%2Br22jNLw68reQsXbXcNFmsU%2BtRdlHeviJdqkN5a8HEY1%2FYjmBJkfvCJ&X-Amz-Signature=ed79d244475169c3b83c0976dcef88eacad43d0f2ccc4974d838d55f951342af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5XXJPNM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIA7GEL3jJUBwC64c1FCSW1FvADoxMm9qrmPYmCdDSHcCAiEA2u2xs1WXUBxUNYLAYy9eLQi6DVjW17Fxc7uEoyFayHQq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIHEKAJOTvrg5znJbircA359EU8Z%2BVuRT%2F%2BlEVVfvoEreeWf0ayT%2BZeJKDFA%2FnZ9g%2F1RbyTo7Z%2FCLL1wkS6bT%2B7dFga9Ka82lOY6WJ58RZKh3SQl9cds9EIPhIZ1t3x2HxdIPcJbJpCsXR6AlkEcLIkjjwYUAH%2BfjiZphqi3fHDrdPfciY5A6FQInZJR7ZRcB%2BoYopo3KNPxGsKUM%2F17Bt8GfieJVU8OiueqLnfpR0iYkGCkJbjuzelLo4K9uXC390Ez3ZDyVg7Erd7muAuEBB62zoDAHonBJOjJoIPwsEQtF%2Fs2HGjVJc3jzvoJ%2BUsKVryPTh6jZnG%2Bm7dAAqZJKpn0q093UEmnUPI9aTU%2Fg78Z7SCeQLp%2BfWE9vn7l2CMqtA082FczY5INrLbcQMNyKjOOYsZUF0VZvLhHZ3V%2F4jo8AbAnslz%2Bgh4iMbjIcRpdrR%2FECl%2FPaqagLgoYtacrbt2%2FAAfc%2FFr9e7G6dpNvg%2Boy%2BieMTHQihuuVI7tnppIxRyTlNcw%2FmKOQYHmJxIQn41jx9IdTf5SMtBDa68jbupw6yGL%2FeufaP6DDskrMm43YbmVWPYzL6g8sOGMPWLgLL2du0boTUDZ5%2BkTz%2Fd7LmX1OCGSpVwc%2BRc1RcLW9p%2BP4LyVLhZ0vBc%2FUq%2FpxMJzn6coGOqUBD4%2BiU0B8uL%2BB3W3uMuq4OHBzQ13Q%2BfZi9JnBKPrrc5CAn9X6d29A5OHnrRvbTiXmEVaPg1bvAJzaeqPsx8%2BackEj5X9g2oL3zT%2F6BqvhaIhWa4wztBA7vDxwrYaNAP5FjZYqdSp7FDycBIxBofCZlk8%2F3HJlzyYbKK152%2Br22jNLw68reQsXbXcNFmsU%2BtRdlHeviJdqkN5a8HEY1%2FYjmBJkfvCJ&X-Amz-Signature=ed79d244475169c3b83c0976dcef88eacad43d0f2ccc4974d838d55f951342af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPEDTXM2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQCU%2Fnl7tQemvW2YCXFJH4olBPbFSFP1FhCi%2Fy9QyZ8TawIhAJ8wEKSIVP2W19pLH54x9qHxT2E58N8rTujqgW4AoL8tKv8DCDAQABoMNjM3NDIzMTgzODA1IgyoNCd%2BRAbw3swgSOoq3AM1tnW%2FZr7gZ1O4DoHXqhHlHV0VSj2agSEVWnHI3zx7WbSpqIYY7sCj9OeQ6txv8EZqdL4kc77B1m0DMsmSOy8I9HrLyncPYhUVu1aVJC6tBk03u3yhtjollyl2nubQsIyFWNP%2BL8qh9TdPTZQlwl1BsH3X9JPvXX%2FVr6aJ1x2e1yvyj7VRzupS39csb12dYRGO7ZFC3BCmmUZuZt9tKc3Zjc9R1EVYAuj7tpE8ApQLBNFmZSqRplGqMw5jHQmBLaD7l9Q9FW4PcjwEx%2FNW%2FlO7cmZ%2FVuKvT%2F2o2cTKQ1IHhhepm0AFvhO25uEYuaNh7Tx%2FJki9gxuN0sVzihW%2FTN48DLqrBXDbhLzB7OM4L6CE3EmU5GweG5MMf%2BpeoABAHpBdyBeV1hmOie36fmNZSdoNfSO04YvuRIqi7ofGWr8m7wPqtSgwyzx3aPVBNFh5yZ7xy%2FXriFX5WbqS%2FnQ9QhzsO0GptgmFr29NkqGVpuuI3dlDH0U6suwLeGWCfUEpFff9QC3N6eJwDOs4gwup2ikJVyNT40XxuX2yZD9x3jCjUsQ4EJLVeNAnDJklVkdw8L6uJ74ACnRHbdEue09NGquO7k%2Bc7l%2BQZC1TF80lb3V89CnEenO4uZI3Nan%2FmTDb8enKBjqkASCA89xab%2F6GkJhfjp1IGPjWXG9FeVuycLR5jN%2BZnS%2BH6qr3iAG8nJw695l5Ak1Krc8Iqdzg8X8OZOTrpxFfX2ToIbeKj8Hx4MxcRRmKSrWHs4o0hJg9Qq9zPfYYxOFmWpbjcwbEqTJNDOHfTHFTC%2FoIFhAZpGg2Dzfl06Y%2Bpcjkux8aY6YKhG8EuB%2F5ZEV%2BUDmhQhKYBaQH5rinWI2m5GvDUc3G&X-Amz-Signature=59d49e51b61c25ed545aaac32b0ec8dc9fd42d37a49fba1e77357596cea4a9d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

