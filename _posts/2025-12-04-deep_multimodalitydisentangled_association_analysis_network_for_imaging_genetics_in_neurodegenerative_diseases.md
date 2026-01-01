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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GMOUI3O%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIBcZQB4R82on142eX1TV%2B8nTCMHETUPoP85unPwk6ayxAiEAopHomcGEoo6Tvl97%2BuZNpDsuAbXhg9gpW%2FMt%2F%2FYa11AqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzSwOp71Rg%2FClDFzSrcAxsm25niE2%2BAMFQxitRX%2FoBQeeT25eMnWsi2B8UXJivOWAFY0JGGSV4UGQuF%2Fe0gze1Wl5k1Lnb%2BQjb9fgQ5v8Vq8uZrn6sI%2BaDB%2BQmmMIYyqpAPRPJulnaOR284t5P8XQaXI9G2IsNhsI9glbrwIFnlUm041MOZfnVOpo8o2IG7Ef%2FtQBuOLIiBD53i8KIW4vyN%2Brvjy%2FOeET1XgkXknJfR8PDpswktVOuqBZT61TiFx4gEMXOrvlIw96BHSykp42HtAKE%2BoSqCvzBlC%2BiORrgGY5f0Uehx8JmdyanztLlKEoCEmOKpyI23wjfpZuir8YcnduPZrp1hsJPP81Y8cCHxji6GkY%2FIXsLYtKGTt6e7Jw%2BhnGAH3BSnt%2FRQEOdDsilND4OhBI6uSoUJFz7t%2BdLWTN36CFi7eotJnI1A0L6wTbAqUFCjS2NxPKwbSvLhy8sBGEGFuvY47m6F4OguiZ1zCBuqeExctWmVV2ETadF8Zhz6ycjDTpKjKufx1%2F2dxLapSNyak0Z3t%2FhbsDOGTRfs%2BzW0Z%2B0XYVx1PAIgJcLw27dT8Ts8umEKNB287oJubzVopgj8ACJD8tOa506F2XM82rKCdFaTJi7KCsFWeOvOuVWLN6C%2FYEFXDST5MLyH28oGOqUBjPL1dUoG4bzWvSVszOlvItc6ZNsygnA%2B4JdVHziP1TQJW%2FyTE6tFW%2FNwjKAfVjEM82VkI3uRW0yC1sNPabNAL2T6Qdh8WOwkreYNlcdfQflixadGsnHhqqejjeipRAo7Jf73b1Y94rJkIMbfhZ%2FdoEILBnlNQbFmST%2FL3A9qJLaDAPpJV8dmXPV%2BZYFN%2FZzNCv26Hw6D2XXrOSmIH%2FiNFq%2Fc0Eya&X-Amz-Signature=9147bfa24cab256baf057a4bc15dd02643f3bf4073b3d06d897992f5849b6277&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GMOUI3O%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIBcZQB4R82on142eX1TV%2B8nTCMHETUPoP85unPwk6ayxAiEAopHomcGEoo6Tvl97%2BuZNpDsuAbXhg9gpW%2FMt%2F%2FYa11AqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzSwOp71Rg%2FClDFzSrcAxsm25niE2%2BAMFQxitRX%2FoBQeeT25eMnWsi2B8UXJivOWAFY0JGGSV4UGQuF%2Fe0gze1Wl5k1Lnb%2BQjb9fgQ5v8Vq8uZrn6sI%2BaDB%2BQmmMIYyqpAPRPJulnaOR284t5P8XQaXI9G2IsNhsI9glbrwIFnlUm041MOZfnVOpo8o2IG7Ef%2FtQBuOLIiBD53i8KIW4vyN%2Brvjy%2FOeET1XgkXknJfR8PDpswktVOuqBZT61TiFx4gEMXOrvlIw96BHSykp42HtAKE%2BoSqCvzBlC%2BiORrgGY5f0Uehx8JmdyanztLlKEoCEmOKpyI23wjfpZuir8YcnduPZrp1hsJPP81Y8cCHxji6GkY%2FIXsLYtKGTt6e7Jw%2BhnGAH3BSnt%2FRQEOdDsilND4OhBI6uSoUJFz7t%2BdLWTN36CFi7eotJnI1A0L6wTbAqUFCjS2NxPKwbSvLhy8sBGEGFuvY47m6F4OguiZ1zCBuqeExctWmVV2ETadF8Zhz6ycjDTpKjKufx1%2F2dxLapSNyak0Z3t%2FhbsDOGTRfs%2BzW0Z%2B0XYVx1PAIgJcLw27dT8Ts8umEKNB287oJubzVopgj8ACJD8tOa506F2XM82rKCdFaTJi7KCsFWeOvOuVWLN6C%2FYEFXDST5MLyH28oGOqUBjPL1dUoG4bzWvSVszOlvItc6ZNsygnA%2B4JdVHziP1TQJW%2FyTE6tFW%2FNwjKAfVjEM82VkI3uRW0yC1sNPabNAL2T6Qdh8WOwkreYNlcdfQflixadGsnHhqqejjeipRAo7Jf73b1Y94rJkIMbfhZ%2FdoEILBnlNQbFmST%2FL3A9qJLaDAPpJV8dmXPV%2BZYFN%2FZzNCv26Hw6D2XXrOSmIH%2FiNFq%2Fc0Eya&X-Amz-Signature=9147bfa24cab256baf057a4bc15dd02643f3bf4073b3d06d897992f5849b6277&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNUILKJQ%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCICe7yU2a7sRgujO7pctK9jS6VhytakB3A15uRn8gHKC9AiEA5SV0cLCqI13q0vuyUVCsA%2BmS1VAoW592ufpZytlcRXwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAFjO7oh2Am8zqXJzyrcA47SHVLTHFZMENNhC1HanYlO%2FPzInL2eTeJ37QiD2SCO0XaLHnsQsozaS4gQJe61y0Od0q6c73REG1AY9I6p6GdosAkZYSAJ9zj3uMQ7Pd9%2F5vwE1iQxMcUO95Z634L2oCDihvKacQB%2BrmDw0638iDfQoA112Yg%2FFUwCY7xE2gQxcOXqm7ZV8BsQVVUBoy0sEPhYd7nOz9mXZ6KCppp3WNERVpnxd3ScdQmn03v550lGiwZKz9lVm8SuGxrccR7B1dwUMYOzVtzYBS2E%2F1A6HtCuyG%2F8PBq9I1zGSnG%2BLiHB4z7kALK0d4TMeCz9EPgXN0lFIM4aq%2BA4K%2FcR%2BLOi9CYDfHaIOHtlpKHwdOe4s4mmh2Urqs3ZqNGZo062xW4LLcL9ca6AavCn0YfPQ%2FNsta7yXRqcm9ypZsmTdNcoWEMngWqnQfOID%2BICRDiF8moKoOr9fuXxsXZFhX5LRB52rptpczF89ZZ3IMuv7jtDBjUBSN%2F6ivTXUtmTDaJGB1g%2BcdL8JckoNzNBbhit3ZxDFEF5dQYyAKcsgiqUiyJG5MXxzHA9KMcMZTjJY9LMA7ppVMytEHsSGo%2F08xMh5JYtyeSYanV1xXCfyvzM%2Ft1weYBPGH38o0TiJdB5PEGBMLWF28oGOqUBr4ibHfnk4r5NFQUlT26DUzq%2BGP2Xo1dLDrlXfrhfDwdzmKe4Wbqx0ZhkjGPtS46tM%2FFLkIbjfqP3qTLn8ZX3UFtZJ8Q1uaNNINbwdpuTOUn9AZYrLFQlPeT9wB%2FAv8OKRH6xfGbY87alIC7YTPKsDD2f8jDnhg1ixmwn9a%2FFeaK%2Fr0LV19vntEzQ3y7CoGdVFCzeYI0JLSbbUGNRLwLhozsU4bPR&X-Amz-Signature=f6a7f999fead3d2cb512034631bcf9d0b69a8867fef5409a8e56528e475b344e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627433HQT%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQCbcMYPAI66Y8SHTjpNBFL0lD3HFgp6Yk2Vk%2FhkR%2BNZPQIhAKXzfRZ3n9DeV3xVPZYxfhH3RCw%2FcU9MWAnzOhYvbAhBKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYsQA6eWxTUv1Eswwq3AMmaUppHwL5RYGI%2FcQcj6ZW78x8sUsF4uTkXuiR%2FDGby%2BJhl5jkTFxzpDwnS%2FLtOydZYfWmgWhfvtkVPzFzwQ15Gc5sQ3BELyQzTQ%2FwsrbWCobcizA1BvKBH23iDnWiC%2BBKCFuxLpdvMgVwRvGz2mPmILSVlQRLR3FsYep43Ir%2FAaG2sKxze9GPb%2BQALCITX4ozpDSNpE2t9wXqnTdNrXPtJVWv2fcMyCGp1yr%2F7%2BirKVbvIGQaYTLkWJbtOfNkJ1fHhxgUaz7piyU6WZ1YMh7tBgQUmEcfNQHHwEaE4RVvM8YDf4TdinRCmqpY6n%2FnAPKRVGgAXTJ%2FSHRy40ya4fiTVrs3YkZqH6DtZ2AsXK6exl2WWVZPaqi3b201pS2zljWBRV21ynzw1GnVp1XQei%2BO5YJZxaszeaV3NLBjfhS0gUdpEqI0UDAZt6YuO6K%2FrygOuONC5UV0wsdSsffLCYB7mtOSbFfV7MZxKl0fKa4evl7ZxZ3fweEETO5hBG7SiLi2SJPQKn0MNPWJQE1f88fPKNqbVZPSR4ML7nO57Q96kDs5DseMXBivpAteUmjcFT2DUjO3J8pxE990LqmwcvbQSNH4mg%2B7oPE8z30iNsUF%2Bql9f4iBZK4uHUnHQzCmhtvKBjqkASfs5hanK2K%2F1No1e69bODa7MqLV5fVGEtJpEUFqkrir0HwLEj35uo4CGAf9PkRLujX4ZdD49w44e7edboft2ZPj9VLJEtjQcT8zXZyjcQku1%2BwTYThzA9hmdFD48mxKGBXqrBhB%2BESR36mOQ%2BUEGA86LKo2Qo5EPnLMvCTNa5lhkAAWPlDGxljiEQBE6%2FyT3Zu4kyJZKewaEBwnO4SvGj1tuZGv&X-Amz-Signature=16f839bca0ac4e6025db3d1452d4adb22f4fb06f09ac833f10d1b55d68c5a7df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627433HQT%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQCbcMYPAI66Y8SHTjpNBFL0lD3HFgp6Yk2Vk%2FhkR%2BNZPQIhAKXzfRZ3n9DeV3xVPZYxfhH3RCw%2FcU9MWAnzOhYvbAhBKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYsQA6eWxTUv1Eswwq3AMmaUppHwL5RYGI%2FcQcj6ZW78x8sUsF4uTkXuiR%2FDGby%2BJhl5jkTFxzpDwnS%2FLtOydZYfWmgWhfvtkVPzFzwQ15Gc5sQ3BELyQzTQ%2FwsrbWCobcizA1BvKBH23iDnWiC%2BBKCFuxLpdvMgVwRvGz2mPmILSVlQRLR3FsYep43Ir%2FAaG2sKxze9GPb%2BQALCITX4ozpDSNpE2t9wXqnTdNrXPtJVWv2fcMyCGp1yr%2F7%2BirKVbvIGQaYTLkWJbtOfNkJ1fHhxgUaz7piyU6WZ1YMh7tBgQUmEcfNQHHwEaE4RVvM8YDf4TdinRCmqpY6n%2FnAPKRVGgAXTJ%2FSHRy40ya4fiTVrs3YkZqH6DtZ2AsXK6exl2WWVZPaqi3b201pS2zljWBRV21ynzw1GnVp1XQei%2BO5YJZxaszeaV3NLBjfhS0gUdpEqI0UDAZt6YuO6K%2FrygOuONC5UV0wsdSsffLCYB7mtOSbFfV7MZxKl0fKa4evl7ZxZ3fweEETO5hBG7SiLi2SJPQKn0MNPWJQE1f88fPKNqbVZPSR4ML7nO57Q96kDs5DseMXBivpAteUmjcFT2DUjO3J8pxE990LqmwcvbQSNH4mg%2B7oPE8z30iNsUF%2Bql9f4iBZK4uHUnHQzCmhtvKBjqkASfs5hanK2K%2F1No1e69bODa7MqLV5fVGEtJpEUFqkrir0HwLEj35uo4CGAf9PkRLujX4ZdD49w44e7edboft2ZPj9VLJEtjQcT8zXZyjcQku1%2BwTYThzA9hmdFD48mxKGBXqrBhB%2BESR36mOQ%2BUEGA86LKo2Qo5EPnLMvCTNa5lhkAAWPlDGxljiEQBE6%2FyT3Zu4kyJZKewaEBwnO4SvGj1tuZGv&X-Amz-Signature=3156d51fba4b91353e76e3b373fe3df84a67d7dbaa96332806bc545f09fa53bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654DZ6IJG%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDMOTxG2N%2By4%2B4chZKTYyYTbGPZ9dJATBdiUHMpzlKpfQIgbm9AOaD4Tt91MSXIuAED9nc98er2gEjbpp0JsXdhZx4qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEISjksjE70OxEkgkyrcA5yk7IhhxnqcdFopL3x22bz5cgqxQ8jo5%2B8KjGTDgWco1Asda%2BaOEL6MfyOSrGxy6PyyQPbijxNZmZJihTjtfR6YL5AvelO%2BU6dUYwePlh3c89GR4xxs5o09KhN%2BpFJ0Xx6WTx%2BPqXsMTI6YB5nOPSrI389nD3hVaL7bCcjaa5HiSWdoISV2Bcmqf90Aid2uAgahR%2BnO6OvKgDISCbLAbBNslQMPAgjBIb87iKfhl%2B5gYb2kEZ9X26KvWtF5UD8LXJYCNQrCACnSG4xcKuOCB0CGg4QsoAeYLNvlwL7KNEbqk0bBzGUygMvNa9TqskHOcAlvwY1ACpXhXdv%2FVb1WmfVE1PezTnuKdYXZXhR%2BzyM6BAwq5NQe0LeL5kY22YaRFkI4zIyKUs09Ra0PAzDSqraZCAmS9y4SmoGBI2Axv6z4PpSHPZc2PEtgCEMsN1HcSfdBZm4FKD2QSILP4joD4Kdi0UfR2HzRhIpb9oxh%2BWVDhwDxLyRcmiV18yn7TAETTq5xxvDMGAHOH6G7gvTagqWwwPHJdaF8c6gfOxHDXDCJ0PQMHPQJV%2BIV4LuYpMtHqTe6nVvuHFYbXTggywXQpMw2irLNtwUHrrelEmUBvLDIcnYF0E52rc3EVgo9ML%2BI28oGOqUBOm6wNYYb7deC1JYd2e8i8jTtNQAoRQtizoV6i5X19Yik8OW%2BTkqe47%2FM0Ayo102n5a6xtwYyub0w8n4LH0RdA3vUpLkClcLsF%2BzEtMe%2FNDeKJnWBGxqaIHz41OGwzRmbusig2oZw9%2Fy8wmvfAfaThRZOjBLWV92hFaMk9lvFgqIkcog4QY%2FTwwhB2L8FgH9FJ2OjOdx2VtZBMxh3sXcWZgEXDCrG&X-Amz-Signature=66606ae95a30985e897fd1f4592de32213b52df7f2148dc97107365e4ad30390&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XZ3VYMU%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIGyMVtDyNA5HC260gQmpICJkVUGHUSPqnGlTwqVdOly4AiEA1JnDB7iQPpnAuB97msoqANHmuO3S7ehomspGJoTBjxQqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOJlv7kIjyJ0IVNqsyrcAxG2quga8MkXb8WtuBewMVO34zGEKh2r4sbbHHog7r4UXLRNxHFwQsumbYcVDM7%2F0DP62KQ4pOHIiCAhX1msVP9kmMdHtBbPYO6nSwk%2F9VWVaxW3el2GTgufv3cbj1JiYQL7YFcFvxigEpq2gs%2FivhBn7BB1LJv%2BQASqDVjFa%2FKO2bS3hlGB5sns4zi5wktwbiSS1ABTaDz%2Bkqm5G7IUXkH7eQSopJ8Wx6%2BQvXRm3UaxDxzM9D26tfUCMwSNHf0oIgjXYPBXt7tOLufm2FEOPfSuGwp0fXa%2FIrPPLwihC5W%2BzlrjFQoJ69yKlZMO35fMSsrCaOcK4WLeb1Z3mVQhuwiOKQLd071w9KLC4ZXFti8Je8nUch3LhxTFmDRlgDxEgJowOmLjwc3n3hytg1mwflkuEY%2FR6uLYEy8ymI7Uq4ImbNOeEyYiF1MUKfmotxOvj4mWvOXMH6DuxnBQu4qwdvAtgA3RYZWJ%2BM1tOIrmQ1H5Fc4Kt1%2FnUs1fEvAsGuG2JNC45iS0qjhnvY9CcKTGpaVkw15gL73f9SOb95SCEvwnvl6HUL09nb8gNgFfg8g5Sok3VpXX444oN0Tp%2FSspbMTkLTkYr4L%2FijyH4tYrglyA2mZmx6OrNaJXZmUMMIqI28oGOqUBntAWSDla76b5XDfbDXO45dr2cg0wBKhOYIBY18TdnXFdV6U1Oivjj5XbwMu8ItKan%2Fxq9mALkJCPzld5QYDkk3FToxYT7e9j7Wz6vHmRwFXcG2a%2BzsGoArgRq6bm0bQDoOqQkigKLNd8RnspPC5zkWY5Knbb9ztC1G90iQjV0%2FRVg0BW1WjyLUZjHQPwcc5IHKlao0Py1pd6pRUvwh35c%2BBpi210&X-Amz-Signature=2604986246e480bde14e3cd517f8c76d16a2f02fb546c9845a798662a64f1438&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466656FYSGS%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIEW1Ca%2B3yVkyBf%2Fwx%2FcDAZbhAncBl7%2Fdno8IPl3cqbtCAiADwB8PTsO7uqWgHSjeUxObBHx9J%2Bukgn3Zsolj9f3rYCqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuNyDiEzYnVo8vbRRKtwDNhA%2B%2Bjdyff%2FJmVPCACKArgambu9%2FeX3XrRzww0bgJzDkWJJH62Mq5YQvYGK8WIzuUTXfv0VluXV1hGwEB20Q%2FebSbo9vZGCYx88W80Jny1V38dKFGyg4GJ88NGBlH%2BlcbDW5NLzGfpUm9vekch5RIlWsmEKY2PphRDGoT6oyzEOgYQSLXeS29ghU%2FSgJtKnRmB58KPQ6nWnPp5DBbxtcLfVdWv4XVB89GQgwR7OhI2iCEojLknoxAkPjaYiPM91SOIGPtBLaNRjV6eVYbeZE4oGFvTqU33Zq7Ovv0MSZMyPg%2FQUEjiymBSrSi4VRwvOmu1ZYzmiYy8nQU5gHuND1gLDASURq94FUmvR4QTQKf5KmM0%2FcLx%2BK0su2iwDyfaBcNiA9x2a2NFFSJpblYFzsvKxKyLD7nRbczGc3LOVw1Bjz5Ib%2BwPD8DPPWvBRsW%2BlXFHdVtUZli%2FNC3o50lYMsEGrJ3h4Rw5zn04CwrTaUM51gnDeGfnPtKS3ojv3hJtF%2BfSmQ6V16Q9V71RvzeqIx4mHA0uE%2B7MN0LAMpVFmLJ9Ob0jFmKrqy2wf7DQD0Chki8EDkaroFHIj5FvVGMzqNVYpVfkTgxcxTeLndM1uUeLTJwhR1uQVMZAhiZNYw2ofbygY6pgEHL7p4YEmVMDWGGbSWchQ1%2BaxwGl4P0IwKl1dQqhDENErXpiNj8kY49zeA9Vvj9v29B8XOsKbc9W0sv92IlobHmtgnPsGDXZfKW0ER3rfs9VJ0thCXPNq0Ry0FeGw2mDGz4HxAzBPmoeduEDj0F%2FR1qaU%2BYDl%2FnanBAKDCpYetBjwAliUMm6V7%2BM0%2Fd2Us9j4KkZ0r%2Bfvt9Dsr6c3C9qgaJFl1ONGJ&X-Amz-Signature=f54798837c6fc3a1c32bf29aa546a5902dbb77464505833a7f60648682eb7f06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V34EZE4M%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIGjvK9LKdfCqJjLsSiPFXqw8eGb4e02LHnxN%2BzfH2wVLAiEA0c3FwWE9VpZfx%2FredVsBjC5ipKiRJI%2BswbzazMbAxcAqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOBe2bY8CMW8TNYM9SrcA0DOjlTrn1GfrfZ%2FVb7NZtt3NErE1v9igpKYa6%2BEY89GB54gUMBkMG0S7vzbac3Sf9hi%2FTh%2BXUHB3Qtmj9WvItOSAdWQARoytHMMBpArG%2FQpxaIpeBUY2akv2aTyKGCvf22zzR3nSxZNVESiC5lUbHaX592CnkekIEST7Rs38ShVA8OFCzzcRj668qY6PCAUEW%2BFE%2FLiuh6B6shn%2FAlO3YK55DN9g9dq5sbPKaRb%2Bae7F7SQZsqJn8wSukAktCdKboGz6buaHW3xijlZ7OZ4g%2BEYxhKAAKZk9R8fk7XtbI%2FPW%2FnZRP3odCKSnO%2F4lZGlQv2mtjLlmwKZq8P9E0uEV7jRyFLhkG%2Bk3X4T6EJ%2FS6YnW7ajsykvwdvkYZZZJhLZmInrfSr%2FjkvKSQIwolcxAH8ETvl1bpX80gLhXTSnwlAOFrTYwi0hl7QFvao7%2BFLkHcC0VQb6py702xl2OMb1wcbqbR3rD0OLjBmv8Xi62rhRpVeyi8521iVw57Slm7vdPmjKRJrBCma%2FHG2NhKdmohNrkv%2Bu3oxbaRERXSeRN7VV%2FSyusc1mYsUhKWPbBm9slS6kqH9sv7FO1EQSsQk7exN8OvUy1gV38dTtgv4b2e7vxBQ%2F0IoWA9u4ly3rMKqB28oGOqUBNGNfAqwb0R2XurXMzOs5GjzbF12bcpQNwbdM9TM%2FB563VE6VU05yoGn3qFaKDigU8EyHNjErMU7aiQaEVRS7An6Ik1Uo2Ne5g%2FjWjldG%2BXxJnMETCLY6zUYccYST7asKlwvmQV52pyLgNuq1%2FLlrFu8aRgU5MYla1kHu56E3XqI2uJmAjBmoKX5Gd%2Bed5AdS9DxRjk4hie%2F0su23dsqVRcPRMvi7&X-Amz-Signature=7d09a7a0ef7aafa5be6371df1d8c9d2fd141d4f7283d578b104d145fbf9d4253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V34EZE4M%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIGjvK9LKdfCqJjLsSiPFXqw8eGb4e02LHnxN%2BzfH2wVLAiEA0c3FwWE9VpZfx%2FredVsBjC5ipKiRJI%2BswbzazMbAxcAqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOBe2bY8CMW8TNYM9SrcA0DOjlTrn1GfrfZ%2FVb7NZtt3NErE1v9igpKYa6%2BEY89GB54gUMBkMG0S7vzbac3Sf9hi%2FTh%2BXUHB3Qtmj9WvItOSAdWQARoytHMMBpArG%2FQpxaIpeBUY2akv2aTyKGCvf22zzR3nSxZNVESiC5lUbHaX592CnkekIEST7Rs38ShVA8OFCzzcRj668qY6PCAUEW%2BFE%2FLiuh6B6shn%2FAlO3YK55DN9g9dq5sbPKaRb%2Bae7F7SQZsqJn8wSukAktCdKboGz6buaHW3xijlZ7OZ4g%2BEYxhKAAKZk9R8fk7XtbI%2FPW%2FnZRP3odCKSnO%2F4lZGlQv2mtjLlmwKZq8P9E0uEV7jRyFLhkG%2Bk3X4T6EJ%2FS6YnW7ajsykvwdvkYZZZJhLZmInrfSr%2FjkvKSQIwolcxAH8ETvl1bpX80gLhXTSnwlAOFrTYwi0hl7QFvao7%2BFLkHcC0VQb6py702xl2OMb1wcbqbR3rD0OLjBmv8Xi62rhRpVeyi8521iVw57Slm7vdPmjKRJrBCma%2FHG2NhKdmohNrkv%2Bu3oxbaRERXSeRN7VV%2FSyusc1mYsUhKWPbBm9slS6kqH9sv7FO1EQSsQk7exN8OvUy1gV38dTtgv4b2e7vxBQ%2F0IoWA9u4ly3rMKqB28oGOqUBNGNfAqwb0R2XurXMzOs5GjzbF12bcpQNwbdM9TM%2FB563VE6VU05yoGn3qFaKDigU8EyHNjErMU7aiQaEVRS7An6Ik1Uo2Ne5g%2FjWjldG%2BXxJnMETCLY6zUYccYST7asKlwvmQV52pyLgNuq1%2FLlrFu8aRgU5MYla1kHu56E3XqI2uJmAjBmoKX5Gd%2Bed5AdS9DxRjk4hie%2F0su23dsqVRcPRMvi7&X-Amz-Signature=6f726c3683b2ed7480cd5e2d2a6dd3ae49badb7e3d52e18c9a85ea8da89e78ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665772AZTQ%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIGggH1SlVQMr2SDTuPw9hkIEyDkthIdwJHu9jOv70Jj1AiARCl4wIORnharkJTp09zhKpo9RJyYJJAe5OmOwnzft%2FyqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5fen5IzXvOnJDATfKtwDoXMKZNwE5p4XRd7yR0Ahp86zkJpCxDBei%2B0z3bgCLyRLG9n84Fr27UBRYRTgCqTh92Xa7S331SMCXAwpuG1%2Ba0aphKB0lyrvaU9EVZns4EcTlylMLJU4F3gLjCqfee4crP871TP57kKP318tKQGIUvCcnOLnBlsNPg9EokicCcLduikhBbrAarQUee%2Fc0mgSt%2FYNL6YtQx%2B9HpQZXGQChzAzdOaPFqNg94uDKIqJff4w2tTJMiWHMVO8c7JuKABz1teuQ2Zz6i781NW4lgrrYU2iojB8EVu9wdRupBku4nJl1OPXdr7AOx%2FQbpGLI8fJtrrz4CGvY8adfimDdb4S2FD8HXS1eYGCXlAvwBS4JLZm3ogRdK1VvNfeO8Figqt2uhxoLUvTokaWSxC1an8ietP2F9prb9XFvKzqj%2FjiJ%2FscdXqTanEcuR4yQosr%2FlAeUJN60rWH%2BmFsVyyKVWMnZHskKx9WkAkY6MtGLOcUf2NY3pJkUtOwv8p3fVy00PkNdNmSK9QEjjMsKF1nIqlc8voAFJFY4OIwEhVG7r2jTcaeml8ACNLa2hEeHf4wcfF9RXU35Kvy7E1JIrCNZYUT9M%2FWFrmD19SgaEjYzGquBUMvEVRjXxYbLiKvOSgwnYbbygY6pgFgWCBTaAUvwwtic9PwABg97RpNQDuD9o%2Be5f8fdouYi7AC0wNan%2Bck7cchgVms1PnfDknF6H990Adwp9OA1%2FQVBP96uS45PUhJJ0LVD6PJUw%2F8Pf3U5V01B5i2ism3d4lWLfge3uvUkpZYhNl2kvCCGimXS%2BrFFVaKTTpLr4XZSTesTa2gYT6Bgez2rl6n3j182Dlpz5gd2Wl6qO3Bql6Bxhj8hURR&X-Amz-Signature=601ddf3f571b4b6e1b9a3b877d6d906975d849587bda01c2fd5ba696d05f896a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EUAE3AT%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIDH%2BfCnPciMR%2FYggHZl6EQPVOs7iUEJtl5OxL8l%2FqigxAiEA2aZDdkOxQDLP48LNMhdN81PvU5tTFmU6C6tLKen2ujYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH00fZKU8Ib32596GyrcA8hhnv05DCpUpA4LpaymNmuJhqb%2BWKyEsYOTrGx0KoD%2FdEnDxDP2ay8WOIlcT1vt7oM7tS8P1sfowf6CqorERURebsXwCMNwc4lojgQpUMqGsPP%2Fa22fVY%2FB%2FaW9okt6IW8zdYKk%2B1cPZHmIsRVnh%2F5c%2BTKO%2FhhHJYWwj4gTc%2BaoEtpXb9mcqBtqP%2BDB%2FeOickJWbtU2rDftVL%2Fk4ytHK6hrshwPGFlZ58DmoaOvlB7iZG5JBOW5x4jr87PpaM74cD7vggkocYslc9JH%2Fal8sgLN4lHsyWIHyp6dUoVdkMHaPaa9kvxD4cFGlR7ublyqijguU4Gena91Wgilj5amS0MY8d7PpbC41DL4awYB9v8tZbIR0cD00JV6R8KfIODg%2FWvHPB7yfecEwy95sYQ2ay7i4%2BkJ03HM%2F8oI9vw9Z1bG%2Bkdc4O2Ya426V1wFLnRHsMoSm3QNZMzRrcFM67%2FlpxvL6gVU%2BpJDIUEoa1lSbrpCBahof3jL4px8JbPnSd7xQTbFOo9IqRZv%2BOap%2Fb66LVdkhKm5xSMwC0QwJWOMRYNrCF54KxnLkr4PYqRiabHe03R85isW9wD5S0mmeMkYUeku2WRHfNCo4ZecbHeuFoztd3zZ9U67aReZhrEJMOaF28oGOqUBrZDB3dvpUhE%2FpR2UCvcxVlvBhE6WdCXQXjEiOGQPN%2FiK0W5%2FwyhXVF41FDXKZ9ylPaAa7evs%2FMi1EzdxDToxA0ChSKprOWl7%2BF4SQsXpWNaJ%2FUwXuBuqKJJBTmLZoguDxzCntfv%2F9gmk6zgE0evomwaIVCCqu2lsjAbHLPCwb8HrnZsuz%2FXxpQGCVZueGJCxNTPgvIsdNL02j75XAZ%2FF2YcokUZR&X-Amz-Signature=ce11bab3f59e024204a554dbc7662d86ed9ca785a17843a105983f0df0030195&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EUAE3AT%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIDH%2BfCnPciMR%2FYggHZl6EQPVOs7iUEJtl5OxL8l%2FqigxAiEA2aZDdkOxQDLP48LNMhdN81PvU5tTFmU6C6tLKen2ujYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH00fZKU8Ib32596GyrcA8hhnv05DCpUpA4LpaymNmuJhqb%2BWKyEsYOTrGx0KoD%2FdEnDxDP2ay8WOIlcT1vt7oM7tS8P1sfowf6CqorERURebsXwCMNwc4lojgQpUMqGsPP%2Fa22fVY%2FB%2FaW9okt6IW8zdYKk%2B1cPZHmIsRVnh%2F5c%2BTKO%2FhhHJYWwj4gTc%2BaoEtpXb9mcqBtqP%2BDB%2FeOickJWbtU2rDftVL%2Fk4ytHK6hrshwPGFlZ58DmoaOvlB7iZG5JBOW5x4jr87PpaM74cD7vggkocYslc9JH%2Fal8sgLN4lHsyWIHyp6dUoVdkMHaPaa9kvxD4cFGlR7ublyqijguU4Gena91Wgilj5amS0MY8d7PpbC41DL4awYB9v8tZbIR0cD00JV6R8KfIODg%2FWvHPB7yfecEwy95sYQ2ay7i4%2BkJ03HM%2F8oI9vw9Z1bG%2Bkdc4O2Ya426V1wFLnRHsMoSm3QNZMzRrcFM67%2FlpxvL6gVU%2BpJDIUEoa1lSbrpCBahof3jL4px8JbPnSd7xQTbFOo9IqRZv%2BOap%2Fb66LVdkhKm5xSMwC0QwJWOMRYNrCF54KxnLkr4PYqRiabHe03R85isW9wD5S0mmeMkYUeku2WRHfNCo4ZecbHeuFoztd3zZ9U67aReZhrEJMOaF28oGOqUBrZDB3dvpUhE%2FpR2UCvcxVlvBhE6WdCXQXjEiOGQPN%2FiK0W5%2FwyhXVF41FDXKZ9ylPaAa7evs%2FMi1EzdxDToxA0ChSKprOWl7%2BF4SQsXpWNaJ%2FUwXuBuqKJJBTmLZoguDxzCntfv%2F9gmk6zgE0evomwaIVCCqu2lsjAbHLPCwb8HrnZsuz%2FXxpQGCVZueGJCxNTPgvIsdNL02j75XAZ%2FF2YcokUZR&X-Amz-Signature=ce11bab3f59e024204a554dbc7662d86ed9ca785a17843a105983f0df0030195&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5NTM6W3%2F20260101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260101T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIBMfy1zQfgpi2SLWALcmpci2VpR1IsCnrxCZq9til%2FsWAiEAh%2Fof7RtMiiy92fVkySkZh%2BJHUIe1jyHR1dDK8YG9XVIqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDALiqPQFbs7ZPnarhCrcAwa3IQ%2F6I84I1DUFdWWq5UGjHTt9%2Bh6yn7k5ppT9fYUtvF%2F6PhOY3uYzi4shyytP8xCS89%2B%2F%2BLRKB61UAbmUSkL81gWreTx1GUHZ6IdovnmzXyF9nTKm0FkFjbsBTehe8llxA1sA0DCRCPpvHSAVHn6Lggb6yTp0KMPlXaVG1k7hfdBcacktjbYJBYu%2FCuxS%2FPLV4c56FEg7b8FLGUwi5IigF7fatM1dh1FxWN3VWFXbY5CnR4aprsBe9wq3ffBkNQigZmbQCaNMRx3E%2Bi8Atebn9xw%2FgOHPwEddRR0%2FjaBWFsW41Ds2Ua3W7erJJbq8s92vZFl4H%2B3D0Uqga8tQdr4v49gBnGtUwpoqMzFZmyxrQ6FhmwlHvxHFi62iozJ2b4NHE1wxxlXhGEHSDb0VGsNe0W4cJibUGCKyVOnoMaLKQ89IQqHfEPdXMJ44PVSRiM9MJhZ8c%2FGXHsptwyH1LX%2F4JS%2BwU3%2BL%2FFyEQXvgYIoKM9z0DLC6GTYEEANpJpeY1EKiyC0DOOR%2B4rVHljqMVdQApkBs01kmBOscX5m6L%2BXd9bVfOs%2BswMEjXtwXmgWzlK9Y8%2BoLcBmREuqhvc%2FZX66X2Rr4kJTduZVbNtSokjuYYOplrg9KAN%2B68gheMNmI28oGOqUB3x%2FeRcKAGeYQxzAuVuSwUcFeSKSp6lyeewKSdmddvGLT6P%2BSQpLMiS2pu7%2F31BPOki1j6jneCX3zjAUfNzTemkbkxAvfq0X%2B7dD8LAVmUfII0XgjrDiBqCzVy5ttXid9DWVf1LzfAHK%2B89D0DYF%2B3ADbL%2BKo6fFg%2Fgmtc4OL4KHNEMsumWqW2ulAbSd0TC6lTEAvz3ueAFncZ1P7tW0JPDYUC9zD&X-Amz-Signature=6904d854adecd1d9307e3a0f0715f73544706380c5c89b392aa3999d5d7f1833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

