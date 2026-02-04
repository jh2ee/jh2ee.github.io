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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2CTLBBB%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQDjucSgChKg3F7JoUsVWQ0enVL5s9Kuq3dPGBlwMqZ38gIgFYy63WeoHHSCYQx27YJYuCyDVSrLGb8VkyfDf7HU95Mq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHTZlU1aYgQNdFjr5ircA%2BsEUm8LxZnjMmh9nZ8Ss5f7xBZEfcVeDfCXKK7rzmAWcwzLe1pv1Uedw9muUSO4jyDS%2By34Wlni2leuFPyLEgakR1w2lAInwWGKvxlmKUOImCJ4vcmGWwbG5jDVqb913OTaI%2BQuhVc0n5fjFbuiIeKRmn4YlI%2BcR85N%2B4fcuS9kySnC%2FJ8VV%2BaFzkYqlSbs3Y9EsgPsD2ozbRM0dPhcwVPVkuillCaAg5AWCLITdzNRUBnK1z%2FRcObIC6%2BVejzD1p1bgJQcWfHxAVb2hPOPBIobcs282ACzFiWsZwpDuvst4UhTQUE3z26sCeR2OsZ7JS05y%2FqIz9FtjAhVuZUwshFh7aPcqnDOHocE3jruq8wAbOGCSZUkoLynm1XIWNSxLt0nrH%2FqUmSVLXr4WDcci6XTaicEASB2cWK1jb6AjYAhi8Hwdzf4oL4oJtZVL2VWjdO8YXZi5S%2FvVWdH3yhFJ1b7nUpbPyzAO3e2xiM%2BektueizBlkrE1fdqpRWdwHSb0tEV7R0czSQGgG89375XaCl2ydki3ZNGXcSDIJkRIo1IaJYU5Yia3ENFRD9GGAHv6W%2BQTqRednWRCzIPD4H9HhmKWqlMQzTDXac34a%2BvT8MHxTwIAHuVRFGA2CgVMPOOjMwGOqUBI6GiwExQtKl8GMd0nRUIA3INJvxneS9Ou2%2FXeWujTupROU03KuB4BOaB6bPSBVH6fDP6eEo4d65X%2B%2B7iTRWjz1yfTsQBNU0AWkijjBx9Ym%2B7RBV%2F0iJcNKORE50F0%2B8p3OHGqzI62UANcpHTwZA8LftKab8IDmljvWcybundE%2BrKn7GSju8WnQJ0TbcQ0k89ZamhKemDycVx1BBgsNQRPs%2BJKqRK&X-Amz-Signature=6bec61531a79b48c66390158baeae25bdbdd8c07606a90986769a466ca17a947&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2CTLBBB%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQDjucSgChKg3F7JoUsVWQ0enVL5s9Kuq3dPGBlwMqZ38gIgFYy63WeoHHSCYQx27YJYuCyDVSrLGb8VkyfDf7HU95Mq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHTZlU1aYgQNdFjr5ircA%2BsEUm8LxZnjMmh9nZ8Ss5f7xBZEfcVeDfCXKK7rzmAWcwzLe1pv1Uedw9muUSO4jyDS%2By34Wlni2leuFPyLEgakR1w2lAInwWGKvxlmKUOImCJ4vcmGWwbG5jDVqb913OTaI%2BQuhVc0n5fjFbuiIeKRmn4YlI%2BcR85N%2B4fcuS9kySnC%2FJ8VV%2BaFzkYqlSbs3Y9EsgPsD2ozbRM0dPhcwVPVkuillCaAg5AWCLITdzNRUBnK1z%2FRcObIC6%2BVejzD1p1bgJQcWfHxAVb2hPOPBIobcs282ACzFiWsZwpDuvst4UhTQUE3z26sCeR2OsZ7JS05y%2FqIz9FtjAhVuZUwshFh7aPcqnDOHocE3jruq8wAbOGCSZUkoLynm1XIWNSxLt0nrH%2FqUmSVLXr4WDcci6XTaicEASB2cWK1jb6AjYAhi8Hwdzf4oL4oJtZVL2VWjdO8YXZi5S%2FvVWdH3yhFJ1b7nUpbPyzAO3e2xiM%2BektueizBlkrE1fdqpRWdwHSb0tEV7R0czSQGgG89375XaCl2ydki3ZNGXcSDIJkRIo1IaJYU5Yia3ENFRD9GGAHv6W%2BQTqRednWRCzIPD4H9HhmKWqlMQzTDXac34a%2BvT8MHxTwIAHuVRFGA2CgVMPOOjMwGOqUBI6GiwExQtKl8GMd0nRUIA3INJvxneS9Ou2%2FXeWujTupROU03KuB4BOaB6bPSBVH6fDP6eEo4d65X%2B%2B7iTRWjz1yfTsQBNU0AWkijjBx9Ym%2B7RBV%2F0iJcNKORE50F0%2B8p3OHGqzI62UANcpHTwZA8LftKab8IDmljvWcybundE%2BrKn7GSju8WnQJ0TbcQ0k89ZamhKemDycVx1BBgsNQRPs%2BJKqRK&X-Amz-Signature=6bec61531a79b48c66390158baeae25bdbdd8c07606a90986769a466ca17a947&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZJAMUMP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCICjfCi7NQgGLhK3MLDY22oDjq0t2oqad1tQnZLkVkwbHAiEAmA3GxcgaU9IZHEOHCJjGUyfwMVdzr5hmWneFRM%2FpG44q%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDKSHAf2ysY4u3odD4CrcA2pJf5GwHmfs1WBM95EqaznmZBGNnjXXCULFpEPVkFtYsT4mJ%2FZf9p4MelrVgd8Dbx4zSRbivLfGaG9nXsYeEMTTUX3mczbkTPmDT8yDC3YxGhCVXT5bqiUovECM066VpFZ7nZ5g27aM%2FmnbsZw5Q0%2FXH0a7003O2v%2F2GOUqCiL6VPY6wNqlwG8rKNrVpmOXdWJrS2zNQV7FuN5neCiJ1QQy3xji4jTLIgpAwipcaifBTckCPvBk%2BSyKXuTD0x%2FVAdm7hf7j%2BLkgTwE6%2FGrKNbXriOiTQNi9nvmrKg675%2BDvh2tY55H1hfQL3orsmXxXNjlRgL%2FgWPKAsSdQqdUOCfIGNY6A%2BPnowHPvc3MzcoM8ubCtBFsF7ip1pxmm6BLVseNQgdNV7kciKWBkV3KrIKYRN17BtH81rmYkYyIbkEfFrngWqDQ1VieSQgVVynfDBS7auavSs5TF%2BYnX1%2FeUPI06yln9r0V10miJc7HI2Ue4FvWps%2F7O5zU0OuIC%2BP8N13jgClCqeJlYUAwxf3z3lAbBzRsbe01Ouxgq99wjaI1Vvj3GpGgk5KvW%2FMXfBEFzJEZyCN5DXGz7U6SQkQSGhFIz7aUmSTeW%2BgsPlpVlnRpt434r5UERgIuYca0zMJ2OjMwGOqUBQYxlRBV9gLazuiaWEUkASa3qPGyTL6BbOfny5qhH5jenMrUaDXRjaQjipsM7yansM9SK28sLT%2FK8AMeqOzJwFdgZZEuUvEv%2FSqhmLcay3uxN9j4bbEzoWcniLmtA17WNlm8fRcN%2FWg81UBT5ZiTzrfxsEl8zB%2FyMUia9CCpY35g1rcTDHz53XfIc8kw1vzgGiRyjFfFgE48ENm0ADxKoOLjiP9h2&X-Amz-Signature=79e303a4a6c5842cc78f701cf8ac5e2a9ca6be452080b38f58d7d85e2c8bf33a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDDWNPJC%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCICjfpqMqyYjJ46QMFOiB8XAypzYXeg%2B1s3vLai9Rg25lAiEAtIe7DoABtTvECaGLUB%2BgF5bT1a8Mqp8%2FVHnhbMaY81Qq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDLdwa8ToQZj0ygvNuircA9vw%2Fq1NCpDdf%2BbnEz5lqbTKPsPI4rj8%2FoY%2BWTZDq0XtOPVtfTIDohxaUm4BCx4U20VLfMfvF7pinfTKZu3meK%2F97ayluGgDa2RZV12FsSa8RG%2BX%2FXZ9Ii5wp7GI3GvAD5%2F%2FSXMZYa3VM58ZuLOfFGU2maXIdw8RfXwGoBLg1TNWe3XjGAsHNZAGRxnDux8YsqOJS3aVLdG0YnGdauWBsYytNiBT1T%2BIuMaXh30FrjL1dvAfCYj2MoxZ5V%2BvjLf6g2fHyI6sBpSBTiiV5tDjinRtPO9JHRapVr7GQ7SCaH2zP18JvxjxMbr90MpzaGXqjyqrvW%2ByVU3r8fs4fVbGA3GyVRxkSp8CqPu3dSCvs77zXw%2FJCmkSYRWmn5i1CSRUxfhubHN8uQfzCrTD8DEpR4LYJH6XiXXY9UJoJpGPLdfEfznUBx89Pe3nL7y4aE6hoKMcC5c%2BAPdVu4UUJAmNAz24eZVyiHySHrk8N4MWseYoLNBtZ2uUAj2CQTZ%2FIUb7UnmB1qX%2BKUXA3ByFw2EoT6996UFVbaq4VGtD4bLTogri%2BSR4U2WNGYLG7QqzfLA%2BWzJCCnOIIOdHw7XbMYplOKASnlOKbIMJ6G6HLA9IjvCVKgbPNYu3xTp8XcIkMPaOjMwGOqUBr9jrzCDvtCsrDzOuQN69argjHRmNl76BrJDGCxEu2H9DikO26OeM6yBDo8FqOQL6j%2BRdfMt15Fv385Mr6z2WdpYaLKcBvdobl5NjZAQg12Wcmmz1NNpkrSGbQgPRp7Bkj2F1EV6rvvbJWiwq%2FlAa2QTfedDKq0oYUMKVaktle1xssK3BGKoBUzzdnxDDpDpKk0pWd1Af%2FfxhvJ7Xl%2FA1%2BwIhQ9I4&X-Amz-Signature=318d99e72caa885d106fa7c59ca948d566dae9ec949ba28937861c00ce751081&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDDWNPJC%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCICjfpqMqyYjJ46QMFOiB8XAypzYXeg%2B1s3vLai9Rg25lAiEAtIe7DoABtTvECaGLUB%2BgF5bT1a8Mqp8%2FVHnhbMaY81Qq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDLdwa8ToQZj0ygvNuircA9vw%2Fq1NCpDdf%2BbnEz5lqbTKPsPI4rj8%2FoY%2BWTZDq0XtOPVtfTIDohxaUm4BCx4U20VLfMfvF7pinfTKZu3meK%2F97ayluGgDa2RZV12FsSa8RG%2BX%2FXZ9Ii5wp7GI3GvAD5%2F%2FSXMZYa3VM58ZuLOfFGU2maXIdw8RfXwGoBLg1TNWe3XjGAsHNZAGRxnDux8YsqOJS3aVLdG0YnGdauWBsYytNiBT1T%2BIuMaXh30FrjL1dvAfCYj2MoxZ5V%2BvjLf6g2fHyI6sBpSBTiiV5tDjinRtPO9JHRapVr7GQ7SCaH2zP18JvxjxMbr90MpzaGXqjyqrvW%2ByVU3r8fs4fVbGA3GyVRxkSp8CqPu3dSCvs77zXw%2FJCmkSYRWmn5i1CSRUxfhubHN8uQfzCrTD8DEpR4LYJH6XiXXY9UJoJpGPLdfEfznUBx89Pe3nL7y4aE6hoKMcC5c%2BAPdVu4UUJAmNAz24eZVyiHySHrk8N4MWseYoLNBtZ2uUAj2CQTZ%2FIUb7UnmB1qX%2BKUXA3ByFw2EoT6996UFVbaq4VGtD4bLTogri%2BSR4U2WNGYLG7QqzfLA%2BWzJCCnOIIOdHw7XbMYplOKASnlOKbIMJ6G6HLA9IjvCVKgbPNYu3xTp8XcIkMPaOjMwGOqUBr9jrzCDvtCsrDzOuQN69argjHRmNl76BrJDGCxEu2H9DikO26OeM6yBDo8FqOQL6j%2BRdfMt15Fv385Mr6z2WdpYaLKcBvdobl5NjZAQg12Wcmmz1NNpkrSGbQgPRp7Bkj2F1EV6rvvbJWiwq%2FlAa2QTfedDKq0oYUMKVaktle1xssK3BGKoBUzzdnxDDpDpKk0pWd1Af%2FfxhvJ7Xl%2FA1%2BwIhQ9I4&X-Amz-Signature=40a752213d79aacf627196d13b4e7cf3f7278941e8d2d463dc292f55a01d1f14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RIRDCX3%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDscVAK9vmncohcPHoerM0zUaTUpjhVEuMAlo%2FrgTiK%2FgIhAMyPa4dtxzp%2FjXOebZR6Y%2Bm2MMhrQOKyTTR5jJo1jGwaKv8DCBIQABoMNjM3NDIzMTgzODA1IgwjLxZMsuthN2lkxUgq3ANqM36PaVW1loOO9RCz77YRqzKJis%2Fdh5Bw0CdWqpw0lxW2jKPoAWjGY9Z4pfkzDz3Fs7Lw9QnK3Lo2es%2F08LZLTfGsTzdMufDso5kHQuNX9yPto9RnX%2F%2FA0%2FzhAFLRQcElb24HZGDuLbDsud2G90tURN5AD1BMrklpja4DbwuwkinUeEFhmXp7Su1ay8UxtIs9OoQlRnTDdayMIX0CETSE1SoqMj%2BFbIldev9nj4gdf9khtDNFVmbQW6gRjJqCIYVYHq8H3L1kECzNuaV5%2BXdFYI3bla%2BxwB10f02RX24A%2BkefGDBT4bSmAyiiZaddKF1Afry4hqqEaT8rwoeX7VoVmqRNNvR0l3lPsmZmbkqeD2KRwGsXKaDrfcByJ1l0IJpb4w1ULK9uZelpA42OrPxklToEbJ5gn3Y6LSAoeukOXkxy2IR1hQ441u64yU3R5vXBdAZE5G5PoUW%2B%2FDVdRW11%2BMwOvWxr3I%2FN1ZGonx3rvAlI4E1AM3eiHSeWyl6EaxETWZEAXyQEAsZxi%2By3zHmZMLLAqrDb8ANDg%2BA3VFBIrDt2JzRYjqCzgqY9Ot%2BSzdVumXki4YqnIWAEBLWshc40mtLynNniWfI8%2FBK%2FQS4uNyZ8ck1ELmhxrbRTXTCCj4zMBjqkAT0lIdcyFos6fjn4ODJqu2Sw8BaFHVT5qsL51jmb89BR%2FCBDb9sIyEjcCbzzruvOx7KhH0RepeXjyHF90EmODZSSn1gWwT9m5%2BP7FvIpDAQpC5XRDl9vH61qPGZq4rv3rs6d53jrT1hqulwo7tJP9xePDTPChBRPhUkhsMHcupF7g2kVOPhtI7C5hSEFXZGVRfpj6esK4SV5XUxbJqqF77fhGR%2Bo&X-Amz-Signature=cca6ade2c52af442f8f3185ca4fcf001cac350a10753a578b766e4ff98e6dc41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZFFCWW3%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIBttdKaKEa8jDrfkJaN9NN2Gr9ElpWZPCn1JogjYF75wAiEA1GwCgXfAVS3crpvcVoO1HsPAzW48vyA7DpgQmQxEZ9gq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDMz%2B2dPntJqbB0mwtCrcAwN0OT3qHm%2Fl4Nm6q1rRZPOvxGUone8ti9WRx9%2BLxi%2BgJBfJ2VvpyJ0mVgbt63faqrhW6XEV94BPhR%2F9kyWTvEZmI9HjE%2FOIPPX0EvpCpxSdZAF23S3MMVcsug5R701A6t7yg9n8pMoHnW%2BrSFsR8oLOB878ZXiNP6TIY0ZWRme76ZjXvbh%2B8UyavfXGQRBdAx0tx6o87fZHNnawxbGoQbkboPBL7mfgUjDQiizpnRGF%2BGSbm2crM6GAB99oM%2FvWmhrZPftVnzb6IxojVMcKYEWbO0RKYAD3dzODaHVxHdYEzSvTBSbLypexq1VXX3mofWqPNLHIOZ1qMLbqCOm0IMTG1OgVWThrLNXxmaVl7vcOq2AGxTZ1su186ppbEsARbGaLZvEKpKQfCK1dy5E7pu8UXCO%2BaEZdQGGtPBewxLbQd3TE6Xeois8KxQtjM%2F%2Fvgt3KmMrQmUMPS7KbMJxpBFtGZqPoub3CClu6C2%2Bcr%2FXZ1HkMeOYOQIl5D%2F0cuYRDwbkz7TFUvA1%2BNMJnJj3iLUNme%2BWZgxgjwW0RHkyPaMeyHspxZEFBcbcqXwWjaFDPe0zeaPi2RX6Ovi05m26vuKcdUD4FZLXnUJyg4t%2BTCWhJfzv7ucolUBunHYMIMNiNjMwGOqUBFeGyyhoRsW1yGopofVCtKBmQvVRku67AMSKCGu%2FKUPmADRD6d2Yqe3x47FmSHGks98Qh%2B5gu5mPOCQyJ09MKND9FVQWA6COdfwCoEPjasUFRWMTeoX7KqJSalhy0uFo9uwfu6nu0wKllEcEK%2Fl17qa9s8llbuWfPrBqCdEjwysLoSzVLipO2QSMtdmBN4dccOk1VXyaBUJRKBO%2FwGHwBs5LZICiU&X-Amz-Signature=85eb00dbcc7b7b051529c0f9a313186c88366b7b231fbb648b4ae9209b6afcb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAO3YV7B%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIAh7pW2XK1ngKBU1wQW0zcmlkuOZA0FH4kmVwYKRWZnlAiAEkn9tklFfkzriEmumUMU7xlEvWe%2FfqoHtCbacKCWF3Sr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMXs6kMPGbZ3egHsi3KtwD3GVU2J9ZsTXxuVioG8NBnwKOaLQ%2FBYFwNZKNUI5AhGrAnbKNLwvrTGrwXjAxJqqL9blhO17kw0R9F8cnFDU9F5AIlhYywgE7IMBKOC847Rs735Ctcorc2KUvgUavQAPCKeFJSzE2sKYWVO8XEr%2FTLPUEkfKO%2FLxM%2BYw5swNiC5ab1QxyEkdV5MVZ7QrnlJdLylFqSpf91%2BCR0f8I8FPeuPM400L4DBU2SEJBOo2eTTgS2yVrFUk3Y8LFSd%2Fm7Rx2OWVbqvwSTopZ591TpmeaDuRVOXwKndCoB%2BEsQdxSNoZAU4Y8AuJYAKTwtFzqDdmRKOu29GqMaNDLZIYQ2lMpbdMocBbr38B%2BDwwMb%2BgFax9PshPn4cs1pCKC7avE6l9cC3lWL01zmkbvlWiXIKG%2BuTHNphpGCoZdYbhNPvcZroHuBP0sjVGYiqaimB0DkGf234LQglJ0NH2S4wCz%2B9or0OBTdM%2BnOnbGwDJKUznxxkg2bDnUWfJuFxD1nsD960nEWPThxCEIQNH5xYa7Tlq9QBKRc%2F%2By5l5r8f2v%2B%2FBbfd2vH%2FG3ENSbaHSzDZ3UCuJkvCG4YwY%2BtT3rmbSUIot2ssK%2FWsMtQmg%2BFi2zJRXNK%2F4Aa9hH3XuKlxH8jhUw0Y6MzAY6pgHm8WeRkdHxhT5Q1jZgbj4YWC9yPQton1gkXNlpjvBX6AZ4RxBguE0nMkX4k7D3ipP0%2BIv67kWD8OU2JEX%2FZjlmkvUyDwI22FtXO4rvCDuDswuh7yjelnkXkxZ4t61kfTb9paYr11hFGrLy9r7auqoXGz9psGrwNuF9sqcrZGeT0vJXgvGDExw%2FDANQLTFZE0MV1a9NpyLHnyYexZo4tCkN8Ny7FolJ&X-Amz-Signature=03b011a01190710f89099154e1c7857b3f7817af7d47da758a3fcd4eb95387fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLQDA6FJ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQCONjg4JjmWCgYaGsx2M7XoJeJvHp6LVfpddfFSIm8J7AIgNQYnaqWoGSy6GBjX0jpu133Fr9749tlFfiYWWxvuQVMq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDJYEYu6dFVuun6024CrcA1VY59uKbUk0f501x90rzKSQ8G4KhLRG44prMWi%2FN6vsKR%2BvAR%2Fn87FEeQQigTlz0kIEdNHY8PLUIN172GVQnsyWufBB1bqzElwG6MZTei3sirUHixe6uGUc3PEk%2BF36tmoWuQ%2BwiYPtIi%2FPQduFLtN1nGeg3YqaYD%2F0dDNKNq%2BA5Qtz2aLyM3iH6%2FEy32Wmjlbcs9ZlaFLVCZqGXdKAvf5zZtftVE4L2ff5sJy56fRKxW3gEoR91qrRHahv3bVGpwSeTumyl9vhOSjuvmxEi%2Fvk%2Fksr02LPKsG09%2F7kICF%2FS%2B9i8UL3P%2B2%2BoWB%2B3P8kTktv1GOWe5kWtKj7RdUaec8mCsIpUsvnj0OgSsPGwk3GJSdxY6bI1gm4dpmh95AKrCUXMwuSt1fp7kmsKYjzgQJ%2Bnn%2Fg1EDjtxGrq%2FPGGG4JFyd%2FK7OJJSMZMNBH4OKE4Avvr9zmmxOZ1g8gKgTsWv7TxKa2QY16UOg7HW09gu%2Fa%2BJkdngpCbrWSRCgVUNhtx1na3t6oHLzg0q%2F5QEppFIZdEmspEjVjWotwqEarUo%2F9PF0mKLm7Fw4ehIwk577RRXFcKcaF7rmjanaKyPffvClS13rltw1%2FeuZYri1F8MHtj%2Bsb1gEMQosTk11kMLCPjMwGOqUBcN0B84Sr0%2B2rKBCMSQXJ8RcjBjX1qMAweYBCkepXIiApMoj%2Bm6gpm%2F%2BFYllQUpbDoA%2FqFDqtS30BfMqqeqD5qXzUEv8G58n7KwsALDtJ%2BN6RaEedeh7Uj2ojZYKBZ8nBmGxAwaLladh2ZWDe5ytiobkgOMO2jsLro%2BDIjCZ76KEvXHNUIuBEJAUUKvOhgijlxTYCQMZwkeOBwxMPQeBxQeiNwadQ&X-Amz-Signature=15f48422ed2fdfeec9a0ed9dc19649ae2ef6a02b29f8a00bade32fe7da4559f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLQDA6FJ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQCONjg4JjmWCgYaGsx2M7XoJeJvHp6LVfpddfFSIm8J7AIgNQYnaqWoGSy6GBjX0jpu133Fr9749tlFfiYWWxvuQVMq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDJYEYu6dFVuun6024CrcA1VY59uKbUk0f501x90rzKSQ8G4KhLRG44prMWi%2FN6vsKR%2BvAR%2Fn87FEeQQigTlz0kIEdNHY8PLUIN172GVQnsyWufBB1bqzElwG6MZTei3sirUHixe6uGUc3PEk%2BF36tmoWuQ%2BwiYPtIi%2FPQduFLtN1nGeg3YqaYD%2F0dDNKNq%2BA5Qtz2aLyM3iH6%2FEy32Wmjlbcs9ZlaFLVCZqGXdKAvf5zZtftVE4L2ff5sJy56fRKxW3gEoR91qrRHahv3bVGpwSeTumyl9vhOSjuvmxEi%2Fvk%2Fksr02LPKsG09%2F7kICF%2FS%2B9i8UL3P%2B2%2BoWB%2B3P8kTktv1GOWe5kWtKj7RdUaec8mCsIpUsvnj0OgSsPGwk3GJSdxY6bI1gm4dpmh95AKrCUXMwuSt1fp7kmsKYjzgQJ%2Bnn%2Fg1EDjtxGrq%2FPGGG4JFyd%2FK7OJJSMZMNBH4OKE4Avvr9zmmxOZ1g8gKgTsWv7TxKa2QY16UOg7HW09gu%2Fa%2BJkdngpCbrWSRCgVUNhtx1na3t6oHLzg0q%2F5QEppFIZdEmspEjVjWotwqEarUo%2F9PF0mKLm7Fw4ehIwk577RRXFcKcaF7rmjanaKyPffvClS13rltw1%2FeuZYri1F8MHtj%2Bsb1gEMQosTk11kMLCPjMwGOqUBcN0B84Sr0%2B2rKBCMSQXJ8RcjBjX1qMAweYBCkepXIiApMoj%2Bm6gpm%2F%2BFYllQUpbDoA%2FqFDqtS30BfMqqeqD5qXzUEv8G58n7KwsALDtJ%2BN6RaEedeh7Uj2ojZYKBZ8nBmGxAwaLladh2ZWDe5ytiobkgOMO2jsLro%2BDIjCZ76KEvXHNUIuBEJAUUKvOhgijlxTYCQMZwkeOBwxMPQeBxQeiNwadQ&X-Amz-Signature=43bd08f7c1baf5ccdf270717fb19ee347bd7abcd822b8e017192fffd34f1eb09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQMOM64X%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQDQnmW2NJXxaLI72JzoyyIYKxulK1CKdYC81w9CqbjuvAIgQlAtElAIQAeUnWKay3FhXN6r0uerbzbIrzlN9dFpycMq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDAT1JmLM4I62UjhCLyrcA28Qrcjvf0KAIlAt1UwQK%2Fb22w195RyZHyQDippcQ3U2n2W1QtGr35eqgF54nNrEpysc4fNlvcVyxZNR3QTcrHTJ1MXcvovLN%2Fe%2Fz0VgWt8sAfDs6zCCKY4Um2Q4lpTnlpucdYkhKTUCEBp8bzWX6gEk%2BFauWuQnI2o40julVM0gSBthnN2cGl0rA7AjxJD5IurkEURHJ2DUSFKaEPW%2Fulp6Q0Pa2cmnU5J1FRZmtBGKpQ8ygjzg%2FU87p54wu4W64LN4IxsLwH2WAfvDLVq0lKlwQTtH17uXcClsZGleamBgqrqBL3oU%2BCt21pMbToITRlZGBP1YE8Tum42lywvRRJumjUOL1wXevfjZs1sh2WcYus0QOxCosAwCfSVjkEHS0kRxuuKmPL0W%2Br1DMevF7NvhRv9rM1hRmgMdswnzn8heb%2B3iKiC7QHl06m%2B%2B5J4BOR0AhtE8nmVQE%2BIyq29EFPx2MAaVRZ8I5sJjpkX0Gpwu511jX4YTyoX9NmF%2Fw72N4kCME7wSKP8dEGTu9V3rgm2XpUqD6N1WxsvTMDEADy7qnqDI5%2FnoaPguC7jb5dggmARiH2OUqLIMa9nkBVhqVQ5%2FO3axJjtoQZsRVP0Wke0sXRZAJkilM4xVEmD%2FMLyPjMwGOqUBUF6wYxhnh8XN9%2FlXy8QOfuIDSssEPmTQ2FlNGF0mGZbSZsidePwIhETdH9I83uqbQyriZqgOh2MRInVcN4IhtdhxhlqhN1wzd1LvXVK4%2BIEBh87LKZA4iG4HT9JYUIIvXp24ieiAz1l2vus%2F5LkARFtQRftPq14qafIQuxMfKJUDMKfbb9nZMK9rrJo8lEU790Iref0fWLXIo%2Bwu0dLWOMyQibLL&X-Amz-Signature=bef4c5c0b95d15dd81cb9c17df00f6c11608dd0680799bbe2cd67327f7ac2dbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7VXH3NP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCICJ%2BkZay8E%2BT3hEiKEwLmhD36pMdpO1NeioIgBf8WSe7AiEAxmlMqloqN6jGV2%2F0DpR71T4Ls7OyrLo8TlbDd7sTpDAq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDG7O5uOfV0lKLRTW4ircA0UXMigf8tjcoJNMlkEn%2FqGpgg2murSnJ22TM7zb1fpnhNszLnr8hqQX4EgIJ7ZGlGYL1lGASIyf480XnqkeDGm8O3H2129J4qq88pN60moDegRKbr6Q23peMV70udGhcstSktuTcst4VXZrxVn06LhQsGW6CXvtq%2FJLhX01S%2FCEJ%2BiCUL%2B1RVGT7qfNHPnlL6LFzC48JkYJbBnOYe%2FCvyIwlBjrpOKPluPNVjjpmWZArJA3vER0VduIEuIJSfkB2qVIoHib5ug51H1weUvjo2%2B%2BKdwwDHv9%2BZChyOL52r71O5xa3cTknh9i9h3HGny0%2BYP0iaE2BmL0azYkCY%2Bq%2B9mBHXLVEYRqKrL%2FGDuFR%2FiJEv%2F2eNqzwfnIsPcrjFbsbA%2Bvdk1HgewBJpGCsh1%2Bd2GhpfAd9a%2Fv1bHqWbXH27zUgTnJm3sB5a8jdVmI2xh3et2qIsa9SZN%2BXyoINC0jC7MbUFxmejrilfhmZgkQ8ZYH1GMEP5sGNTwoxZxiy8WGbHeoaUn16lD5qPqAv%2FSS859nx6HjNdT3uugM8b5jkDZQ40wWlM0mID%2Brq9ALvOG1m1kgotU0AEeJXOlIJz4Rb3nfcMaEkQcUg9l6XqXXPM74BRZ958989OCeESauMLqOjMwGOqUBS19dsZWdVnWhyKwartgWXynqbNLmUcyg9HwPFC9pRA4BaNvGFl5%2FP%2FXirVRJFDkgv6PYjKLG1Z3dsHaKVxG4PSHzxncdv3OpJbgEncPHytP2t%2BFVTUWymf9ubKL17iGMjQc9r2UD%2Fy7Qwfxe6SjNKnks%2FFi%2BEMsBFuSkg0K0uTQ2oEF02NZAlE2DDXBQ4KfjoZx9DmkgcWsbIZGt4T%2BSx9F1XVrH&X-Amz-Signature=52bca3ce51664677686b78aa06cc213ab47f7784104ad1fef8b7a522fb810efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7VXH3NP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCICJ%2BkZay8E%2BT3hEiKEwLmhD36pMdpO1NeioIgBf8WSe7AiEAxmlMqloqN6jGV2%2F0DpR71T4Ls7OyrLo8TlbDd7sTpDAq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDG7O5uOfV0lKLRTW4ircA0UXMigf8tjcoJNMlkEn%2FqGpgg2murSnJ22TM7zb1fpnhNszLnr8hqQX4EgIJ7ZGlGYL1lGASIyf480XnqkeDGm8O3H2129J4qq88pN60moDegRKbr6Q23peMV70udGhcstSktuTcst4VXZrxVn06LhQsGW6CXvtq%2FJLhX01S%2FCEJ%2BiCUL%2B1RVGT7qfNHPnlL6LFzC48JkYJbBnOYe%2FCvyIwlBjrpOKPluPNVjjpmWZArJA3vER0VduIEuIJSfkB2qVIoHib5ug51H1weUvjo2%2B%2BKdwwDHv9%2BZChyOL52r71O5xa3cTknh9i9h3HGny0%2BYP0iaE2BmL0azYkCY%2Bq%2B9mBHXLVEYRqKrL%2FGDuFR%2FiJEv%2F2eNqzwfnIsPcrjFbsbA%2Bvdk1HgewBJpGCsh1%2Bd2GhpfAd9a%2Fv1bHqWbXH27zUgTnJm3sB5a8jdVmI2xh3et2qIsa9SZN%2BXyoINC0jC7MbUFxmejrilfhmZgkQ8ZYH1GMEP5sGNTwoxZxiy8WGbHeoaUn16lD5qPqAv%2FSS859nx6HjNdT3uugM8b5jkDZQ40wWlM0mID%2Brq9ALvOG1m1kgotU0AEeJXOlIJz4Rb3nfcMaEkQcUg9l6XqXXPM74BRZ958989OCeESauMLqOjMwGOqUBS19dsZWdVnWhyKwartgWXynqbNLmUcyg9HwPFC9pRA4BaNvGFl5%2FP%2FXirVRJFDkgv6PYjKLG1Z3dsHaKVxG4PSHzxncdv3OpJbgEncPHytP2t%2BFVTUWymf9ubKL17iGMjQc9r2UD%2Fy7Qwfxe6SjNKnks%2FFi%2BEMsBFuSkg0K0uTQ2oEF02NZAlE2DDXBQ4KfjoZx9DmkgcWsbIZGt4T%2BSx9F1XVrH&X-Amz-Signature=52bca3ce51664677686b78aa06cc213ab47f7784104ad1fef8b7a522fb810efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJM4T6G7%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T093027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDeLJ3KbNpB9wBDXorZoabQp7f23GximWvhGkLmliOy2QIhAK%2B%2BSlFzqZbilm%2BLFM07NFdW6dEeQoWeAi42oM1jylSHKv8DCBIQABoMNjM3NDIzMTgzODA1IgxGDZ065HuJ8DfCrngq3APqlLrkLbQ9iV9zEDaIuqLc5mWeSEsIv8GW%2F7SK%2FRvSpR%2BMbidqOxnMCfEFlNEb4cKKv7XM3bPQzB3%2B9qALdSeQbatIaQqyHG0bidd4kvLANgqsXvAZx7%2FpMQw7jxp%2FrSDfj6vTTXw0S0q2fsM5rFjme6qY6b1Shu%2BvIw6QMsf9MYxki2NvdzJ8K%2Fnputzzt%2BESBptz%2FleQg7IRuQIoYsAgLuod0ELtAxCRpg%2FQH%2BKBDx2Z5JmzOmBmWmsaBhFeDpgPyJLs7DxKRSQoBhIh0KoEmD1J3XomGhGvZm7IQNP9DBpjkDjJAzaCmhCuyTUYP0elrE%2FSspNI%2F%2BvliI4wv07HVEHwQGlxDXq1uqVVFPewbhOVLJOFBTG%2BL3OhgsT3U5C8UVrhQ76U8wfAXXvZtR6cwnENwzKha0BmDCJuLdH5gsAslb4QED6elfPumYjhfxNd%2F5kESKGj4eX%2F4Mc8W5Yofh2ULyuoHhXTTlFFug3%2BNZYqwiI5s%2FRKFyrsYkSFTZT5tYgwCxEfV8opanRcXOFnkT%2Fj2qZHjfPTvstH1GngP9zJ%2FWtsTAI5HmlrhIqxI2P1sA1XwlFQ3h99wOxpwQGfAoSlBMVjw7E0fyZzol3ELe3LtsvJgIemEpPzzTC4j4zMBjqkAThul3AuJAabwHimcIJWcDs2WM6q6Pb1RKMoqhSsKJgbnyPhKrpPU0XrtSwpnlXbLpJckTAyFE%2BLCAf6lAOw8v7OmTTEd%2Fdew4cvlZdCImicpTxUzjfird4UHdaW5ZTL4b%2BS7hpWsNIso16CzKPchyQuc7%2BFUFK0feaK0TKFj7QYRKFIBO26YA8YTgwxJcg8nx%2FQoT8i4wOwXnZsHsF2hdgBbqaS&X-Amz-Signature=a11de39831306740e456c7da2c3f8cbb41a7e6f2ae5dc7dfaad744779bdbd9ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

