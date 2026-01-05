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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DNKQGQF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaIUOYib8vPx63odbJX7ihRL%2FSDtfW8Xkvw2TzlRuxmQIgbciHDL3rTWytzXcDbmv6eKpOcs6IGFNIwhRa6YjDhaAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDOtYm2tSP2XLsYduQCrcA3k5HYuuFL78WBH1RaKv1MsmGj7UMMm5qZX26oJZjOaNzOT%2BIXPIONTtyytCpamMVaBn%2FbQ%2FPaNyLkp63ky9%2FXWl2ZnAa%2BNj%2FDon1r3XkCisHIkdDuQ4LwfPqqISuYyCIlo3xtizLXs1BXEKR9H%2B80WsQjcyxTceXQ0zxfguyrz9LrBzWi5LTLYjeR6U%2Fr7DPw1fgm%2F8HiINrtImBfL5b29v1hhAsdiPL8kthYx8bmC0GTPzG%2BdbKTM%2BExoL3ApuaCnQpFTw4pXPgYMNZXRs0DPaq%2BP4OPDxuBRqEMcqo4a07HAFTpB8lpueGyXxI6GbufYYhqxjXY98PGoB7fvyVSm0BPW%2Fo3jr%2Bf6Io1nIyZa3mZItXXUjzbvnV9kvPaIlYXCO54WEZRnpnWkUEBzmdyaomdYIf%2FWRwYSAIqIesoud9aODC8YMx0ST1xqK5XT5v2Dq7PIr59z7c6a99GUYA%2B3ZJBUJtgK1RwVr3ZLmbVkGfKZMon2JZhh7k9H%2BLNGLtE4IgKtU7jF9F1ldWJFmisI8CxX2SjVjhgJXcxQoenOLLTvxV3FJb%2B95rjr0nL31ByVvKtRSAdZg5%2BAfCUJm9uwscwcs8dg%2BYXXdadtHdTAfX1t7DAuYornVADcRMNfz78oGOqUBUZS%2BsS9hgomEUrAAo%2FDK%2BuMwn8wGXlb1pTk3Zc41OPyiCpodkXzp182pa%2Fm%2Bht09ODvjwRSmyknYVSPLByqItbpMbOv7i9eB6OvXHL2s27SOIo9uiDjhYsXoiNO5qrjzo%2B45WlchZKoP%2BhHys4g6i3M2G7iEBonal4L%2By%2FeB1XdGbeLGDe6hdRJRh2KR01nK1cZUS5Cv8NYg0BQHA4SGrW9Pai7h&X-Amz-Signature=d4122a88d584ed79a9e30363d12186a9abbda14bebc80a8784da7092569aae10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DNKQGQF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaIUOYib8vPx63odbJX7ihRL%2FSDtfW8Xkvw2TzlRuxmQIgbciHDL3rTWytzXcDbmv6eKpOcs6IGFNIwhRa6YjDhaAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDOtYm2tSP2XLsYduQCrcA3k5HYuuFL78WBH1RaKv1MsmGj7UMMm5qZX26oJZjOaNzOT%2BIXPIONTtyytCpamMVaBn%2FbQ%2FPaNyLkp63ky9%2FXWl2ZnAa%2BNj%2FDon1r3XkCisHIkdDuQ4LwfPqqISuYyCIlo3xtizLXs1BXEKR9H%2B80WsQjcyxTceXQ0zxfguyrz9LrBzWi5LTLYjeR6U%2Fr7DPw1fgm%2F8HiINrtImBfL5b29v1hhAsdiPL8kthYx8bmC0GTPzG%2BdbKTM%2BExoL3ApuaCnQpFTw4pXPgYMNZXRs0DPaq%2BP4OPDxuBRqEMcqo4a07HAFTpB8lpueGyXxI6GbufYYhqxjXY98PGoB7fvyVSm0BPW%2Fo3jr%2Bf6Io1nIyZa3mZItXXUjzbvnV9kvPaIlYXCO54WEZRnpnWkUEBzmdyaomdYIf%2FWRwYSAIqIesoud9aODC8YMx0ST1xqK5XT5v2Dq7PIr59z7c6a99GUYA%2B3ZJBUJtgK1RwVr3ZLmbVkGfKZMon2JZhh7k9H%2BLNGLtE4IgKtU7jF9F1ldWJFmisI8CxX2SjVjhgJXcxQoenOLLTvxV3FJb%2B95rjr0nL31ByVvKtRSAdZg5%2BAfCUJm9uwscwcs8dg%2BYXXdadtHdTAfX1t7DAuYornVADcRMNfz78oGOqUBUZS%2BsS9hgomEUrAAo%2FDK%2BuMwn8wGXlb1pTk3Zc41OPyiCpodkXzp182pa%2Fm%2Bht09ODvjwRSmyknYVSPLByqItbpMbOv7i9eB6OvXHL2s27SOIo9uiDjhYsXoiNO5qrjzo%2B45WlchZKoP%2BhHys4g6i3M2G7iEBonal4L%2By%2FeB1XdGbeLGDe6hdRJRh2KR01nK1cZUS5Cv8NYg0BQHA4SGrW9Pai7h&X-Amz-Signature=d4122a88d584ed79a9e30363d12186a9abbda14bebc80a8784da7092569aae10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G2LAMCL%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFWSCDRUZPIPW%2BWudycQCPt907OlJEKcz8vZNgIgQeKGAiBnRRqNI2JxHXW321%2FnDpL9lGq4mYkHEcXxW6cJNFmFdir%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMUEettORV2C3qUXEVKtwDnJDatFy5lWdGnM6jH7dfI8dQeu60EHavUhcfSlPscvEDXTQu96aMYrvydtoLe37QdQ5qg%2FIyqRGY6fErfyGRrqcLvircAkQg9j2E%2BUA3NxyJ75BA4r9lYlhsdHwvgSsDTHeKXVgPIHoE1IBaorEACr6iracKmGjXmF88I74SCyZQ3wAaXvHz7jLMwAr%2FgrG3%2F7BLGs5grLK1KEDo2hXPAi26SO%2BcJqLr9YKQaHjtegFEKBWzWBjPqfYUpeIPU%2BGFas088B1oryD6sH0ToK0E0i%2FZD4wDGzmAlsnW4hgWdvIgH3GYesi%2Bn4%2FxH437WUzMRk2YmZwywlsR%2BKHvhoJ%2Bx4h2oofQEDIR5kATc12L%2Fp2TaOeSKLw6BlqU69Hyp8q1WI3vDnsg0J2GbEzTrZJ6ngExa48pqBg4tcsEBPFBbBo8Fhr5%2BveeN2jdewVEUkQj8yQ4IYcbvI%2FyER%2BplXmKbe3GlJRL3kb0nucuXOC8BPKLwvDurM2MQzbSn4J2MEfeNmQtesj6m%2BwP6sdMr9d0CZgBk5p5s279ismxa5WpEWW0ch9Wlc1NcdSIA0KTJ9b86MsxiicRYi3aWF00XLpYOqIYOEuxFpbtn7XpOvIYFBfLZ%2FW5imss6nV1N4swhPTvygY6pgEov8uVzEFwWS409xsJmEl5lSJL04SiN0%2Bj48xmpFgC07rTrcw99t9VkR3gSsDd8%2BRtHQvsjgdPHOGt7JMsXjCBeJlPLm%2F98Dy3j%2FwRZB1Oq8fjGQJt30O1HMgXgxYFegZ%2FOHLJYr8rdCYrtMeAV60TmW6wwBYqiMZUxriybY58dITGtjPibgj4ytjk9qiumwYM2muR6K1TlN0Hondh3m%2B5Q1uPTsUD&X-Amz-Signature=a1109d233ad05d0341c9f8e9dc9d48b83b26b123921c8d9b42441bf0414e1f73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD32KBSQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGGr5%2F3YdpJIsj0swnXnI7MP1orRDY%2FkQFkX%2FKLPTnnRAiBEX9k3n848%2BCTlBHOZFCukjwN7ghNF8dfscl6D23vU2yr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMUhdKwPr%2BH06nq7sOKtwDYdd8lnSNEoCdpgDwkKEJyMuD2U1rcioGXOY%2F3Yf0wDysVtXEhcOwyTHlmdo%2FEA2e3DltqkW8fQ%2FMnHbgETxb%2BoKcmSFkff1Xb93lRelepkfPL0U7%2Bg%2FpF0zPSxK8Iuz5j%2FE7W9SZOED6CUwXp94Plm9QAi9y1oiK%2BZuaOca7BevV%2BYlebb2wX7EhRsLXJuEdYbuAu8SAITvUnzoIqHgEgYrXarLAK8ydwmN3bwqH3RRU0bYgTag4F4rf3ogLsPtYInxEQH5yxNZWfJATziasq5IGTTbx%2BodOFppYzpZ6FNnnGMr7%2F%2B%2BE%2BqAeoK9xx%2FjINDlAPbP%2B6kCDa%2Br%2FWDz3N%2BiBnqGvCfa7Mlq7ca6NJZI3yxP3N5%2FcRRbgyGBoUMcf5C3L5Q6E%2F6oHTj26iIgr%2BaSGts85mD2fYnaHiPYfg7v8RCul0y9RNhXgEaavYsERu5xU78b1M%2B10pmNpFHtWoFnjD%2BKFgO2pcm0CPLlu1p1UEJ%2FVaFBh1Bc0IS6z3ecSOtqt4hxiTP16C2kACfvNgAbykLFYhHwCL44WlIoyVeGTQheOOhwO09JbEC6d2Ybup0uqCN64fqcCYBxhayx%2BBIud9S2cwqgqzssPvk9xoIG15%2Bst1DOv3YB1ENIwivTvygY6pgE6hBzh7vN2TP0jToG3MeaZmXPGp3ECt%2FoSxxi8svASNvx3HhnhtKy%2FqQVWIa6Rtw5XB8kSufoL%2FHQ8wUQuWUusiEvRuVFeQQm11oiKQ6BLypFi9DjHLGzLamHWG6wVsjXNoguGxX4Fg2ZBG8hSdrheBRU4PVCenbsIiHVSMXxQecmMR%2BjgXCLKohFluUdBiLrNUCekK%2F7pYOvgfOwpVVpOfmD7iWAE&X-Amz-Signature=706791f2f21d710762ee04cc33ffd9a96a7c1b79e9b7d71287411d95c7a95f32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD32KBSQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGGr5%2F3YdpJIsj0swnXnI7MP1orRDY%2FkQFkX%2FKLPTnnRAiBEX9k3n848%2BCTlBHOZFCukjwN7ghNF8dfscl6D23vU2yr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMUhdKwPr%2BH06nq7sOKtwDYdd8lnSNEoCdpgDwkKEJyMuD2U1rcioGXOY%2F3Yf0wDysVtXEhcOwyTHlmdo%2FEA2e3DltqkW8fQ%2FMnHbgETxb%2BoKcmSFkff1Xb93lRelepkfPL0U7%2Bg%2FpF0zPSxK8Iuz5j%2FE7W9SZOED6CUwXp94Plm9QAi9y1oiK%2BZuaOca7BevV%2BYlebb2wX7EhRsLXJuEdYbuAu8SAITvUnzoIqHgEgYrXarLAK8ydwmN3bwqH3RRU0bYgTag4F4rf3ogLsPtYInxEQH5yxNZWfJATziasq5IGTTbx%2BodOFppYzpZ6FNnnGMr7%2F%2B%2BE%2BqAeoK9xx%2FjINDlAPbP%2B6kCDa%2Br%2FWDz3N%2BiBnqGvCfa7Mlq7ca6NJZI3yxP3N5%2FcRRbgyGBoUMcf5C3L5Q6E%2F6oHTj26iIgr%2BaSGts85mD2fYnaHiPYfg7v8RCul0y9RNhXgEaavYsERu5xU78b1M%2B10pmNpFHtWoFnjD%2BKFgO2pcm0CPLlu1p1UEJ%2FVaFBh1Bc0IS6z3ecSOtqt4hxiTP16C2kACfvNgAbykLFYhHwCL44WlIoyVeGTQheOOhwO09JbEC6d2Ybup0uqCN64fqcCYBxhayx%2BBIud9S2cwqgqzssPvk9xoIG15%2Bst1DOv3YB1ENIwivTvygY6pgE6hBzh7vN2TP0jToG3MeaZmXPGp3ECt%2FoSxxi8svASNvx3HhnhtKy%2FqQVWIa6Rtw5XB8kSufoL%2FHQ8wUQuWUusiEvRuVFeQQm11oiKQ6BLypFi9DjHLGzLamHWG6wVsjXNoguGxX4Fg2ZBG8hSdrheBRU4PVCenbsIiHVSMXxQecmMR%2BjgXCLKohFluUdBiLrNUCekK%2F7pYOvgfOwpVVpOfmD7iWAE&X-Amz-Signature=503517785a4ca33d4b866ec7a6f719ba911535f76309f045eab52c23b830c57c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3DK2KP2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOl2ea9DTGg7paKiclHTvWTP9eJo1TUNJQcievNmcgqQIgLRGKcdTrd7NQs0JxyPYJuwpPmLGfwHfOtJ0XeKg1B7Iq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDFgXARYPFL3cKY1svCrcA6K953xVr1esCWGIOus5%2FPN4x0ds3lJpJWZFiv18ZTElIPq%2FyWW0GUI3SwZRA7yRByU7YzSOTKXw%2Fj1n3rZ4VRtKyHsZdsXBgzQg77u7JHkyA5R91rmN3%2B5itwTr35v2Vqg%2FU07FbADXDjiNRa6TnCK01p5v3eVQ5DpAWpcVnGeqFb6MGDNPvq%2B44xgKmurDJTDmVLm%2BN5u4CILPtI6peIz8SHrte8xCtY%2B6ziFCMnG%2F%2BR5n3OlWRVLQRit0BDH1pjZmjtjuJt7UqByMRCmnv7fukWM2DE4Vbo6uIh%2BFX6ZtMWx%2BMnZmokVDawHl2ryT3ly%2F%2BXIbnlMAaiJn%2B4skCJVJpHzfGzkp0aMTRvL0gD%2BUcPtTsNQkCEoCKDhapG7%2BQztiTM6mIG%2BjbqeeqQNV7wr3yxotVqsYTd63KUme8oTkq6hir%2FGpHkPi8fxdl%2BqT%2F2VGGCu%2FxwI4QkNMqu4BrLztt2j28hJE94oPSiRpnYOvIfG8Gn0U01hsw0GnTlWrygtPVJvmnWCu3lv%2F658atqcId3HCwOOMqZoaik2fgMnytRA%2BZdgrIpjfiimkDU3Il0eQojs%2B1rq%2FLjE3wzqZytTR5yi82kpI5agbr%2FHdQ6hZ72587YJemfepjJzLMMbz78oGOqUBs3XgIXnojxyaaoBnMsWBnQzKcTXDzTKs%2BmsQnC%2B96qlVb265C7PfH9L9Nhot6O3%2Fgnli74w1tGWd%2F%2Ffdr6guMXRZxU3kJXjMiS1qQmQQLwtoXqcZhqAfEqEOLpq92GAmzNdBCtRXn1udgFDyM6YxvWBIRT59l4z0uxOdOoOLgoIBYErthPJA6tdxknKR%2Bf91qTjliHLQSLhjbSSwvLTT4HhfIv8f&X-Amz-Signature=772c728228783c81e0681e51cc771dd1aaa3c85ce2a9bd91f43ef9440896c448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667V777KRQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2Bt0mfYASwvfL1M7nLEuGMs3L78Qomdfh%2BcHM5qwOKxwIhAJWVNA5yULVlhWLObwLOIbAVVuAeXn0lblkUT%2FOWx1CUKv8DCEsQABoMNjM3NDIzMTgzODA1IgxanQMCubxyC6TKQ48q3AMnir30%2FiXlHiyPa9IICZu1%2BxXLqG7by4MUboO1SC8GJ3uB%2B1Knh5M0O5iaWliUdXJDCmt%2F6xcmtKB0BBXjOxj6trsmQvR4%2BdMmbmBTBkKNJulZ2xWb008zt7rp0t9K%2F%2B0O%2FaWcZLbisZf4zy2%2FQqjHkHFYcVs64JjVDP9Ry88%2FQdLuNoSmi3uqYjmiO1QBLAxKbmT%2BXbcugjePhQ%2Fif%2B5YJDMNmy8t52SptOnWauxeI5lYpTxFrJcXtmVATyrxLafEnokXBTj4gQqv0hfS95mOHtytT0heIIMjB5TY9QqBeJ%2F6crokUso%2BkanWOwdWE10yZVmdmrKh%2FgOQZvc7ngDeZ8ZKyrPGpm8RpnDy8yBphtnMtVwFK8ZUgIHELShlB%2F5HKMWTYu7IwosS1tGgaCjre47rmFeo4eYXoTtqtR5J%2FxN7kI37SoOzwt5y7KTKQOvNL%2B7wIBxoTTb%2BfwUYPTPQd0x%2B793owBV7jWp1wjMGCzncBQdDc5Y2SePmMTfeaUOefrCTtNfuVR50aiGwSibja51bjESt6QPnt9gw3HXlNlRRVn9TmhbL8bqkj8PzTr58ymbxEtPo1vsL0gOCwU4ZyAJimpYFYiKy%2Fmpm2aD8SYo53QIQ6FXnLsiv1DD38%2B%2FKBjqkAWgmbtEK3IKUBHwgzhAILN8Bvz3T%2BfxuO56IV4JK7RGMMvXUQH98XEuJCGfFa2%2F3rLyuMT1fBx7Dn3g%2FKMS%2FzlhgCPOBDgq%2BA%2FQ3QXzdFRrmB5pfMWfvhKx1%2BN1xf69aZr5NpkTQad4DSJMcG8y2NTxr%2BZEuqCoKX%2BxuG2nBzWpSPLMoWNnsi9CmD3JrhS4tiRUGgI6vvFiHNT149m2x19vFzH83&X-Amz-Signature=5af3f40f0917ef950953bd36c280a7d8e87a6bc979261bfdc9fcb4fff192658d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674YBWRKE%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcgOYw%2BZL%2BaSBMvS4ZOti8Hhriu1Ref5p5o0zFr0i4KwIga5aZBSu4pmWEN%2FcItaXTOUF2bhvK7PW66V4d3ZhBlOMq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDBjo6Skd%2F8N2TVsYTyrcA19tblbcFYXZiq%2FZZsYQ1UsI1dj%2BdfEOR4Wi9a3WZVzPvbkPpgcricZrdSXv7VNu%2FyyRBwYYHYSQzK%2FCGgLqsM8Pn9Pzkxbrq6%2B8y2MiAY4MNFso4kMCwqQSG2y0MqOEuIiIap7NUO5cye8JnplJewd%2FF2rLALa3DwtJsEdeihi%2BvLlIIQiDCehTjL7W1GBvOE6oaFY1wyzfNrXVfvx%2F0ntxyFY8%2Bo71%2FCBa%2FTJTSn0XjCwygpBPXsuzFlZ2fuDOAvwMOb7G8DivD%2BAzV3I79FDIdE%2FN6RiWF8ls4koT8yMiIP8J%2F5u%2BIGRnjEvdS%2FPRW06A4wOCf2VZ%2BBdYqV6gdxXFAkp68NLVJ6uYFgZc9miyJZTdKdwSUk3VrHS9VS0V%2FuWDZSf0iTrFUKQQikA8g7BDCJ1yBMNX4TpSqWGQBLLOcQV9gidVgR1%2BZhfT7GFrCVAMQQOsYAhvMdclxeHtdAvEWga7NeTr2T6ZzlSKlgIbaX0Dpp91ymTvjBkk%2BB1kFEBFl2d3LHGC6aJvy1t3lkjGroKhxv6yNRmgRCB4Lf87H0m0Y0xPPtTuwIAck25QeP9G2VxdrXKmgse%2FSWB3U6CGNOK4%2F4el1TUWIXe0fRFZx71NmaPQz8fcVXmOMKL078oGOqUBQN8HRhyjOLpQDllmD%2Fek2w7rEUxaAdD4KGiXbPYmmjXVWE2UCb609aeCja63yT0lphIqB4WE%2BYOK9E3jASjReGtwRG9VbOZZYr2muVqvGMI6Soo6G83Wm6lSDO7n6EJY3ygv82YJVXWB%2B8XGCXlM%2Fh535L1ngaj%2B%2BG5M2YGlG0Wq%2FrC03U0OgCJ9uiRIrVkbsJI0scNhtYrj3jxtHuKhNtStdN%2B2&X-Amz-Signature=133dd9d36c654354b511270819ddbde9c370045072e956ea06215c95e74c8c41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666THQZHU4%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUhS6WZt6A4CEGC5%2FA%2FYnNKB3VAJ3MXsPP%2FF9Gsgff6gIgRRj5ab18%2FV7J67Nt2DiHpsDv4zj%2F7RaDS5YPYPh0VVgq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDMOvNWe5mHqz4d9NFircA3%2Bnw5hjj7UcAhlceIn8sKDO31R9bfDDCLbztfOPqp%2Fayahd%2FK%2BL1flvHY6VedT46yMTe2x1ZRWOyj38RRKhHEw%2FDP6MgG1cGdCZM6IQvkmmIGxwXYl87sCYFmG3t2zoc%2FIXgO9y%2BdcYFGVksg5GSzXW4ZfBGHtoIpnS9ZMOZhMvbDwTt6UbZ7FNuufUQxiKlM7i00jifN%2FQUaISfaI2pCy3S3nXNUVd%2BVYRihPAfh6pyDQ1fhylDr9i1U%2FJkBbRlSIj35j%2F9%2FMGXd61BlXWmHWZEou%2BW12ri8ornjFTJjarX5T2PBQuehTA8OpSqllLVLy%2BaQMl42VtWwQqjDLC3DDCJ4KVx4zkZ7wAgIdQNXq87tjoGWAThzXUySxrpafNqhZT8J5jfqLt304MA1CCQhgaQFVP02kIywcU5515mDvyDfWDEyR8XKNyyXGmzQluxTMpV3tMuIULe2CklyeMvWZYcelYIBEghIzDeJWxkJpDyhLqpZpGB7BAe9tCrePXCM67W5%2FuyN0d%2Bp0mMDvp3SgqSqx1ab9KBHe8WHQdbwifpEkBT9A0hUN5%2F1QbAGEUSQzL733FhByen3QPTJDrrvb67%2BOsb0s%2FesOY9vdv1Ev5v446xSPjuQjLfMS4MK3078oGOqUB9vWKNdwZSG5IhLyCg%2FmBPBftSeVTsFgY6%2FEE3chygadzSHqn9Gqxm7l1YZWvkGoVT24NfN9JPB8xUaGUyO4BRciV%2Blxpy%2FiwsBH2Ryf%2BPR60Cz6sgb0X%2BS%2FxCBAtSA4yDAcSle1QsvNPR5pTCSRsKhQh5xq05WqcTqBRpfNsEQlKG5LqalVcVbZgBD9Uvg07TFjDX5YghqFFCjk6Pg4wYpLgOjQg&X-Amz-Signature=bafa122f3a00f717a8a65323f0cf77adaedb2c7684f54de6966394413c78ccc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666THQZHU4%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUhS6WZt6A4CEGC5%2FA%2FYnNKB3VAJ3MXsPP%2FF9Gsgff6gIgRRj5ab18%2FV7J67Nt2DiHpsDv4zj%2F7RaDS5YPYPh0VVgq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDMOvNWe5mHqz4d9NFircA3%2Bnw5hjj7UcAhlceIn8sKDO31R9bfDDCLbztfOPqp%2Fayahd%2FK%2BL1flvHY6VedT46yMTe2x1ZRWOyj38RRKhHEw%2FDP6MgG1cGdCZM6IQvkmmIGxwXYl87sCYFmG3t2zoc%2FIXgO9y%2BdcYFGVksg5GSzXW4ZfBGHtoIpnS9ZMOZhMvbDwTt6UbZ7FNuufUQxiKlM7i00jifN%2FQUaISfaI2pCy3S3nXNUVd%2BVYRihPAfh6pyDQ1fhylDr9i1U%2FJkBbRlSIj35j%2F9%2FMGXd61BlXWmHWZEou%2BW12ri8ornjFTJjarX5T2PBQuehTA8OpSqllLVLy%2BaQMl42VtWwQqjDLC3DDCJ4KVx4zkZ7wAgIdQNXq87tjoGWAThzXUySxrpafNqhZT8J5jfqLt304MA1CCQhgaQFVP02kIywcU5515mDvyDfWDEyR8XKNyyXGmzQluxTMpV3tMuIULe2CklyeMvWZYcelYIBEghIzDeJWxkJpDyhLqpZpGB7BAe9tCrePXCM67W5%2FuyN0d%2Bp0mMDvp3SgqSqx1ab9KBHe8WHQdbwifpEkBT9A0hUN5%2F1QbAGEUSQzL733FhByen3QPTJDrrvb67%2BOsb0s%2FesOY9vdv1Ev5v446xSPjuQjLfMS4MK3078oGOqUB9vWKNdwZSG5IhLyCg%2FmBPBftSeVTsFgY6%2FEE3chygadzSHqn9Gqxm7l1YZWvkGoVT24NfN9JPB8xUaGUyO4BRciV%2Blxpy%2FiwsBH2Ryf%2BPR60Cz6sgb0X%2BS%2FxCBAtSA4yDAcSle1QsvNPR5pTCSRsKhQh5xq05WqcTqBRpfNsEQlKG5LqalVcVbZgBD9Uvg07TFjDX5YghqFFCjk6Pg4wYpLgOjQg&X-Amz-Signature=6ced57e88ff440a35d96a718a3101e45a1c747404445e71855ca95103716b555&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RN5CFNQG%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3TxlDip9mTXCG%2BtnYcfxOApTe6baJHqvog7Ld2hS2aAIhAIDv9Tn%2FsT5BC1eHCSVADcUWO4e4Y7L6Eka9z8zwW390Kv8DCEsQABoMNjM3NDIzMTgzODA1IgyHc5h5dxAQ1sdJIFMq3AOCDUc%2FHM2GPeh2wc94KbwM4tX2fHqjGvakDm1r7tSXwrTF9hwZ6TNFV6sLjUSnUGndNy4YRUP9bnjwvpYgNIICeaBR3uw3zvNA7uLD%2BTTEebmeNbhr7dyqoHc2KKN8v7w%2F%2FmqBTEZPX%2BlmLwIAojtVmBQR2EZg8AAA455Cci1nVQlQxH%2Bnq6UCzjRSg1k4UqMtYUBBxTzGEzv62qo7liXxNVkGM7ZoG5%2Fi8tdw5FkxHa%2FQhcAnpSYd6t%2FA%2B%2BDH8JJ%2BcYVuyNQDii69LmO7caN7bz72id8wa70R4E5P6LL2VcHtMEDQoonN64lCs4fd%2F%2FA%2BHMs59XQQu5yN%2FxS8Qz%2BBF8dFqOyQR3s4AdAENWn2CTO6eB6XVWi1nJCskt78oZPyVBlzIS5gOTUZjKfgyzQr0VaQEyKxIsV4KEzeF5dpDlKGW%2FJxjQZW8qDlWgga0P3YfDD1Jv137umUQCDt4%2Fg%2BsnMh7tclqwoDzDuI6uJz7aV8o5p7%2BV6gDQuk3CLAZvbK%2Bp%2Fwbfk%2FMp3VUurePPIUXJ13rO7BmtPSQbGPwYzvhz7buvdKJUC%2BcOIZ%2FnUkUZkjHUE9p6sYOPaPTTzapBRIrlyjxXYdZpASb2fDpWXwsSxhUB4A6ZOYb6fUFDD78%2B%2FKBjqkARaTl3dyM0pP4ggxjRTNIPt66OEwpxjuLigWa9bNvrTtrAsyj%2FYuaO53xr2jgisNHAGSkOuRQg7Hc8yUdY0h3Rk0eNKYNQ%2B%2F5GQqIB34PGDh87D8Dmhzu0jAJlarwpvp4dB6hz%2BaTt%2F6ri7sp8PP54p21QcmW%2BnG9ApKd5Ufk65C5nG0Z5EeP9O4pWI8fTNiaYtJGXrUHlcv3sS03EfsEQTExpYf&X-Amz-Signature=64a023384e00dc4dd82f229a6555879ebd863a4e80f3e0a6c147d94cbfa8d8a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2PFPYKP%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCh34QFH6oBnCUf%2Bzk3QcjlBHjp6gUM4yqm6mt2v%2FgAewIhAOplMaKWRkH2VoFoP%2BhSTaq3IhUHtiGdO1RS8vJOVs08Kv8DCEsQABoMNjM3NDIzMTgzODA1Igz2qXiI8RGqWqXIVncq3APPDxuo4K%2FynxMIUR90eb7gHqHVATXyCARTX9Nkz8pfkXubTckvtYElhsd3sVkVfcEn4Srv4QuAzr4I5hSnoON39aAE7SRxDzftojNrggHNciw4fGcFNcVEe%2Fshcb7MjWX4t4qejwQngKsIhj7YFUaEg690QX%2BktbLxTWi5OxZrh04n5nO%2FRCyOOy7n6SfBHSyFpzBVm9lM%2Fa%2BXuQfOCv4O5aY7f9%2BAm%2BOiVVAVIfs9BE5d1L48J22DPoLFlDRSV%2FXFxFebs4qM5lIjTciuUvbAcw9HIOKybq3FJ4OtgPPo1DnC%2BwqdCz5ckIXMwOtveaEBvpyTvaPUJtheT%2BqMt4sTM15mYpZcuPGu2jxpgzJJlT0xSl7gU2hzWF7hsk0gbV3Vy%2Fk7i8rtcNhM4tKXvwoi1hzwDCvc0vCSx5F4NPz4Gs74DuIlceosYCya327kAMXWFVm%2B2gaEJMftus0mZFDGtjFkFccJ85iUZbzKD%2FDQCwPTdoSY9e4oblOzckRy%2FARqzHKqX9QNflW3pEXSJ6twp0uwNJ7Oz2MZZiZdQi64ruKsyN%2FxE5SJXl73ZeH0ZppXHE20brp0AapX5oM7sqX5h1b4R7yyAXheLbrsLp512iKOAj6SO8YPNZn05jDt8%2B%2FKBjqkASCaRfR489yW58vfmznD%2BCKuAH4c1DdcYmcwi5%2F3fRykmuBFIIVSYV53ztAQdiDOIKw%2BqLQY8B2%2B0uEXQ6q3LXsELt6Re7L2WUUnT3w0WMwdmFPwFxxELCXUs%2FQwTH4Bqiqq3P0whYEh5nferRalsmuhe6hK9umLmK3NtRgV%2Bjg5XxvZrg4lsNAQBz9YhGI3KSKYvxm8SOIh9ekZbccwVpCz1H6b&X-Amz-Signature=c6a018672025b76145f9d6b5d096ffb544a79debe1d4f272f8168e34875e42a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2PFPYKP%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCh34QFH6oBnCUf%2Bzk3QcjlBHjp6gUM4yqm6mt2v%2FgAewIhAOplMaKWRkH2VoFoP%2BhSTaq3IhUHtiGdO1RS8vJOVs08Kv8DCEsQABoMNjM3NDIzMTgzODA1Igz2qXiI8RGqWqXIVncq3APPDxuo4K%2FynxMIUR90eb7gHqHVATXyCARTX9Nkz8pfkXubTckvtYElhsd3sVkVfcEn4Srv4QuAzr4I5hSnoON39aAE7SRxDzftojNrggHNciw4fGcFNcVEe%2Fshcb7MjWX4t4qejwQngKsIhj7YFUaEg690QX%2BktbLxTWi5OxZrh04n5nO%2FRCyOOy7n6SfBHSyFpzBVm9lM%2Fa%2BXuQfOCv4O5aY7f9%2BAm%2BOiVVAVIfs9BE5d1L48J22DPoLFlDRSV%2FXFxFebs4qM5lIjTciuUvbAcw9HIOKybq3FJ4OtgPPo1DnC%2BwqdCz5ckIXMwOtveaEBvpyTvaPUJtheT%2BqMt4sTM15mYpZcuPGu2jxpgzJJlT0xSl7gU2hzWF7hsk0gbV3Vy%2Fk7i8rtcNhM4tKXvwoi1hzwDCvc0vCSx5F4NPz4Gs74DuIlceosYCya327kAMXWFVm%2B2gaEJMftus0mZFDGtjFkFccJ85iUZbzKD%2FDQCwPTdoSY9e4oblOzckRy%2FARqzHKqX9QNflW3pEXSJ6twp0uwNJ7Oz2MZZiZdQi64ruKsyN%2FxE5SJXl73ZeH0ZppXHE20brp0AapX5oM7sqX5h1b4R7yyAXheLbrsLp512iKOAj6SO8YPNZn05jDt8%2B%2FKBjqkASCaRfR489yW58vfmznD%2BCKuAH4c1DdcYmcwi5%2F3fRykmuBFIIVSYV53ztAQdiDOIKw%2BqLQY8B2%2B0uEXQ6q3LXsELt6Re7L2WUUnT3w0WMwdmFPwFxxELCXUs%2FQwTH4Bqiqq3P0whYEh5nferRalsmuhe6hK9umLmK3NtRgV%2Bjg5XxvZrg4lsNAQBz9YhGI3KSKYvxm8SOIh9ekZbccwVpCz1H6b&X-Amz-Signature=c6a018672025b76145f9d6b5d096ffb544a79debe1d4f272f8168e34875e42a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VYR6GUB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T180144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIESvsa%2B%2FLzj6BCPa%2BI90bP7ZQ2Dq4zEfc21cXXFHP910AiEAgZJ9buDUHg2X%2B1QM6fIuK%2FLWewrBIhaeOCdrqckxhEAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDI%2BML0bH3wYzEC55qSrcA3xD9a7GwLzSiK%2Fb6JwJ7DnA43DuwYSV7%2BdX%2B9%2FA64ZC9G6zWXjFBAZHv0UJfDhKPTWmmJUi1q0dHz8M9cuBU89pHrA%2BsvET5QOHCma2CZdoJ%2FRt2Ct%2F0pitsJEUPzmvcRm8wba7yJKGau1d%2BLG93BGrKSqrMpFMcoUQOP7qBGI0aDR3%2FxTAG3q3xwzEN2Ju5cbcmE0BBLprp%2FY3PUGHIaxu5MJUuEFpYchiqNLimd1MjpbLTgARMmPpIVgifJwwP9sBt5wA%2BcEwLICIa6V1UEy5UxGimIKGfpMiN8Hp1zQkXpn808NtjwwNRD%2FbFUvcpbDmtJy6zTu7qhloeuZnq%2FTCgSgTt2iaxIHA7GqGLM2grfrhs%2F7mnqFNyBPkbugVPUlyrMNf5EsRyGH2rxwPG2Oo6IVoU6ZBoUOVVAaajMD6tR1t8KakU%2B9XUAUyQn3CG%2BCTkFTdB6Hvuk3Yziscce2s9jQORmOV9lXrXyEbyAlcJQDTUehYmuKIWRfXSyRKrwWbZ78S%2FCEgfOEecA8zkQGvjjVO4H5xFXSyaTfEKDsoAMmuyEvjWE%2FJIKaKIyD9fuSG%2Ff9q%2BGtAPmObWlwq9n79hWcMFaDGl3WyoosGRt9MDznGtqGk4r8mrGVsMKj078oGOqUBYno17oBdQBFpbrFri0gAIwRO2TzjdkdJJwn2MwXlwlsBpdh4Ee9Lq9qCDCKYR%2BrB7ZH5WZ79WHqJC5nLgE9WMBI18sL%2FCPL6ruMuNKIWJ6zKSYfarxJCI655mxGmuatDBxWcywqYEmnf%2BD3Acb%2FaGUYVT8A6sSjlD03GH9gbchGwgPAwciC03%2Bh%2B5K2YpiN0JD9Bww4IKRJBO74bsKyMidq8K01z&X-Amz-Signature=ea1432a281a6f01c0adfe371f4bb7f309d91e2b85100be239c2e3e80f10de619&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

