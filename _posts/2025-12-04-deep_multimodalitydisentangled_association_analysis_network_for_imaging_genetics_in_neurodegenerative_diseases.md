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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y7ETHI3%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGlV8CT8xQOGTdmhG9aFVH8U%2FEF0%2BUgpOvyf56BQYkANAiEA9O2xvPxQXCrON%2BHc6ADaJ5coSE06wDnXhg6sbLZS88UqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFukwIpRHwAqJv9%2FCircA5FSzmgNS9rAAsL7F9faiBFai19LhH5Ugb5kSmdLTP5xW8Nt8%2BnMVdRSxl1hpiUXLMD2Q%2BpZ9T8gJ92ku0YCAZsmBrxNAad9hHBy%2B8A0Hx%2BbA34qlt%2BLHdtWxiPQAiXSDN4xU2MfFr5PD941ccItssGaeLYZ6aksG%2FOvQ8pvy5rNyVWgWxO560DgL0yUUsWv1D67onHI%2FrNFEyULx3aD8eI%2Bxph3qBTFtTe6CJAElz%2BVrbBJyqW%2FMrCAdwpyhDmADpi0Fh%2Fdmh1I8HTyVUm5nEyWRQAJOEv8sKF5uKi6BTdm0JNiUsuinjftq6RH8Ket1jSRbQmHSMT%2BjM4H6iqDPTxcBSjwU1m2PVRnkc3mMVAxTnPbuIFnWdOJpiLH%2BsMUM5c1PAenQ3Khp%2F%2FOigtq2gs8PsYK%2FSplonZkKyPWn3p4C0yJavRh63IHhvqEpWpjLx%2Bfh8TUly2zAgzjMptROQDO9LVaN32Nt8s%2BFeQmxlOBerubKpiSHRNZXrAVYdjwW7eb2j5VX53nnBcYUs%2BvAhoIH0bXUXQ9neCUmK%2FiH5jujFGMWY4tOkbjQJRIp%2BZURM4jGPXsDCiGOimkFWatYmUaop5SE9z0%2FBoEG25g2K92Vk9G6pqKlbuQJIlgMKXs%2Fc4GOqUB0ervDypcvWu8J3DaGiGDTpikGlJjmlWJ5P5%2FGkP70XNztfbsT%2B7l16TPik583IHMVLJcKycoKQRN0TTcRLCajM8gs4hgAeh8bEfrKFVLC2TJVLxIJeB4EKaNSZwx0VJuJ6%2FWvdsE8DCc%2FB0D%2Fk75FmbJRSPgdPjr81kHz4aVq1iD89ZRRu7lP80NIX0QxenJz6CGvew4vNFXEK%2BqAKnWFq671aXn&X-Amz-Signature=e3ad378834318fafb58d020876e4538bdcf6cdac6299eb3461ba58bc656eebb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y7ETHI3%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGlV8CT8xQOGTdmhG9aFVH8U%2FEF0%2BUgpOvyf56BQYkANAiEA9O2xvPxQXCrON%2BHc6ADaJ5coSE06wDnXhg6sbLZS88UqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFukwIpRHwAqJv9%2FCircA5FSzmgNS9rAAsL7F9faiBFai19LhH5Ugb5kSmdLTP5xW8Nt8%2BnMVdRSxl1hpiUXLMD2Q%2BpZ9T8gJ92ku0YCAZsmBrxNAad9hHBy%2B8A0Hx%2BbA34qlt%2BLHdtWxiPQAiXSDN4xU2MfFr5PD941ccItssGaeLYZ6aksG%2FOvQ8pvy5rNyVWgWxO560DgL0yUUsWv1D67onHI%2FrNFEyULx3aD8eI%2Bxph3qBTFtTe6CJAElz%2BVrbBJyqW%2FMrCAdwpyhDmADpi0Fh%2Fdmh1I8HTyVUm5nEyWRQAJOEv8sKF5uKi6BTdm0JNiUsuinjftq6RH8Ket1jSRbQmHSMT%2BjM4H6iqDPTxcBSjwU1m2PVRnkc3mMVAxTnPbuIFnWdOJpiLH%2BsMUM5c1PAenQ3Khp%2F%2FOigtq2gs8PsYK%2FSplonZkKyPWn3p4C0yJavRh63IHhvqEpWpjLx%2Bfh8TUly2zAgzjMptROQDO9LVaN32Nt8s%2BFeQmxlOBerubKpiSHRNZXrAVYdjwW7eb2j5VX53nnBcYUs%2BvAhoIH0bXUXQ9neCUmK%2FiH5jujFGMWY4tOkbjQJRIp%2BZURM4jGPXsDCiGOimkFWatYmUaop5SE9z0%2FBoEG25g2K92Vk9G6pqKlbuQJIlgMKXs%2Fc4GOqUB0ervDypcvWu8J3DaGiGDTpikGlJjmlWJ5P5%2FGkP70XNztfbsT%2B7l16TPik583IHMVLJcKycoKQRN0TTcRLCajM8gs4hgAeh8bEfrKFVLC2TJVLxIJeB4EKaNSZwx0VJuJ6%2FWvdsE8DCc%2FB0D%2Fk75FmbJRSPgdPjr81kHz4aVq1iD89ZRRu7lP80NIX0QxenJz6CGvew4vNFXEK%2BqAKnWFq671aXn&X-Amz-Signature=e3ad378834318fafb58d020876e4538bdcf6cdac6299eb3461ba58bc656eebb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EGGQBOU%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgC1d1%2Fh1vkbPH8ewVW9N7%2BH%2F79Z32YvdUDIXTop91lAIhAPmhLqAxMNNRWggWmXOXnUjAntqcz8jVxm3xOdvOAib1KogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx35wDReITDFLrEAvgq3ANEjbQ6IrSs6h60Pdc2qecOZKXjTLWlYMcb5SjiKC%2F9aGNTFejVgkE6r1OETXISryVah5c%2B0lss6sWAP5MOE5z7lthnMdHFfR1WHKMkfvZYXXK9Udfosi9XVgLmblC5ufVwg2BjFlKkLWW0f0hANnjSN%2BZ6QYtMiDu5OPzR5l2lLMHWrjFbOa9%2BvE204%2BbFuoUqiPdnEbV1nPaKjXqqI8u2YdPkpT6Ur4%2BooEz%2B9QdDrAPGeKJCsfrECBZavyoVOrwOCdUiuYO9Uasd5Yurxv6eeawehLfvcTG07mn2skSmLePC8KVJwm3erdB92VFtIV1KbV4YRI2RPW98MaWId2uOVYOtDWRDmEmNk8Ym8i7fXgqIEk7Gy6tsHwadyNc%2B5oE%2BGvW3v9izeXy1%2BZWvfgMY3oBw12cLiZgU1N5FC5u8Zc0a5ALtiMArLRSo4YSgEhQPS2sC%2Fh1lUd2UtfeTp2VWYdafh%2BzUjf8LGxkp%2BUh8xrzsrA8mqyskWRsFM1SxRkqAswQT7QKnhpkM1Yd1di%2FFHGjN%2BvrNTVyvPvj6bUoeZJu7cBLLeTAacL7orE0cl0cVvLNsDRpHnoBzrAoZ9E1OCFYgnnCPisvTLyDy9Iqe2C2iMGn%2BKcMsAWRWfjCy7v3OBjqkAas4qjifEaxHuvqnUYpGX3M2rvJwpMQsNDdKjFtMwZV8RKyLAnMJYJsMY8s%2F8g7OO5RWQEpGmZoXX9Xu%2FL3VAhj6xF826%2BgUGHamORqN4h05Acy1ErMvu%2Bq0o8fZCxpgXFJek%2FKIjcHA7qjV9K0EaIRBiNytjZhZ8XT0oJKWscBjzaB3BudviEF%2BK%2FfzGjljy%2B%2BnbnT69RxLYh7TgCJqEFOcLoLO&X-Amz-Signature=253d6518b42ce4a2e2fd7594e9f6456ee050e545ff1875640d423ad489000936&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4HSNDU5%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2fQFAgqUP9%2Bmyhe1bRS6ZOqlj%2FyOrAwkxHBfthcyf9AiBSf64owfxlJ8kRPq8Die5NkF2JsaATG9Ryo8k7xfgnKiqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRnsE%2FC5NMvOJUmnFKtwDWr%2FfPXZ8lPB%2FN1F2U0kftqA1AxPbQqOl6K7I8WBkcUh8j5Bzg9fhtrIooqjy5BuEcqNEhIx36p%2B1y9YZN6lkY%2BVJtmwc9yTb2k6LmWsjlqpSrsfyqHJr9bNhlmDzYg6Q2swwfGNc8XsnOht509zyD9j9joyOuKwoLxZ9%2BdYjzQrouTgToe7tgvFPQryPBGNC78d5uCHj7IbHQisOaZy5OcSUTto%2BFTZh6FesRsM8U0mqPELHNxZtwQoPOmHk%2FuTxl%2Fx70kz8hnf%2FvXz%2Fy1lsGxhQHbrR0M4Q5KOvQjWlwW6d24sBj2OLzw%2BXI0369c%2FYPXGxO1o77XxAN09y8ch3aphmvL3MSn7OjXfLmfpHeUcvdyBjcWbVRrHHfmCl5QMf89nVLC9QToSNShSFWOlQuzt6TO7WlDJz1Q%2FzDrHCTMvoiU7VXFFVo6dsapwaeknvKcJUwcnZkUQ%2BRLjs6Ay2yLr6Dl4hv2H9N7qT7U%2FTEtW6cc11UPZ4g%2BOvABtuXgWHaHD67lT89pRDXwiraoTwJgSh0dj5I6Hv6Ecz0m69DTyKdp4CahlGHHt%2BUF2eVo%2BzTIi2njBRc07tG9ybkLlQbvkf4mUKY9DD6pAJbHgOPBbfAnDH0Y8lJUB6%2FKQwn%2B79zgY6pgEzz7M7uZIeyVhpilGqml8fmz9or7iNg4EuhUJ%2FoWR0fsOF%2FX2TF%2FGxLVEzcmiSl9I01caw%2Fi%2FY9sbcqmLiMmP02DTS%2Bg2n6z3uqN3TOE9p%2F4t0U7kwa6u8wIUeUlMQQvnza0uJyFcdWTREWYV4U34emJcIsTn4Y%2Fy6Qq7SHVPjrC8zqOI%2F8PJ4e6Bz%2Fc8%2FNc71fpvAE91I3wAGi7AyxqfIbK5Ii6RP&X-Amz-Signature=7522f123504e4ec7afa1de303c953cb2e7dbc447798ac8586db1f08c5ff759c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4HSNDU5%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2fQFAgqUP9%2Bmyhe1bRS6ZOqlj%2FyOrAwkxHBfthcyf9AiBSf64owfxlJ8kRPq8Die5NkF2JsaATG9Ryo8k7xfgnKiqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRnsE%2FC5NMvOJUmnFKtwDWr%2FfPXZ8lPB%2FN1F2U0kftqA1AxPbQqOl6K7I8WBkcUh8j5Bzg9fhtrIooqjy5BuEcqNEhIx36p%2B1y9YZN6lkY%2BVJtmwc9yTb2k6LmWsjlqpSrsfyqHJr9bNhlmDzYg6Q2swwfGNc8XsnOht509zyD9j9joyOuKwoLxZ9%2BdYjzQrouTgToe7tgvFPQryPBGNC78d5uCHj7IbHQisOaZy5OcSUTto%2BFTZh6FesRsM8U0mqPELHNxZtwQoPOmHk%2FuTxl%2Fx70kz8hnf%2FvXz%2Fy1lsGxhQHbrR0M4Q5KOvQjWlwW6d24sBj2OLzw%2BXI0369c%2FYPXGxO1o77XxAN09y8ch3aphmvL3MSn7OjXfLmfpHeUcvdyBjcWbVRrHHfmCl5QMf89nVLC9QToSNShSFWOlQuzt6TO7WlDJz1Q%2FzDrHCTMvoiU7VXFFVo6dsapwaeknvKcJUwcnZkUQ%2BRLjs6Ay2yLr6Dl4hv2H9N7qT7U%2FTEtW6cc11UPZ4g%2BOvABtuXgWHaHD67lT89pRDXwiraoTwJgSh0dj5I6Hv6Ecz0m69DTyKdp4CahlGHHt%2BUF2eVo%2BzTIi2njBRc07tG9ybkLlQbvkf4mUKY9DD6pAJbHgOPBbfAnDH0Y8lJUB6%2FKQwn%2B79zgY6pgEzz7M7uZIeyVhpilGqml8fmz9or7iNg4EuhUJ%2FoWR0fsOF%2FX2TF%2FGxLVEzcmiSl9I01caw%2Fi%2FY9sbcqmLiMmP02DTS%2Bg2n6z3uqN3TOE9p%2F4t0U7kwa6u8wIUeUlMQQvnza0uJyFcdWTREWYV4U34emJcIsTn4Y%2Fy6Qq7SHVPjrC8zqOI%2F8PJ4e6Bz%2Fc8%2FNc71fpvAE91I3wAGi7AyxqfIbK5Ii6RP&X-Amz-Signature=e55e8d3d26480bca55b960843fdac2f89dc2ffc0f15939fe8e3377b077b681db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466423YUFOI%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKYbkRzZgd3ghxOWvmSngpa1jTgv1Do4etm9YqZl%2B39QIgcg9Zu3LCuJIzSDOJTYr6xq%2B9oRiRL47F%2BFVDTt8WO9YqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEhcet9xbcUUJOQxYCrcA5WWecvMZtbNr3%2FRGhsMhLW7OFj2aNinip20zhbV70THhrAGevpMAk2bTDsM6essww3q4%2FfPAitj8hgCFo2GWeztw8IVmiLG8tAr4OYf%2BeCwU7GqiJEnXcxBvHioV%2FyhF46KzCJIhHhNJpxvYsLlPKE2XfFZd%2Br2AwWpqUjFD%2Fufn1LVmi3g%2F5ZIBe88xW6idV12kuvG3dxkALm5MGPUMBQVrxqVT7%2B6PeXUjE%2FsoAEOESvTg24ae1u30lyY%2BCp6g5PhOukKGgGL7ioZKMuHSfJsjTDdH8SURj7GG44YnwKpVyZClAbOmQIUVtsaahlA4Zr47Ko7F2y%2BCXAaeaTR7gsLlmreOdvM7M7LlKQs%2FEg8mQSRoDY%2FdRBdsxMwIdQRdHokV2Q6EkS44NYAbKk%2BdsLNraZ%2BSquoQlPpwaHrgM5HwpOJnyfJ1WSApxT%2F2Kciipc0VsMQpkwBrBNb5IIIEQ0WMauHueit9yT%2B7lkNQVx1tZcOLDYS7lSBKFLdFyq2%2FK6LWt5PHPCkAkmhSwSZtw3bdIvRsbnCnKwylg7n%2BJ%2BK6viE%2BZSPeeNBnGFi7iVusqnXrB1KmlYmhMPvCQ9%2Fvkbl6TNBvdBpAroZjFoYdw9X%2Fn6aLkvNsvBYiewhMILt%2Fc4GOqUBdi8AsiXtuIGZZsfRKuOiHyHxqguNeLstFoMtepXOKtD24lERgtLC0SE9QcrwsU2rWK%2Fx5pxKfdOxQMHn1aSHXRIAjGSqbEd6RNpnhHbh6McIY4x5n%2BLGK130FUQ1yksl4cgWRf1c5KWc0FFheMBN8jttLlUYe9oIsJSixwL%2FOG9r2R12zbDEhefF9F9Gj%2FY1pWa%2BFAKysQv9Ol8pE4H9mXA41yhJ&X-Amz-Signature=02295485425081a0280fe95467f9c866884a2c01149ea5ef8fcfb84bcb0ccedf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YD2C7RGS%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIByFqG8lwJZk30nf2i2STVKmA3KZamTywDU65X%2FRFXaVAiBLlM%2FPLZct7%2BaE9ATBE3IDw5wE5mS2DafjuTAxsNOJoyqIBAik%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLur6zNaJDbHONztGKtwDMimjmaBgXw0S4PlPiIKK72fq%2Fomfih%2BWEkq4Hsghy1fc5YMRWgvc88o9Isz5PLNqZf9Nz8dGMW8kuzH8IROz0MC1fBvvoZ%2F6KkDScZPNpmy8alqwntpIzsRtY3uP4UHZ11FEdGxg6RVKBYggUs0LpSiyFBO6NB30rSkDpYrog0gJR5LITAcuRWaNz4m4LWMUu9N9mnaXUKWc0SRpt5ErOEhct7U0O2lSFiGA2mjIqOpktnN%2FcvY%2Fl7kXsCPQ8f05sHfprDZ9h4xozgwHk3HMupbzvflcoRIg1d9NFYtPHR8Px9NN1dJ5IozPUuFSVeTGL%2BoDuEEil%2F7JrqUgXKuEfYY2VjuFuyw6pohf4O%2FdTzGKSl3lVO9P1pa9BIiBsNYcTtO%2F%2FEJdHsMmbAxdURU3%2BjHN5H4Iq6QWUpASGYbBj61bA96Z1XtsLlelu3FOaDOML4Om1afhIA2V2Hb25MNzHpw2cvPTmV0Pm81WHTugnNEDN1xihhP7JeieRIDxfUkF30n9QSu2zu7Omy9TXe0Ustrz0o%2B20sHwDK5IoLyBksNqshCP6G%2BvTcwzgwCT6xJBHOitrSdF4ecvsmI44sBvTxyt9w4F%2BoxN8C7EIaRRDQlsUAco8AI8%2BP2TQ4Qwx%2Bz9zgY6pgHfxjiQDbhJoasuPp%2BXWpIg3vOYkv5vTZvaqHvnxF5Lg2m7JFfSoRNEOHO7%2BtkRHpBTqAySkT5G2McwzPUDHesBsfX6z5I7CQ1rMoYS31ha99A%2FpTUvBuDtxWKO9kUaxcHXax8NWtGeLzdiyVEeEkkBkWTRm1SdpwGI08zZCO6pTZJDBdIdSh4I%2F9UW89Bdu7S4WR%2BEBBOYh3Fp9XsBpa9Ym0BmhcCH&X-Amz-Signature=a693d0fd5b32c6b42a237a33fa13a7b42baeac4e7e32cc7ee82036745c3b249d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOKIODC2%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAEaJA6SjrXFolZXPVt9mXyFKxC%2BbphDLmWkuiFPIzBUAiEA9NY0q6NRY5WXJAFlnf5c5xtJWiCDSYghMKJlboOGpKsqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKyKQlSJ2wr5XED4byrcA5srrgJrnkbT2vnervcIOlkjWDJkYVaLuJv8BkQJOXLiw1zxjq355hvX%2Fae5mSgpt7st5%2BkDa0Pu%2B%2FiRszRXmlW8UaT8eFaVVSioHm5VPPZJe%2BVIIrrgTYxsrtcqMuT8XZaOBT1FjmUK0GaNsLeShwcV2j36S6n3Waud3n04Z3c%2Bel1WVDKA1MmWUfytWjkLv%2F%2FsEmmHHvewEGHWW%2Bg8gHdcsOOnJkWuhhVeg9sB6diG8A7sXhStESKqUJNFNKyHznlm27b4ETE8191ATAGj92V10vNHFslH9agPF9jZaKy3jIL3qp9OHgbpy70VDf%2BTsbALU5ifuvRoOrfq2LCqymyorcAmrFozGQfXKeDsEfdqmTY%2BN9pdydAeGv5KygP38wnstKbnU5BbVTvUHpil3W9b2iPCwh3s1QOPWRkrH%2BEo0o6CNgdFVaV3fbiHGP%2F1aryj6qK9TZDZYoIa%2BDk2UVFKA6OBWHB%2BQE7rgCBkCSRYAnPFid%2FHaOAgwQLqDT6EHJ7lI3VMdx8Wh86t2zuDkybSX%2BRi4Cv19fREuI8q04ZWePwrNsYLoMQdR8s9yZe3ypxtNOFu9o6MReGQXY0riAQQ28M4RRbSMCxgUEw8C%2BV%2Bf7076i3fSie2bWSeMJrs%2Fc4GOqUB%2BnFtXsRwHWy2BScKd8TsM4gqX5FroD50oJ5ITkWcrSS9BCg06fO1TuUKYL2zsgMGd%2B%2B8L8bsZ5OdCovwzYU9uMbpB7SoWtRHR4OrRjfdcs8eU7MQsTR%2FvYaX5QRS%2B1iCl%2BtC5dhNddHlBYaR0V2zys2ZANBYnkNnuD%2FbHT0csvmgwPuHLEo%2FByTYr32USfn2RnFe%2FePMUS%2FG8AYWlskhpuekP4SB&X-Amz-Signature=d4f1dcffe22ac1b89d5b5b679be3f2a88b87566938270f1f7f9805b52ceaf370&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643FQY5PS%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIANkzs6%2Bwre0%2B8mvnhwh6wizp2f4nFLOuFmgqJlPhl9bAiEA7bxT%2Bl5zitBGw8C8iDTp4QzlWd%2B5hKTk%2FZfk73OHjz8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB4NQYAVVKDXb%2BmB4yrcA%2BIBdQ8MNchT8cy3CBO6kmuO%2FWy%2FN4xHsEGfT0hI%2FDg2HQcRYVT0d%2BWymC9Z9X5CzWaHH%2FaAihxSO86l9sh3INu4L8zlIlXw%2FKO5U0g7eYgYT%2FzkoAIpR2ccv4RPZpAARsOFlge16IFYGAFjey%2FT4sIv7jUeqSWl0NDnGjmKPWjTjuapHInCg6Q%2FMGEdUBr98Lh1X9pZWN%2FOFX3UxdjURbVGnrmx9Vxa2KRcAfbQnhM8zT1rmOKjR1008wCeFHu%2BmUexhaGKb1EQNMzCiaILcsze5pjBzSpjd2X7KqmHV5JY6nJSVcZMu3ucStdVIh1%2B9nzvr7EK6qi7TDqzAvjCXab8J%2BhBBiKWepQro84XE%2BoxgCuEwORP7Q6KwTYhu5EJWVLHbEG%2FJGAR7MmudgphcsmCHwFpLKNH0nKpTeXpfAI6xJVMiqBnXuoJ%2BRkH5JJ3kXLP8T6TUDfWmlWWoRGYpGXx8a%2Ben9lW3rVP04J0l1k%2BeOaRSIrLF9Up0OtC9i59XBBBy0myEnqV3foy2R%2Ff3DReBrE9Iwf0nvOzwoHqKxZpbTJTo8YhPC0HpFeZFe3fCYh1ci386cykqx%2Be1tUx4nHRtbiCS%2F%2Fv%2FSQkIQ6fbEtEq6X%2FaP5lsrd%2FT1qOMLHu%2Fc4GOqUB6GOgblUGINPc%2BquXnbPvwNaZ0FN5Ilt4UKaz9xSlNRfqARyn%2Fe%2B%2BMjamB9otEExnHa2yJUipxVZ1Qy%2B8uhP1DUXbDsUD%2B9JbdgmwhUUoaqDx3x9TUE6W%2BAZckuMZbgUDbAvxoipNefEcACPJRn0CSn3iIGVW%2BTXJjTkppnhL21hIi0FHZurUKZuPzVz68JEoB7WBLmAkL%2B%2BQqKEQ2wXaNhtGEsvm&X-Amz-Signature=0ab73ecbc32bb91e5efb47b9bb9fddde80e8e5ba91f0be34f607896e8642fd97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643FQY5PS%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIANkzs6%2Bwre0%2B8mvnhwh6wizp2f4nFLOuFmgqJlPhl9bAiEA7bxT%2Bl5zitBGw8C8iDTp4QzlWd%2B5hKTk%2FZfk73OHjz8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB4NQYAVVKDXb%2BmB4yrcA%2BIBdQ8MNchT8cy3CBO6kmuO%2FWy%2FN4xHsEGfT0hI%2FDg2HQcRYVT0d%2BWymC9Z9X5CzWaHH%2FaAihxSO86l9sh3INu4L8zlIlXw%2FKO5U0g7eYgYT%2FzkoAIpR2ccv4RPZpAARsOFlge16IFYGAFjey%2FT4sIv7jUeqSWl0NDnGjmKPWjTjuapHInCg6Q%2FMGEdUBr98Lh1X9pZWN%2FOFX3UxdjURbVGnrmx9Vxa2KRcAfbQnhM8zT1rmOKjR1008wCeFHu%2BmUexhaGKb1EQNMzCiaILcsze5pjBzSpjd2X7KqmHV5JY6nJSVcZMu3ucStdVIh1%2B9nzvr7EK6qi7TDqzAvjCXab8J%2BhBBiKWepQro84XE%2BoxgCuEwORP7Q6KwTYhu5EJWVLHbEG%2FJGAR7MmudgphcsmCHwFpLKNH0nKpTeXpfAI6xJVMiqBnXuoJ%2BRkH5JJ3kXLP8T6TUDfWmlWWoRGYpGXx8a%2Ben9lW3rVP04J0l1k%2BeOaRSIrLF9Up0OtC9i59XBBBy0myEnqV3foy2R%2Ff3DReBrE9Iwf0nvOzwoHqKxZpbTJTo8YhPC0HpFeZFe3fCYh1ci386cykqx%2Be1tUx4nHRtbiCS%2F%2Fv%2FSQkIQ6fbEtEq6X%2FaP5lsrd%2FT1qOMLHu%2Fc4GOqUB6GOgblUGINPc%2BquXnbPvwNaZ0FN5Ilt4UKaz9xSlNRfqARyn%2Fe%2B%2BMjamB9otEExnHa2yJUipxVZ1Qy%2B8uhP1DUXbDsUD%2B9JbdgmwhUUoaqDx3x9TUE6W%2BAZckuMZbgUDbAvxoipNefEcACPJRn0CSn3iIGVW%2BTXJjTkppnhL21hIi0FHZurUKZuPzVz68JEoB7WBLmAkL%2B%2BQqKEQ2wXaNhtGEsvm&X-Amz-Signature=134a1370a44f75c5f40b7edfc1f7d2197c67aeab9b9892e873cb8d6ee0b893d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HB6GJMI%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIASspJh8uNwZJXX77Dxs2GO1kuEDo78ZoUHG9K3ki22aAiEA4ihVvD%2FXfTSpqwCMD0gDAmMKXNFVAwUvALBwJtwi3BEqiAQIpv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFJppjMT5XeBoScA3SrcA26QquNfb9NJmxGIF05APDgSWh%2FQ1BSTD%2FEZwIjdjHD1hrZiBvZCjvnFEsOr8YXzTkCpoAI%2Fn96fNbS%2BE2kWSNz361qX5rymFrkbme%2BrP17lG2xZYrI51D3yzOufcXHriYvMT0Py2sxeHoIEoV%2BmBzqmP8LwjgOG958yR3TdQbsAoB2f0srubkJYZLg%2FkImgXn9u7k0L0Pfba%2Fwac5kFwwjIlp2SrqOuCK34NLDPN0WHLrdX%2Btl3fHLyIxxbhDetGx6YWFR1Tmf4bbUEcdiQvRmlpxdktbkSOHywFA%2B%2FAJ3Bz1grdV2WgcHdppJkpLFs4x4eY4j9cjOqdtxhIXNHtPQG%2F3JDjEKfA4i3Jb3EzS%2FAEckh%2F9HwNX42uuJcKVLI3RESNGCiVqroDDvvIJMGuRMMZ1B8d98zeciSW6xdz%2B85xMEDNXdpIEkrgUD%2BcIeqYwpcF47op2KXux1ZTAGODPQCfE4X3Xqv7T0xfcb%2FOMhL0D%2Bt0bAYagUmqeZSS4nCWBKaKRJAtPAKj2h%2FOA7hs0fyiN46RvEcZNCix0dmExWlPKUViZYO%2F6kQetL9stLaEA%2FkVtxe4E%2BvZBB0u%2BVEHfeT%2FgJ28VrRc33kHpYp%2FKxLl7htseshlfsgJ4W7MKCN%2Fs4GOqUBeLVxgclbSTMv0xhuEXbit5KImzE%2B9ujKJ8QSdbxekIfm%2Bm%2Bk%2B3162YfA%2FFuGcMAZiqb4MMwSL8361N71hFOhXtZ3cG%2BVFvjR4geR1tb5wWY6Xc7zM2%2Fz%2FTvU7m%2Fe%2FpPuKir3vI5qo6v2TvMjRE1u87DXeWFfvLiKhmVwPCKTsJpTpPQx3aHraVTkrVXAZgAf76BmzoBexN2FrFXQz%2BoIDp8%2BHOsE&X-Amz-Signature=18644f329fcc57e8f5b907684805bd7ba74beef3d4e1a91209ac3cdda55147ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEF3DXT4%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHniYtP56GWmGH9%2BlH9wzg1qh5QQDMV4ACQ5W0656XSiAiAmDPJTmCGlvySV4LToNN%2FG6dpwPulc%2FPTA8UB7sXk2qyqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4ufF%2BJIqM1%2FhU0QVKtwDnva6Jwg%2F%2BmnQzmxkLtx1waDwe7IZ3VhfORnPTPSnd9ANNVNvUfF9AyXFdk4taTwIx3UFSj17rLfEX8CgEWGqQkZ7DAUTKMFigmTl%2Bec6aBNsFVvP667c2DdxJD9AtLEZgSxuMoG0PmmpHVsgGGS%2BL1GWLWP7vvNU0V5AYmuPbIAp4RGfbh160IZRoNH3Hpbk3G%2FG7dzT4d%2F400bqIcxQX90HsLdCB9gpjKRvt24ZlO2RazWtpbeoV7J9JbwWatWEbN2gG455kNlBYSown7NLdvEjUJzWWGDq8rRUcuqMkR7rZukUlJuCHIUJN3plBKf3PDdWvWe3gLzm5mEM1zHBW2qXMIA61sRUa7KzF2OSikcGaGahlUW57buv9oK37MpYkEbjDULuOUqrL4%2Bqvzg1N19Z2i2Gul0OTtpyh9GgprBbZoVc%2B08riwOEbCo1bNy3bJLoV2Zd68NbBzmr406Tyv2Ne17bQc%2B91IDiYK0FHtlIgFWYPmijQuEH0TE2vlwfqSGNxMSjv0W9lN4WIqQFULCetGhp%2Fo1a2Th5j39QCoxXSMikKWZqOyQI3AfM4M3OWANyhJRagSeS%2BkWqcyAmkkdD8ZyaPf2nnhQ%2BVDdPkr5oERcfe79vBtZ9RnYwie39zgY6pgHe%2FxyPhbMxOrsUJ2BegHboFgXYEg5UFZzllI%2BFU%2BSXcp8Q%2BJl%2BMU9Yb6Ti8R%2FkOZWwAnCuT6%2F%2FObF3DvZB90cvQ%2BqK4BE4XrsT7VQhAkx2yzFimERtoZqeblxjLUmbhVAfuPiZrP0M4hfQ0lQeM%2FPMJZEg7Kut0coqKMaW8tNQym3cpO3Irs21Q%2Fz1vnmtL91cYeVu5xCNiLWBOzBZ85OrxrLul0is&X-Amz-Signature=bfea8ddc4f617d31322812d668b8bd0271e7c1f71917ee8d7d31e1c05608bea8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEF3DXT4%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHniYtP56GWmGH9%2BlH9wzg1qh5QQDMV4ACQ5W0656XSiAiAmDPJTmCGlvySV4LToNN%2FG6dpwPulc%2FPTA8UB7sXk2qyqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4ufF%2BJIqM1%2FhU0QVKtwDnva6Jwg%2F%2BmnQzmxkLtx1waDwe7IZ3VhfORnPTPSnd9ANNVNvUfF9AyXFdk4taTwIx3UFSj17rLfEX8CgEWGqQkZ7DAUTKMFigmTl%2Bec6aBNsFVvP667c2DdxJD9AtLEZgSxuMoG0PmmpHVsgGGS%2BL1GWLWP7vvNU0V5AYmuPbIAp4RGfbh160IZRoNH3Hpbk3G%2FG7dzT4d%2F400bqIcxQX90HsLdCB9gpjKRvt24ZlO2RazWtpbeoV7J9JbwWatWEbN2gG455kNlBYSown7NLdvEjUJzWWGDq8rRUcuqMkR7rZukUlJuCHIUJN3plBKf3PDdWvWe3gLzm5mEM1zHBW2qXMIA61sRUa7KzF2OSikcGaGahlUW57buv9oK37MpYkEbjDULuOUqrL4%2Bqvzg1N19Z2i2Gul0OTtpyh9GgprBbZoVc%2B08riwOEbCo1bNy3bJLoV2Zd68NbBzmr406Tyv2Ne17bQc%2B91IDiYK0FHtlIgFWYPmijQuEH0TE2vlwfqSGNxMSjv0W9lN4WIqQFULCetGhp%2Fo1a2Th5j39QCoxXSMikKWZqOyQI3AfM4M3OWANyhJRagSeS%2BkWqcyAmkkdD8ZyaPf2nnhQ%2BVDdPkr5oERcfe79vBtZ9RnYwie39zgY6pgHe%2FxyPhbMxOrsUJ2BegHboFgXYEg5UFZzllI%2BFU%2BSXcp8Q%2BJl%2BMU9Yb6Ti8R%2FkOZWwAnCuT6%2F%2FObF3DvZB90cvQ%2BqK4BE4XrsT7VQhAkx2yzFimERtoZqeblxjLUmbhVAfuPiZrP0M4hfQ0lQeM%2FPMJZEg7Kut0coqKMaW8tNQym3cpO3Irs21Q%2Fz1vnmtL91cYeVu5xCNiLWBOzBZ85OrxrLul0is&X-Amz-Signature=bfea8ddc4f617d31322812d668b8bd0271e7c1f71917ee8d7d31e1c05608bea8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TACC4XF6%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T125106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkNAJjfH4MXJO1u5xBkv0dsZZlUqmnO%2FR%2Bzf5ma%2BLGRAiAkdIu2Ijcmh0FNophPpj1mqYPT%2B07ZPVkeA62Jo8IhyCqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZkLpFnKQ4WIEaMU7KtwDqO%2BdgE8fNEORMktFjKIELhBu3r8idZIyPEJi4POSLqxJ85%2FBupK0AhYJRbk9dw1Y3uEe4ZwsqwgAa3mAxny9DeDTt1ogRuo6NKLWwJcURqydMpVAp9oB3EsDDUS3H8YiNaCKxho1qJV4XV3GZscVyKPVjlO%2FhZpJMj4%2F09dY6d5WcNnwq2OqkvVBDBF1yItno2dEnwzU3PRlHWcl5qXCGyvIvq7gKfSFzQZGOYO2knkE8rG5%2FvImSwa6KJbCDQ566e%2FKbQDsCGribHJVICllcVWLGxlPh1eW%2FpvWRGPNBcJ07g3KHzScx%2BUi2GquXG%2FqaAEwbmrxAU9%2FRV%2B2MZa77lRlA409ynk3Mv90KtYmJGXVabIy1giv%2F88qigvi4sj79kFZbEup9VHjsEcNiHqL0JuGZYz0mOE%2B3KOz%2BeIJ0wCRIfZAXEM8m4X781YaKDkUlzJ8MwTti6GO4cE91PTj2BAjJplN%2F1iE5QwkDVNg9eMuoCLGEz5s0DeGb9wQ4lUkY3tPlsWuiewKW7h0%2FclasmafjRlXYAjG15dXh9vNZWAvTBMeZWieRKkSZgoO6qSLsHusgdTIsgfxyexIioF%2B2nqtCaPxvibaysVwa8QW8TD8f9OHzEpmGrxSwvIw1uz9zgY6pgHtY2DL0pVyTBpZY8EJ%2FBDoySQTFCXLqemaVYsyJOhk0QJ3QClFUCrwvKyrVVufUaKUk1EJhv%2FLVQBOMD5RuhAFXWlUSnbJcjHsEIiYo2Ven6LXAMBkYDUBKhgIHRCPeMoZQ9MTKeqgdkO9DQF%2Bf378MUUmuzShY21BVFBff54UYgVEqujAkv8iTu%2BbEXYfNjuw2z3XT4A8Dvcs93EKh25SrwLBu5oh&X-Amz-Signature=f4189458c8bf01a20ee72831bce336c75eb1c28c59ea111a342504d344d66e8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

