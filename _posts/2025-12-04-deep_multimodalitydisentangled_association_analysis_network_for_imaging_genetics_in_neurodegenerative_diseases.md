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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7A3M2IF%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBXTI6EiHkVnIrbm9Rtq1iFubP7ruDAYrzvk7noeuoVEAiAcU0kpLm6DNEcYNXo4fqMP0BfLv4yWEYmG5PfeJylTTCqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTWkq5Ybu6jPKAivPKtwDxte5NHdfkSHf7zs49AvzKO%2BJ36bluEHP8KhHRCW8rFBIWOXPYW1EktlGULvfpxZdfIlRTnk5RTdoMATsdQFgDEsqkpd2E9uQO21FS%2FDAWn9xjy%2BUV0fJTHpipTU9QQpIFgHgi0RZ9v09Mr4MwwhRpAXdA4O9BMhG5OUV3xfNE8u6J7E1rHatrkKZ1hGSB73nyDb6RLhnowgetvSPx3sUSJDfj7m2iNW8nyodETGzQvGD6P2uGcuAMImpaktYPGriES%2Bi28QOKN%2BtlgPURbxxdTQbjjah3b0tngBVXSD8oylav5RqE0Fg9ZQwhIFYdHXb1nPNU5xMiDdu4TvDMHvcKev%2F3hC%2FmyMMwGNLMugf9p2Qq46ymaQdzjjr5jztRvPU69tGj9L7l1w6qYFMU1GWzU4%2FJmcZP62DWu3RV499gOhAu5c0fwuq12TjNNziD72q5eFhjyMLM8qQ8F%2BPNIarpLdsNHaoKhe%2FLPRJj5EG7nAV%2Fu7%2FeP6WZNnqxNOKGgLm0Vt0BpJvindFIVR8Nxr9WoVM2IvDd9V2U9Em%2FKhJI72wY%2B0ryBNoNyPBqRSgLBXlniZ%2FNiN00FdvEL8oP3%2FjHYBynfolBwskCR89hSbRjLtNCzGeY1Eol5p9nCUwqe2%2FzgY6pgHZZPz%2BPhP%2F9yOApFiUGEPGTjaczq3bp%2BjqW%2B%2Fk%2BfOK51%2BN2hO4mKR%2BlOaoBZoAygIrmXKLz%2FYCk2BzeFycmKsVTKKb26m4wIuM2%2F7McCYhh0o5Ijiu%2BLEozXYVGuHDPNeehaucozPbuHx7UZ%2BdVT1i5L9nsTf4in9eWnK1pcZFbLob6VWlPru8C7sLm3ssmOhxaWTc8x0C7R3FoPjsL2qHD%2Bq2CmDG&X-Amz-Signature=03135dbeaf400f0cd15133d9253b7ccf24d615d7bb058f67a1e84b2d9eaac553&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7A3M2IF%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBXTI6EiHkVnIrbm9Rtq1iFubP7ruDAYrzvk7noeuoVEAiAcU0kpLm6DNEcYNXo4fqMP0BfLv4yWEYmG5PfeJylTTCqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTWkq5Ybu6jPKAivPKtwDxte5NHdfkSHf7zs49AvzKO%2BJ36bluEHP8KhHRCW8rFBIWOXPYW1EktlGULvfpxZdfIlRTnk5RTdoMATsdQFgDEsqkpd2E9uQO21FS%2FDAWn9xjy%2BUV0fJTHpipTU9QQpIFgHgi0RZ9v09Mr4MwwhRpAXdA4O9BMhG5OUV3xfNE8u6J7E1rHatrkKZ1hGSB73nyDb6RLhnowgetvSPx3sUSJDfj7m2iNW8nyodETGzQvGD6P2uGcuAMImpaktYPGriES%2Bi28QOKN%2BtlgPURbxxdTQbjjah3b0tngBVXSD8oylav5RqE0Fg9ZQwhIFYdHXb1nPNU5xMiDdu4TvDMHvcKev%2F3hC%2FmyMMwGNLMugf9p2Qq46ymaQdzjjr5jztRvPU69tGj9L7l1w6qYFMU1GWzU4%2FJmcZP62DWu3RV499gOhAu5c0fwuq12TjNNziD72q5eFhjyMLM8qQ8F%2BPNIarpLdsNHaoKhe%2FLPRJj5EG7nAV%2Fu7%2FeP6WZNnqxNOKGgLm0Vt0BpJvindFIVR8Nxr9WoVM2IvDd9V2U9Em%2FKhJI72wY%2B0ryBNoNyPBqRSgLBXlniZ%2FNiN00FdvEL8oP3%2FjHYBynfolBwskCR89hSbRjLtNCzGeY1Eol5p9nCUwqe2%2FzgY6pgHZZPz%2BPhP%2F9yOApFiUGEPGTjaczq3bp%2BjqW%2B%2Fk%2BfOK51%2BN2hO4mKR%2BlOaoBZoAygIrmXKLz%2FYCk2BzeFycmKsVTKKb26m4wIuM2%2F7McCYhh0o5Ijiu%2BLEozXYVGuHDPNeehaucozPbuHx7UZ%2BdVT1i5L9nsTf4in9eWnK1pcZFbLob6VWlPru8C7sLm3ssmOhxaWTc8x0C7R3FoPjsL2qHD%2Bq2CmDG&X-Amz-Signature=03135dbeaf400f0cd15133d9253b7ccf24d615d7bb058f67a1e84b2d9eaac553&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OCPH3AN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHYLkpNQiHPHZpGlSeslBmgjTl8n%2BhfVWsWTtMDSej0eAiB9nBjiKCW5bkoZ1ktiaMzSmu%2BaoQu2y6QSKdvADygrUyqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfGrwwUfzKszj%2BXVzKtwDNusnJsIDbZfX5B6xgb7GQdUjCV9nQkGGTT0fAOKkC2NPNVLBSLeBxJiHet9c%2BJ3sstU2ekVBPs4dtHXk0wM6bc0Y%2FFDQIYO%2BD1Km6hx2RRguUHRsOfTnHFa%2FSzowxGHhOHtmxCHIuAlq4oZIQ6LqOfFkNqgU4WmDIDe2yHYJSImz47v5Eh4COPXdEuODZY3HQUFn7h7lHNvcHxQk5YwJWu2%2BMm37ivKASk0HEPjpboy7MqSCMM8gCZgLbXQnx17opSE%2FlV69gzNw0bHgLgC%2B9lVGf8pHEPxZxYdNJu7ILM9lSZUJ%2FUcWN30cQCD%2FGIPq9%2BYi9viXcHl2DGO8DqsdAAzE67ZdI6xPbXSu6VFnh1TpKqMEGShlxdtbcHu7aanfb%2BoSg9iGE7Q6%2FssCHm%2B5JSpKzZ%2BFG1GWteVqE6QOPsv8TdD39uWiedgF6PUCfKNiFYOaglNOazOKzstLb%2BVkb%2B9tgmK2OAbdjs4j9a%2FTwjKOFHO3Jl4Hx%2FyLjTm3NxsvFtTSj3%2FFoLkbmKuGF%2BpiFkQ%2FIS0Wn4RRGrzZMKIM519YEa8aFixl1eoIUstxWtc0lbkqZTMLElnz54OaXZBnMVWtooCvv3wdDWxAakGYkH4YkFClPpNeyfm6P4cwm%2Bq%2FzgY6pgFcbJAhjzPMUJuW80ld6juuNL%2BszUreM2BJZhM04nwdEb2%2Fe4Axzsd%2Bpqp%2BbiK0HNDeVCfyF8BkUxWnshbkA4tpAoMRhvjgSvdaOkzfN5hYAook30ReEneMHs%2BIR0UQnl%2BcCHs9MNKz7M1kFUgQKkclv0U9%2BgrQN5FRRNCzq28478UXQv9J63GoxKLFfX1mZHQvKqId2D4S1Xa16DJq4LPULtOzyldV&X-Amz-Signature=cf7b7b82631aafba6df8326ce9024a2dd356fd3902204215e8a9b64c8417fcd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLEHPXAD%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCk2VlKUG%2BCVlYnZyeFpPXYS9s6YY9s9EwZdR0i3cnVGwIhALZZmwQAH1vEYw78it0BjfpZttK1pXAyuS3AJMLWLdt7KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo%2B1O2CBB7akwKIakq3AMBcbTdWdtKoRRc8KrLhJUxxQyT%2FlvrWDPFs29ajNS8XYvu2qNbflvsHELPrAecfO8jO0zELigXdLIFMs%2Bv6jg3nxTyS1v9gnoDVR0sDoh2UbT2NL21Q8TxZOqmgmYqp%2BHq2Jsgqe9ePq0VoLv6bbjy0OHaT1SmEzY%2FaZSvFBAYkoWqNp8rMN450v55Mugr3nW7fiBZTuomu7CD%2FXgkidJeXjdmk0ppzABf5n3vnn2NOt%2BBBQ7fg6I1RGeovTg4SQ2%2B5v0zpUAUsFM6o5ZcvsXJeiIRaQtObGaDMwSLCWOImip6W9PjsXyj5sfCDJMe07mBdvcRny9QZGjnfcG76y81o7mIr5PyvPIHDI2h42eMpEocDpTYaW99RJW9SnmuVvFKFmW7S6jP2d8JBH1%2Bt11J41nzd6FmPXf5DzWa5I7dS4aZgQm5VZgcMXFbGVXuXXdMuH4p9lsrKygYxlkOwgyNjbyo1ofubkNDsb5fFpdH17aq61iKXhHc9b%2FQAAqakIIke1KJp3ESP0Es3xhzDhpnozwKYLj1aS%2BnoMfVSWhPo%2FGQrGdatmndR60SN9815ZmakEZJhaLfn8Lv5PT50LT%2F%2Fd9T6dQ6ZZb0qcs7%2B6vI4zYJMEx5tynT4RJ7TzDP7L%2FOBjqkAXZaxdFVL69y6HYbCD86vpFHHrzzsZXLIBTAh2og4R8%2BRMgnDBICJKojPPhP4ryCcdIUyx55ngYgrK3067whdA%2B0Si%2Fmq4Bv9w%2Fa9lCOIvsP2VdL93zfy3nCl4TuCUEP%2FNtESfLpWN9iSmCVmonqJPf0tbYSlJnzfBo5bpCbbt7th%2BXAIDuh10E2VaicqOZseSlVK9EFCt3c5TeskKTCiMfy9Yrg&X-Amz-Signature=b452585dce167994d5c57d550566e4602a66b6a1192438c9679bfe2310f0a1e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLEHPXAD%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCk2VlKUG%2BCVlYnZyeFpPXYS9s6YY9s9EwZdR0i3cnVGwIhALZZmwQAH1vEYw78it0BjfpZttK1pXAyuS3AJMLWLdt7KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo%2B1O2CBB7akwKIakq3AMBcbTdWdtKoRRc8KrLhJUxxQyT%2FlvrWDPFs29ajNS8XYvu2qNbflvsHELPrAecfO8jO0zELigXdLIFMs%2Bv6jg3nxTyS1v9gnoDVR0sDoh2UbT2NL21Q8TxZOqmgmYqp%2BHq2Jsgqe9ePq0VoLv6bbjy0OHaT1SmEzY%2FaZSvFBAYkoWqNp8rMN450v55Mugr3nW7fiBZTuomu7CD%2FXgkidJeXjdmk0ppzABf5n3vnn2NOt%2BBBQ7fg6I1RGeovTg4SQ2%2B5v0zpUAUsFM6o5ZcvsXJeiIRaQtObGaDMwSLCWOImip6W9PjsXyj5sfCDJMe07mBdvcRny9QZGjnfcG76y81o7mIr5PyvPIHDI2h42eMpEocDpTYaW99RJW9SnmuVvFKFmW7S6jP2d8JBH1%2Bt11J41nzd6FmPXf5DzWa5I7dS4aZgQm5VZgcMXFbGVXuXXdMuH4p9lsrKygYxlkOwgyNjbyo1ofubkNDsb5fFpdH17aq61iKXhHc9b%2FQAAqakIIke1KJp3ESP0Es3xhzDhpnozwKYLj1aS%2BnoMfVSWhPo%2FGQrGdatmndR60SN9815ZmakEZJhaLfn8Lv5PT50LT%2F%2Fd9T6dQ6ZZb0qcs7%2B6vI4zYJMEx5tynT4RJ7TzDP7L%2FOBjqkAXZaxdFVL69y6HYbCD86vpFHHrzzsZXLIBTAh2og4R8%2BRMgnDBICJKojPPhP4ryCcdIUyx55ngYgrK3067whdA%2B0Si%2Fmq4Bv9w%2Fa9lCOIvsP2VdL93zfy3nCl4TuCUEP%2FNtESfLpWN9iSmCVmonqJPf0tbYSlJnzfBo5bpCbbt7th%2BXAIDuh10E2VaicqOZseSlVK9EFCt3c5TeskKTCiMfy9Yrg&X-Amz-Signature=faf2f1e16247e242bd75cab58d762d50cae3ba006897f56a4017243abcf5daa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJD3H4XJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE1dC1OLJ8j0xILwvlRdHP8uioS6pgZvFSatwXEKqp86AiBHKWol9JpvikEtrMQMeRSyter%2F95U%2BqS4yLkQpeZL2tiqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcyM9DEKEeZTczZq1KtwDt4QmO%2B8cgM6XefK4HN6vNMgvaIF71MPaAiksnlbGm3wbAO8oyreZgrALClzwhJJmC5jZ79L4oAoRZDPj9E7FeqcObEcRXCWh%2F8X1N8JhZygcId1qubzgVcuZIsWHj03Fd7pxOlQ0OEHnD38KQFbuZOuEQ0725r1Bhg5iYEIG8pjKOfE%2Fp6qBEqr133%2FrhJdGnhiWJ2NWeaNpJ%2FOdpEycNdtmUittZBNd21KdauVNBx6dOsEALF%2F546fojpHjfZueTkEU9BMPkV%2FcwYS9TRcTKubE7aN%2FNm%2BXLBBNQHeYOfz4ijgy3HMi%2BM%2BlPIZb3zh9d8BGSZma%2BBC2WEuEAkOg7ck1r5sXAmrgOaBNULqaXLKGv7kO%2BBokITFgbc5qZ7xB4ETR1My%2FWVy2bVeUg248HdM4bFqNA6R5E710PF3xWrDgZbxIGqyUszmfeVQvc3QPVvHW7d3skbV1ECGcHnyZMpiKq%2Brk7%2FU6vy%2FJnq4jbGKP92zyTQJh9U3e3cwvQs3%2B%2BHlZoeo5TJHCdHLt69aG36PHWQ1Ok7JlhSSaf7FppgMZOpSCadgs0amYuNW25qUjUHQCAQPnbGlu7oQIJjyzvRaM6R3mi16NtjabD7ttKu5bX5I6nyxY4pQTXjUwj%2Bu%2FzgY6pgGAv5MKRhrL8VWti1%2FMdL%2Fb%2FWRBXCyMWhoIqjsWxehpLzZnSHTJ5qsbcnu5zJ6xhhwi25pOGkktjRzR43%2BuKFxmm7WQjMqSo2JLqxXuT4MMydsbaAQUoyEtIr0br3Yhs%2BQGtf4gwL7qweAmoP9TR%2FU0s2mPS2Ndm0gnRM3DTRsQRv80AJvkBDKgnVjG5i3u%2FcyY5SUJPy6qJgqjScSsXD%2FIhYton463&X-Amz-Signature=4411b2db1c7cbc1b7e8078d91da08819cf8348d452940f11c3822559f0ddba68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644J74326%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX%2B%2FKQXCT85JcMPthfXP5%2F2RXj%2BJ6YlT%2FyLja2wV%2BbAQIgR20oXkG9BxEncrR0Xn4yMOVXjMIT17V2sH5LSXrtb%2FUqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD8%2Fh7kG6tGbjwg5GircA5BSmZWtRZ7vW3QWNcuAygp%2Fcn7uN%2BhLvm6KG9CF2AAGYQMR0JxNpti8ajnh6eYzyXzdGwAlREgeASrxJ5%2FMXSHMUaofZjJAs02YAOVEWb5gwCH%2BzWumewgsXJqDP9%2F2JYVTx%2BQr4hMg5PpFZvxnaOjj2bt4rED0dNvK0Q5m3tisA53rjwHFcKFGw718dbjMVKHgWcB%2B6VU%2F0mK1X4EY%2B%2FXOziqr33iLqI8Wgt1qQQxxg6%2BWSHR2Z1un6YRV7d96QkEnXKRO9JMPnNOzgkhrDEWhwpHgYY0qU39eCFyVw9W9IVCOwb1EgxJ%2Ff1zLOQlwaZe9AG4Ul9v%2FUXjK5eA11jXde94Z%2FKxGTkNG0A2tqpKZtDmzOnQNAdDVyzsAJ2XQlwWtl%2BDDuyHh5R1ES%2Fm3XYC%2F%2F39xIi45Osv%2BLYk6ZvfHTAr7RWxrTrci7%2B2F9Bsn78d%2Fzp3H6%2F5iMt2%2BJISplVkub1sVDpLD4J3qZllHE%2BkAczCOei6M0l4cwdvwjpLhM782eXjuoi01mi8O38K90CPjYgUo%2FBO14mvxdnLJINvjLYsA8gmBhZrceQTYt%2BzCsBvRvSObVzKNSPokt2imDg3cDSAqlHBVVDsNUrSsHTUAR4BebnC6DvoBZTlAMM3sv84GOqUBjG7jOu%2F8U9udvWKxBdcnvfpSQQD2hrTj4ReA1pQ34FdSgk7HuK%2F405TD2YRFIMCpCe44wrbiZG2A%2FHjOBR9uA9%2FuoE7GIFd%2BF0eP9uZycn%2Fe8ZeEnqrwOUbopKyI2O8c2FXcVnGuNhtYqy%2BkpsiWfqbRFQPGTx%2Bvr3RQy%2BPRG3plWj1hAJ3RC75OEmDVEmwv63zGoZ276iKzDAhmKeFAtcZ1Pt4m&X-Amz-Signature=a0214bf6dfc45bba0e1b21d8f4484feab7dacf4dd59cf0b6b9bb5742d84c71cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOGEZUIX%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDbNGXuJycqyXhzJJmoBe1rUTJ%2BGqjV1w%2BTJ%2B1vyC2xvAiEAkwMTkfUAo3rg0YSRZFYIGhQN0Lb6W40uWeTvupGv8LYqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKX7j4CLikIP9upWbircA536VW6qlxjD0RojoKgFybn1EDJXspDeMx%2BZ4eNyjusaFxxieu2so1ag%2FrX3clU8p8chofQ7lcxi8V8pGD9z%2B5Q5unkaL3m6uZ%2BnKM3Mr8svX%2FOa5JcC4lW7g1zhX5WT2t%2B28xhRnSxwEJK6cQcZJMabvXNSxLE7vARftq2Vt%2FqE%2BVC6fNwlcKNVEqDho5N7SX6zsdWedpvWGmzgAYe8ltLylD6BqX2oauI4YoBWGYVpRkI7nbej63t%2BZYfLrOJ1489zXis%2FWy2HNWj%2B7NdRjAsaO8Z2J02Ufxivi%2BBxgXrDCITxAxNfOWaWXXkozQ17e%2B9SgTSp1%2F20mG6FdAiIDUK7JGdY7%2Fon47gGlHhJwgvsrdWmq3Ox3XJvceni9FCk0vwy9oUSCV%2FLG5jn8BQ75RSwEE31Tz7GbzQNU0yytYTSjjwG1Vv2yxO%2B%2FlFN4zXwLtAQtq0Ppa5vBllXWYFCdpuj62OkakMqatSRT7RyUfu8JqGpnzmlfacyz6PikRYDtdX16wpIcKkRybJa%2FQ1dzcRfgIiwE7oPpaiQG9LnUmYPw%2F3ryAI6EUFPnnprbIW3mMLprFMjryMX0GaWS2Hq2e%2FjRvzDcXEnoJSLwzrjQZF8fdc1fhJt2eV2eV78MJPrv84GOqUBFAf7CFbA7RHHqwStqEcXNAsMd9xDDeKooeTpaVRpU%2BDHYBWzEZaaW9YJVCKZBp88BOQUQzCfsF9okrXMAigaAEZqqcpV6xToPEtu7b7ADH9JDvtaeRdWpaomCOOH9b7OS%2Bhxm6GqNQGB9ImyglaErJJ8XeLLodynfTukSSG4Yy%2BkoNCcsWoeVNJjZFfMhkONa5kG6UnE6RvvLqr27yQsMwj0vAsZ&X-Amz-Signature=29df30b0176cda1e01a0a2d8b7fd3cf0a4598f05a39e51cbdc7fbfed5bafb632&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635CA2Q5B%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6gU33Ir%2Bh%2FLt1aJ7wJLqVIzO5aa2ZC3pxsO%2B5X%2FF3NAIgaqpi%2Fr1gBQoHcyt3KIGFrVMryQ7zstjjqCpn9jq1sL4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYDx%2BCxkf3hSVNlnSrcA9j9YfetRn1cUrRfrpNes5nj42EsrN6h9o5fYz3TrORvThWfdByqFq6fiYXodHP97ai4wZ8%2FAFLG9Vx9g3xSlulrCwTyDV6PStydgPOJYEjUWROI78Iz%2BPzDOISx9VZKOvnaMzaTWiwyBIOQLTqkDbJ9wgpcoLrFQ39RDAstl1LPICBjnhhkJTTGHHLgYpU%2FvcD5ya3ZCmW%2BYonF3iHJAG1Smoaoso94%2Fl7GIVibJuXLIBLCyPVoSJifYNOgc4CeG0B8%2F4nBO46D5QBPDHXYpmovwvVpQ4sEqD5zXfSL%2BBDokMRzt0uLMMSK2ZB6PFx%2BjSja3fGCgErppXJHzKpDfqE70uHo%2FtKp%2FDQGg8zZbmWf%2BxR00ukbGtv8c07msx41XHkiMOYewZLlv%2FdhsgPaPJh6DnB0iCWqubavtmyhSizswN6FiZzWdYH%2FLWPFPXSrjhthxm7q8cNUX%2BrRvPTz6%2F1LEVmGMlp61o7R69vqX561BWMCJHfQ9KWK3SVKFrPIHlv3aozHf3IF3HCiKtWluedap%2F2eyNtRYgQ%2Fy4ZW1mw3JsmmEe5IHhbxElRTQ4E%2BB0pqoEUt4b%2BMJ4utfyQFRlEQ0Q5z%2BunxT2DDWcKE%2Fwa%2B4hbAGXe9wKa2%2BQDGMOnsv84GOqUBBw92FvauYi6FhI4fMDQTIoPHfKQJ%2BpFjEQ8abJ1e6RQ%2BdM5mumIngG%2BU1cJSB%2Bsxf6Ype6Xh47%2BQiG2SLtP1sCXt6Zf4iJWZH24iP1jJzIu%2BlBqF8dRhggjsVPXBsB4xn31AgahQtwUxoQD2gf94blW0TcL4bE4NLiG%2F7UjzUMGgWiZ3i1%2FUKTNruqkSaAPkkSYJAcd1Eo94oMCu%2B091nOTCnhBd&X-Amz-Signature=98e8138f4ce1ba5dd6ebc7d450a19a86002006a4c3da069066bba7d6730b0e97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635CA2Q5B%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6gU33Ir%2Bh%2FLt1aJ7wJLqVIzO5aa2ZC3pxsO%2B5X%2FF3NAIgaqpi%2Fr1gBQoHcyt3KIGFrVMryQ7zstjjqCpn9jq1sL4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYDx%2BCxkf3hSVNlnSrcA9j9YfetRn1cUrRfrpNes5nj42EsrN6h9o5fYz3TrORvThWfdByqFq6fiYXodHP97ai4wZ8%2FAFLG9Vx9g3xSlulrCwTyDV6PStydgPOJYEjUWROI78Iz%2BPzDOISx9VZKOvnaMzaTWiwyBIOQLTqkDbJ9wgpcoLrFQ39RDAstl1LPICBjnhhkJTTGHHLgYpU%2FvcD5ya3ZCmW%2BYonF3iHJAG1Smoaoso94%2Fl7GIVibJuXLIBLCyPVoSJifYNOgc4CeG0B8%2F4nBO46D5QBPDHXYpmovwvVpQ4sEqD5zXfSL%2BBDokMRzt0uLMMSK2ZB6PFx%2BjSja3fGCgErppXJHzKpDfqE70uHo%2FtKp%2FDQGg8zZbmWf%2BxR00ukbGtv8c07msx41XHkiMOYewZLlv%2FdhsgPaPJh6DnB0iCWqubavtmyhSizswN6FiZzWdYH%2FLWPFPXSrjhthxm7q8cNUX%2BrRvPTz6%2F1LEVmGMlp61o7R69vqX561BWMCJHfQ9KWK3SVKFrPIHlv3aozHf3IF3HCiKtWluedap%2F2eyNtRYgQ%2Fy4ZW1mw3JsmmEe5IHhbxElRTQ4E%2BB0pqoEUt4b%2BMJ4utfyQFRlEQ0Q5z%2BunxT2DDWcKE%2Fwa%2B4hbAGXe9wKa2%2BQDGMOnsv84GOqUBBw92FvauYi6FhI4fMDQTIoPHfKQJ%2BpFjEQ8abJ1e6RQ%2BdM5mumIngG%2BU1cJSB%2Bsxf6Ype6Xh47%2BQiG2SLtP1sCXt6Zf4iJWZH24iP1jJzIu%2BlBqF8dRhggjsVPXBsB4xn31AgahQtwUxoQD2gf94blW0TcL4bE4NLiG%2F7UjzUMGgWiZ3i1%2FUKTNruqkSaAPkkSYJAcd1Eo94oMCu%2B091nOTCnhBd&X-Amz-Signature=e74a17088f8c7425cd6b91b51b61b48dda331d4e94b6bbbf49d2c756fd1979a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VB6D37V%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxxFlcd1DNWrpbbkFuP%2FoUX%2BRdX09rZlDbtCGzYHGzRgIgUsrPllVELgHD%2FJMECnLaKOzEvc9whRcopGZP5sJlNkEqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHSw9sNXnkZjXP8NXCrcA%2FyGrld28MFI87Y17WwJlKx49jfLWJx9iUf54K%2FJnOiG11Ern0cZLLuYfjlu03RKMLQ1szXvZpucJ3i8pygJYJBXN2povqFpmzXntXwb4zJEGLAkcBmiC8SmpmjfpNu6Ei%2Bz7ARxfKfgumRtn8VzlicYTaJfNBPiCIJ%2Fn5VZCcK9XqeG3Pr3bkFWPGQy%2FI6zUSWFi6rKlXpzNZkHiYicAmM1twJkNIH99ttx3eDxiAIcJlornwWndwJXWyl1NBnEQD5UmOuVYewIpOU8VyZ%2FSb5q12IjF9IxAz1QZTh39BHxfHxeY3bToEFVYTcIRJ1pXM55hYWBlEwWyhAXVXLVkK7IdQSqTceRyicx4p36tFIEDmxZ3lpuOxWUpamO6%2Fvteo5TVRkYQtTwXxFJEFLHXTCW%2FrSDEKpjacrDaQS0pE0mFdFwJqulTZGfKOyyYVOcZNT7E6i0Ph9eLgcxFZBoEP%2F5ir%2B%2FV7stMGUcULGR354xABwg0p99oItcBxuzWdMt1PCU0ku9vrdsjCugJEtgf5ojC6fmXFBhhVHW9pzYWAK1iA%2Bsl0R%2FhOhHk4HPF2tJh%2BKr3%2FkuFwiay3pehJFVEokvslnmjM5JgLOPp7KwNInvoxP%2FfsdEshXt3idbMO%2Frv84GOqUBeMscJtt7xQVmQoMDp%2FdEGKq8vCMlo9BRyTa4ISMB0bumajPnQOt4g%2F5slUaHrbkfdruzc2hJ5AGKNiEoRYnlfZgVxKYxn6mT54xpKmBsq8ZFBwtb8LBbrh%2BiAjTc3vAQsPAlW4oS2ExQCMcP%2Fu4HgMtCJylFF76rSpwj6ZLcrWnJaMl%2BAkK%2FtPDsPuphbVCKOvldfSN3QIi3TAi%2F5l96WjfdSL%2B4&X-Amz-Signature=2738b4166a1ffc4c6db1985cdc945aafafdf86765b8d72e16e0e6b69faa10f93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635YED65E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzAcXaAA9TrJN5pSBkmzusJ2idZH7usJ6t59qPC7lUlgIhAOGJTShgnneXdjCPNRb53WaWpfQYV5X9tnPTTXPV3gRSKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxnWdGFTOxuNRL5smIq3AMOLmFBunjowJ%2FtvasoBpWISfs5e87vKzKZpn65O9%2FBud7ib%2BvchHPfbR9O75NovILInEFB5WTve0efp0WsBo3povq%2FU6ln18kwtr7DKA79ewJIJ15yRzS1Y4LTqxbs0YIckxHK%2FT1b7y%2FX8WoLEplq7NDjqy0BahLMEDQMcq7UHcCr%2FJMuPpVowPXCvrjL1FuLcWQ%2Bh6xmxRv3W4M0FVXXegzz4vh%2B8Vq%2FvssY9WF1U2dDJZNfmNr73Tqb6%2F5YbPfCh%2Bw97SWVboZXVkOYskPs%2FKLDgBSdfGFZXWLWN6snnnXcVgn2xyFQvA6teF19vaiMxGsfFpG8SO9PkUAPQEcwjxN20wPMdjjvAT5y2AM8NoWDW%2FXYkCQJuJ%2FBgUT1i4%2B3vKbnjE11S1oZUnR%2FByGfbF5qg6HKSUHFihC1FFkGwneETd5qJq7J5zYV5CAXH0fzDlpw1AHAa2FrsqM%2BsehYD%2FpR1puxLkb1XMiCVoTCGlv0HggYixVVesWFK4ol6gnp7%2Bl5aKaMH1LrWfz3snCc40pPBQ9EGtVEBEHQmyuA0LtMYqHr9SrIDQZz%2BIsvSwNz%2Bl3DKeD1LyzVBFqCmAuDCFvCG6C2Ytp95jrX%2Bag0zdBFoJVoYRwwmQFalDDC67%2FOBjqkAWXqgv%2BRL1z8t4%2F1BKuMLK0SCMKEr2hIZ%2FfhW4oxaRSyok4pvwN01ZzJs4Vv%2BSqlzHZ5rBa%2Fmq%2BRRi41ILiaumn4kAWZnS4RSl5%2BDE692D1kT5jNbOZ2nFD2pTISz2Shp3KHbdcloP3xIxCt%2FL80xcQgE%2FhSHawPb2bkn0wCBoGwtJttQV18SMr3OT24bOOdAS7LxmVZRkkinDLjGk5bToEHgUGm&X-Amz-Signature=c7e7594aa8a4ed44dc999f71fdc37ead8af6aa12356503f5b3cb4351cc0af85b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635YED65E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzAcXaAA9TrJN5pSBkmzusJ2idZH7usJ6t59qPC7lUlgIhAOGJTShgnneXdjCPNRb53WaWpfQYV5X9tnPTTXPV3gRSKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxnWdGFTOxuNRL5smIq3AMOLmFBunjowJ%2FtvasoBpWISfs5e87vKzKZpn65O9%2FBud7ib%2BvchHPfbR9O75NovILInEFB5WTve0efp0WsBo3povq%2FU6ln18kwtr7DKA79ewJIJ15yRzS1Y4LTqxbs0YIckxHK%2FT1b7y%2FX8WoLEplq7NDjqy0BahLMEDQMcq7UHcCr%2FJMuPpVowPXCvrjL1FuLcWQ%2Bh6xmxRv3W4M0FVXXegzz4vh%2B8Vq%2FvssY9WF1U2dDJZNfmNr73Tqb6%2F5YbPfCh%2Bw97SWVboZXVkOYskPs%2FKLDgBSdfGFZXWLWN6snnnXcVgn2xyFQvA6teF19vaiMxGsfFpG8SO9PkUAPQEcwjxN20wPMdjjvAT5y2AM8NoWDW%2FXYkCQJuJ%2FBgUT1i4%2B3vKbnjE11S1oZUnR%2FByGfbF5qg6HKSUHFihC1FFkGwneETd5qJq7J5zYV5CAXH0fzDlpw1AHAa2FrsqM%2BsehYD%2FpR1puxLkb1XMiCVoTCGlv0HggYixVVesWFK4ol6gnp7%2Bl5aKaMH1LrWfz3snCc40pPBQ9EGtVEBEHQmyuA0LtMYqHr9SrIDQZz%2BIsvSwNz%2Bl3DKeD1LyzVBFqCmAuDCFvCG6C2Ytp95jrX%2Bag0zdBFoJVoYRwwmQFalDDC67%2FOBjqkAWXqgv%2BRL1z8t4%2F1BKuMLK0SCMKEr2hIZ%2FfhW4oxaRSyok4pvwN01ZzJs4Vv%2BSqlzHZ5rBa%2Fmq%2BRRi41ILiaumn4kAWZnS4RSl5%2BDE692D1kT5jNbOZ2nFD2pTISz2Shp3KHbdcloP3xIxCt%2FL80xcQgE%2FhSHawPb2bkn0wCBoGwtJttQV18SMr3OT24bOOdAS7LxmVZRkkinDLjGk5bToEHgUGm&X-Amz-Signature=c7e7594aa8a4ed44dc999f71fdc37ead8af6aa12356503f5b3cb4351cc0af85b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3RRYLDG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T172228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEML%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFKB9fOag%2Fz%2Fej%2FpedE436J3OFBzfWQSBHznT39IBKwfAiABPEQvAkJqRyVsr2WhfJ3T5s9e%2FtRb081RUqnI5S72ESqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BvBaJUntK5ZBqN%2FlKtwDRdFhQ4bvjGC9%2BHA1Y3wVN9JZEJOg87BQvoh1uBTZCWbV6xHUsMXe%2FqE4h%2FinDSKB31vhyHCzOqpEBLnDMKbSR%2Bn3Bc6HRvW8WpTQemWpqhhZR7otW2QyiEwiSg%2FJpeswJkY2btJlmrGVERn9HWc3PWBOvzVQ7pZjERRnNyX6Jo56TWe4GLCrpNWtn42026TN3yf4WT6ZmFrgKfw2Qq5S%2Bg0NawI5gpucGg5iDV%2B7kdgR%2B5QLbmaDXIce0GK2FBLlCeObBoQVYyEkDhfnrDvxIAWe%2B8j8%2FweFQVsKssBEI6QStHq%2Bi1dUa5Itvvs%2BHXKjZ1Haw4Phl%2BJKOVCeSXn0NyGK8MGHUkkqqJ9JONYqj7opoUGPGZeQG0sBKN5z4Xa0%2FoBv1yh45pL9PmbRweMondbYCQenGdxiVkg43p3e6Cbhq%2Fhd3Iiaonbp8KYqBKiZRdBCHj0i3%2Bt4s9XYm6VszzfyFm3SqgJRfk1Shk9P6gVxrkx8We9pImtslm9CK%2F5whyvRw1Qn%2BB%2BxFp3a24ZmB1VpBOoQtdKdXFEjjVn81SFU0fzAmlAxnt8%2BHQBdHVHDSz%2BB1NAWnv5Jz%2FCTUO%2FI5B13KD3TFHJmpGhuimx5ez%2F5bW197fVCXSO69qMw4ey%2FzgY6pgF8lvPN%2F%2FEMoJhH2bZGSptEQ0xukmhyF%2BGq4C9G3vhfSMpIRM%2FtIqbWE6jBIReCX4ffCuTbLkLcKuxCRF3A%2BRzAk3TiTsH93Zga7ADIQE3PLzCdKuC8qf2FL8hwnPtkGE%2BtbhpKAkFgKM2D8BDfVRv3fWFlV%2BjrFCO6gd2UxGSV9HIQPgD%2FS5IK1WIwnQF3e8rSiq8OtPhyEiQnK2AvFoFQCsz%2FaLhH&X-Amz-Signature=f9d06cd7dddc7c2e500bee7b81ce8b4e64c1af5b5cd1a98ecbaa79b9f35a7330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

