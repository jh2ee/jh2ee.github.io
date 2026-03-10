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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5WGTLUZ%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQChdjBBjmSs0OWlwUu4rcpMxxqEFOAK2zyuBWuE38K2TgIhAIubP4VaLsRsOvCDDOZ0vF7dnAeu3kdZkmvD%2FAQ4buCWKv8DCEgQABoMNjM3NDIzMTgzODA1Igz0zUj5bKupRUADT1wq3AOqEht8vC7KPQNFxaUYj1zQbJJA2lnBHzU3hndqf5QgeWEMh%2BWRp8Z%2FjR7MIIajkPyjlqF0K3TjvvbINFICu8bfh2jvENrBwSCLAJm9nmdz%2Fvi6IpUlwe2Nb6tEnIwiRsbpYcvMV2oso2Uu1PoW0bOP3N5SOlXyu2dYSm%2FNptBCecTq1RLDPorVu56NpqyEzTazgt7ijj3zmPFpKL6fBDYVIfQTFhAK0ozdZ5OqxTufqxr4KUoC8n4MIAJ8wO3t5kzw4LRE2b810IEt3pPYgSEHDO97zsHMGfC7KKeYmJgY%2BVvePVsyYuW9maPV6AlZGhG13WnzXxGhQ%2FV3V%2FrXAX1coFwR84d%2FqxtertVi0veNSfEOwIYvs3u8Ww%2FcXax0YIkDYm57J2veowjRP1%2FEh1dXqkX27sDQ3%2FE5PXmEF99KGKiOGISDT18%2FuRILjYDDDbFykqNpUB4DhecXTJXT8HyG90mthga7OEqnsMUTpXrOsN2jEuZ8HWkKrGuO04NBeKim55oXxDhWwXJPlctn%2F04PXdKmncZEsWYFqq1waRrB06gytlxsuHo%2FrZlzMaaYJqLdrWooTkjpDdZn9R%2FXUhhY2gGhugiqBuv%2FMLZT2PvgJSEaha7rSejx2y%2FFHTDL1sDNBjqkASUQNBR1oobf1RHQzJqcnlhiIiAsrYia4VdTynBa5Q215cU0b%2BQfRjo3U5og%2BiGny1HCSNucOKi7wvZ8F1sQ64UpHIAhzdKSGprU%2BSLBpAAo3gb%2BsVx4iZnBbXU%2F%2FJFitIzl9Fd6ld1pGscrrB8FEcowlKA95rmZ8mZZbSJT8fAvxuqvr2JbWpKK0PPGBbZqZjEiCPvzBZwgMDx73Yprz8Vbm6Tt&X-Amz-Signature=26239d198779f6046c171e715fb973ef495f41a5a4d22f00e6d48924832e0fe7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5WGTLUZ%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQChdjBBjmSs0OWlwUu4rcpMxxqEFOAK2zyuBWuE38K2TgIhAIubP4VaLsRsOvCDDOZ0vF7dnAeu3kdZkmvD%2FAQ4buCWKv8DCEgQABoMNjM3NDIzMTgzODA1Igz0zUj5bKupRUADT1wq3AOqEht8vC7KPQNFxaUYj1zQbJJA2lnBHzU3hndqf5QgeWEMh%2BWRp8Z%2FjR7MIIajkPyjlqF0K3TjvvbINFICu8bfh2jvENrBwSCLAJm9nmdz%2Fvi6IpUlwe2Nb6tEnIwiRsbpYcvMV2oso2Uu1PoW0bOP3N5SOlXyu2dYSm%2FNptBCecTq1RLDPorVu56NpqyEzTazgt7ijj3zmPFpKL6fBDYVIfQTFhAK0ozdZ5OqxTufqxr4KUoC8n4MIAJ8wO3t5kzw4LRE2b810IEt3pPYgSEHDO97zsHMGfC7KKeYmJgY%2BVvePVsyYuW9maPV6AlZGhG13WnzXxGhQ%2FV3V%2FrXAX1coFwR84d%2FqxtertVi0veNSfEOwIYvs3u8Ww%2FcXax0YIkDYm57J2veowjRP1%2FEh1dXqkX27sDQ3%2FE5PXmEF99KGKiOGISDT18%2FuRILjYDDDbFykqNpUB4DhecXTJXT8HyG90mthga7OEqnsMUTpXrOsN2jEuZ8HWkKrGuO04NBeKim55oXxDhWwXJPlctn%2F04PXdKmncZEsWYFqq1waRrB06gytlxsuHo%2FrZlzMaaYJqLdrWooTkjpDdZn9R%2FXUhhY2gGhugiqBuv%2FMLZT2PvgJSEaha7rSejx2y%2FFHTDL1sDNBjqkASUQNBR1oobf1RHQzJqcnlhiIiAsrYia4VdTynBa5Q215cU0b%2BQfRjo3U5og%2BiGny1HCSNucOKi7wvZ8F1sQ64UpHIAhzdKSGprU%2BSLBpAAo3gb%2BsVx4iZnBbXU%2F%2FJFitIzl9Fd6ld1pGscrrB8FEcowlKA95rmZ8mZZbSJT8fAvxuqvr2JbWpKK0PPGBbZqZjEiCPvzBZwgMDx73Yprz8Vbm6Tt&X-Amz-Signature=26239d198779f6046c171e715fb973ef495f41a5a4d22f00e6d48924832e0fe7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WWJ3R52%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDOotGBW3mQ2y%2BoGOWOtT3NTtu0sUPcBr%2FrmGIqlNYjJwIgZ%2BWeKT4gC5uOFa%2F1WH6661e5gO5oNnlExgsD1ez8yHgq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDO4Ux%2FIzBrGcG1%2FIIircAwXvkYyTTBe7guZNWkiCczCrdmCxyvdMZirPLSPNHzsA1JUZdscHlK%2FK4uJsT6Tv%2Bb7yxgskjyo0Vu4Oc85uPlIznXiorcyeXWfPOeqkm0Axu99y4v2wTn5wIG97eQBKVm1FpYbNz3HAVLcCVyHDrHTYX8kGicHwhU0MKvOqzB4612EMkdyiCY3TFSeGeWBH5bf72jXn7StfRntScMJcXgMehoeQNHYFvjpFy7DvDAu%2F1XesnZtQpSyHjxsGZ%2BbXnTjv1zPMoj3XLfptnFXZXg5qeRRXcE4%2FLUlsdpsjSno8aLnIBW0VYFt7z%2FGsHuJVHNXBQierkqK2lJ%2Fx6LA50sAua8lLjzmhEkr%2Feibhzp6j3Zvf%2F%2B1vXCCiycAXa8KKTG4RE%2Fd8CNUyw9Onl25ywqgO5rCKwl26XFmN6Lw%2FHtH9vHP1LlPKS9hWqdbGyTqKQoWsI2QaaaWGIK23uleUkvAQAbkF2Q5D5Iq%2F3zpKhxUokQuzBAmITiiszBO7MMEFH32oOiTu7wXduFFSvjAP1uneRwCgTDrlZzHiMkVN%2F%2B12G1bVJLII9BoXmAuTprJwWZHNUjmZjCjrWi0iuBFzsnFPf7EaxtLvb3B5yyNR3RYIZLYFR1eY%2BTpajGA9ML3VwM0GOqUBfxcVYv7qQWjV9JVaKxSq85kUKOOGTFrYUlmCvegUosV4AjHlgO%2BlNPT%2FsiisN7l3cjwXS29GQnW6rokcCAVhq7M8oQeOLKR%2Fc3dFj%2F3ElhR%2Fc5lF6S%2BnMVrZg76XPH9H3tgi5%2FZwBj49ypoRiAulrnlJSbDJp2kVl58tDESbEe2WcXLiuyEecJ60VagpJf%2FgWm797N55Qwp9CxsnmOs%2Ba3temN2W&X-Amz-Signature=7d2050182281bf8858eab32384c0a0a9788116be091edc0c488ced04659977a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4N774EM%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIGn0c7j1bG464cqY4fyXEDJNF4vwyfONcAXLeFMxuENyAiBB1h7ZAgHaIhp1I%2FnATsROkFt5BCoHmR5sbQPpWNYoLSr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMpErjHQsveEUFRSxKKtwDGtylHReoUIMETSTserbR%2B%2FaIpj7K1BJgJghZW1KlP3ON5P46%2FRsS8DgcULwZWHjt8aS0bFknZlUSVKRUfV5xZbeBNfR8i8J4byynrwOMDtOCiaMfjfXbfjb00l5be%2FJAv1d0m5xtSC%2BVP2uIPOck0nKURo2o8hEpJVoX%2FefUiMrMNzxSBrGbmtZevfi9EpF1KTrLtdIUwoLR8h9nD%2F5GNdEVFFdOiWXOd91l%2BEki4yWef%2FMe90g7HqaL5NW5GjGiP9Wt88MBUHmHE8VfkH1UckHKF5024uqYmdiqD9T8GjkkHWaigZttS5n%2BckSoiVGqNo3Zuw3eXAfuS8hSbGhlaMhKxf7K8WPGTatqukJy2iwKyJbe3KTAir7veOYP3IPmv4ItsRqb4TH5YTwpz4z61xoUuBHdU7YsMNhDHscKdol40eUBpfzc2vnJaZ9nJtVn8XylaGUhuOOM3Ai09NSdVILo6%2Fi%2BwwdJYfS4DpVmO460SxlGck22lWhHHjBNn0eDCjH4Klutvg7oz2tFVgXUs%2Fr%2FmHOsech0YpvEnUFKB4BscalkhcVAVfOom2vKbyQr3dzkIWDkdvcciUklSxqzdYOxlJPGCVAWJogNEMkvdo5wBDDebObmDCKA8jQw4NXAzQY6pgFqfJ9fLvrFyFoORtVAzVEuz3%2BgZuZRM6c9bllLMmPssfrZ3c1W8JBoSfSohnhroo80A8%2FwVBPj5AopulY%2BFDysEShh%2ByIM%2FPBB8oKheyYv7ileb%2B0giBV65Dx7s7FNLPRaZSqTkksbYwKN5aKPGoEGLsfBRmbqC7BvmeNehqPm9%2B0p4LYk8H5dUKkMRnx%2BUqd2ybQ90SnfTbmYeyUP8h%2B15o5HEit4&X-Amz-Signature=cb5e56736621d0b209733c3a6ed943981bc11db0c13f7cfb918bac00513090a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4N774EM%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIGn0c7j1bG464cqY4fyXEDJNF4vwyfONcAXLeFMxuENyAiBB1h7ZAgHaIhp1I%2FnATsROkFt5BCoHmR5sbQPpWNYoLSr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMpErjHQsveEUFRSxKKtwDGtylHReoUIMETSTserbR%2B%2FaIpj7K1BJgJghZW1KlP3ON5P46%2FRsS8DgcULwZWHjt8aS0bFknZlUSVKRUfV5xZbeBNfR8i8J4byynrwOMDtOCiaMfjfXbfjb00l5be%2FJAv1d0m5xtSC%2BVP2uIPOck0nKURo2o8hEpJVoX%2FefUiMrMNzxSBrGbmtZevfi9EpF1KTrLtdIUwoLR8h9nD%2F5GNdEVFFdOiWXOd91l%2BEki4yWef%2FMe90g7HqaL5NW5GjGiP9Wt88MBUHmHE8VfkH1UckHKF5024uqYmdiqD9T8GjkkHWaigZttS5n%2BckSoiVGqNo3Zuw3eXAfuS8hSbGhlaMhKxf7K8WPGTatqukJy2iwKyJbe3KTAir7veOYP3IPmv4ItsRqb4TH5YTwpz4z61xoUuBHdU7YsMNhDHscKdol40eUBpfzc2vnJaZ9nJtVn8XylaGUhuOOM3Ai09NSdVILo6%2Fi%2BwwdJYfS4DpVmO460SxlGck22lWhHHjBNn0eDCjH4Klutvg7oz2tFVgXUs%2Fr%2FmHOsech0YpvEnUFKB4BscalkhcVAVfOom2vKbyQr3dzkIWDkdvcciUklSxqzdYOxlJPGCVAWJogNEMkvdo5wBDDebObmDCKA8jQw4NXAzQY6pgFqfJ9fLvrFyFoORtVAzVEuz3%2BgZuZRM6c9bllLMmPssfrZ3c1W8JBoSfSohnhroo80A8%2FwVBPj5AopulY%2BFDysEShh%2ByIM%2FPBB8oKheyYv7ileb%2B0giBV65Dx7s7FNLPRaZSqTkksbYwKN5aKPGoEGLsfBRmbqC7BvmeNehqPm9%2B0p4LYk8H5dUKkMRnx%2BUqd2ybQ90SnfTbmYeyUP8h%2B15o5HEit4&X-Amz-Signature=826c4320dc3d9e14c9b2e8fd4debc06375e95a2b5bd5f26fb049aa6812c70d26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRQ2PB5A%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIDN5EHoC81kNLTXjlOWRfDp7RTcCBgrNl9OtgJ1mWRqIAiBENbydMkaOr1sSN8mZkck3OwiMr2FpO6LEu4oB0UJr5Sr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMblV%2FVaTL9GxQHsN6KtwDPxamyZI6M6nRIFitW9YpuWPos4SsONE83zzprD7dhsAX3BG6SRFm46IFVq8ArHZil6tYH3V%2B4gvzvqXYOoKtQbAXp6DavMDJyi7WMEcboervOrBUU%2FyWuNDzs1CqBwINQtsicxin1CDKIUQwXydzHLA5Rli5M7a55bguboPXILa81Im35LpXDdj6iTdgWGbnfUkjny6LoRsNfLH25619QGguNzCJkFkl6l25rDuBS0F64P4AL0nPvW7o62U2H3sr8GsaOaINjAF8YkbovX7DSFL2f3aXB75yVYInPMXIk4oDzp86O%2FmAStLN2xZefMGem%2Fzt414DP6zBV4UT58SrW4imkTNbI7JhwlUJzECxjh8Hl%2FQ%2BwDou4qwM8d7w0GYTpFRqnzckroFwtT9Dv0ZokY4EJaO0kST%2FE%2F6HDkVfoXScMROptJhcg2JiHrgQBqT7Zy0q1RTQTTjdodJlZx2tzxuRBRCs5LGWmFvNJ46MsBZJpbmOib9WgD4Wh96MTTojCjZoeCh2Iugf6nNi8KsusXIY7PePIV9OV219nTX0bCYZ5qVaqd%2FXgZzV3eJ2asdBmgTx0cMHUvZnnpmo9MgXw%2FnE50KGnlhaOh4i4bBFU7rQmc%2BN4pVUi6x2aEwwhNXAzQY6pgFWGt1AqxpSuf%2FsPhX1V5zrxGem26icELMPVqwgnZRdIgJvx8joG%2FP56bpzcJKJkvnYo6oppUe%2Bi4zbrkjQqKbMUVIkRa2vDfclgIm7PimeFddimCe3KQmecMPRwlLVOBZZTDoDA5Zs9VG%2F5l2xqmrco5ZT3Q5DIVkuh9RDm5khDoKu3VQs%2BZmrrg76aRd96zKMt0iIpoMt85yCz56UHqoeAeFenToq&X-Amz-Signature=c24c2a1fb59e181d8d6f87d81b5a03900a67badfe87e09ba902c689efff263b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXJS5VGX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIC1Pp4WX4tnVWL5a6LhcW7dlwH3mlFYC%2Fxn0zurhxe9uAiBJ1Txn0UOINQbxTVxdpTVEPS0zZq864DYZ1opxC%2BcBVSr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM%2F%2FIHR%2BX40AlenVtPKtwDuyJu625U1DCve5wegLT2ed3QRFq9EBacco6u9FIcE4PvTIdxn3JZNO5Ci47u7GK8R5CQHQGY09FuJ4knoZRM465wFSKca8HK%2F3VlyhoHZhvCkFwfgUYiFQqyGXMm0lVD0WNdmPr%2BG%2Bn%2FEr5R2%2Bbyd%2FW%2FqMQ80wOU4P4WlDbbx1GRF%2BBarjRIaUsTtxIOwzgrGOXOCEXWHDDOWr3qff6z%2BW5u4FZbjO869UX4mUrqOs3CrL4ZuhgAHvtfHpcjC51XEHaSYLD3k7E8R6Z4xVTD4K4wHEoyyn5M8Qcgo%2BeF1q7C2L8fD1ZTeWsJJJBu6pBbGzppgEiyKihB9Lap8AbeeLNLxW9YJdS2pnlV4eW1ZZNSRdbkDkRBYbMNH94qlWDffDQAinNhYNhrPV2x25wUuagv1qTgsSAneQTplAShnuFwCdT0YY5qiVm0xS9Ban%2FHURb%2FB87vEpGy%2B76YWB%2FglAxtPEUEYUFh72BREpMEirVzviuCn%2BxPBKysJMH%2B2xoW9eW3qrg0epqpUsIlb1mmpSmea9wtkWPiEHddg9xpI0j8ALFXzcNCwtwjOCB7B3zY%2FicxquJdI%2BxsvsAXNmlOL0db0KiD1nwbcfYk90L4sYSW8Uss5CMN%2BUbPUl8wgdbAzQY6pgHEH%2F%2Bd11i0WIzHV2qpAsDj9QXK8xdL0mBtAhe7oFNS7JdGF3i5YCYWTLU%2FCOn3zPM383qjFq8GSWov3hW9eYgaf1HFez3Z0QwjV0dUivOfkbL23TK9oRWsbpuWnkUMe5rfrtxu3LIysVwlTDW2y%2Bba8%2ByMB4xNqtHs%2B7S%2Bmv8NNwEV4n76qww9pgZI09mcnYYbeddSk1%2F1qx1uBqVMFNn5jwbjFUZW&X-Amz-Signature=f0c2a3c31e8f1649a1a4f38da31bfd605b55191c51844f0509f70f6b27394204&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXYJBG56%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDx855trKnLAilnBPHs%2FUw%2BuABVtvq78%2FB0V65zRtaDRwIhAKhTMSyGR7Ir%2B%2F4%2Fj28s8vDxXHwTtnZuwnjW2Xi%2Byp0ZKv8DCEcQABoMNjM3NDIzMTgzODA1IgwaSJnP4GD3IR%2FdDbYq3APlcgNU9qjOPXdP9KFrexfUJ1x1EIdoYT%2BkOBmkrqS0sM%2FJDvp7ESjAlrXqBZzp4zV056eQhWwAtXIYhse%2B%2BEDXxrcNe4Pdx1VJ65g9QQ8CHXLOgbSFwhqWWNcGQZk4OJUlPmEp12wTrskHdoPmXgCfNfVhvOP4w33lwRfyET7T%2BTJp%2FQr0qxsWABuZtzS7EjDiM0toHQ3x0hw0Fu35McOUlJFS0jY91EbqbiiF4KypfpZoXvvMVnVKF3eLH6tHtQWk5B7oMS3itnFleGw4fg60vzCkbsJ%2BqIps26i96yKtLyrYIRsiqMI1ok%2F%2F4YwB0b6LXVASewjw2tl8MkCcB7GCg07Rvs%2F5R2fX5SNaeKadOUTs%2FU%2Bfv3WSdZxYi5kFrYFIKdpoN3KmT0iN%2FgfQ50suQz7B5pQUsRa8BvSwBweLmv6pr9FTHD7bNh6CFgpZhGNLUH2wkS48X%2BswSskbHfX9hpnTlGkEblwr2w%2BrTMZoDSpKIMZZSiZy5tZnKZ27NBTLN2stt17XpS7aZA41%2FBr2KtJUM96RNWv8IQ0oywiXm1FACDUzMvFhYR91WyzmlOykdyOZdurKw9%2B1ICqOq6%2FjjL6QDywGQHD436otCCKTZWDq7Wv2KMwm%2F03tAjDZ1MDNBjqkAbZGXd6FNMlO4lOuFIlWHfPxsFCUVXTo402Y94cuNmYl1B3157T7m2s0DKS%2B%2FoQaMhYf5lLHVFT9THcNETYUPD7YZunLLd3e4Q9Hal8b%2FrF6BPOT4PIetAB7pBncAzOVdrc5IhxOwLLZ7aOKxjY1yh8R9%2Bbz7CmRkCUVnhjGBFGCSsKcOEHt%2FGMXT44N4oHhxSU21ApAsVNSUmSpnqe%2FgkQSD19D&X-Amz-Signature=c8943e28f13a8705b2f3ad623023bfcb91cf6219032713e68ccab905156322f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXYU7FRX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIBQQYo6VHgOao8zJho2W%2BY4DFUvRMsdxKKi9RKCO0rDEAiEA7qf98wmyceijuCt%2BiZqGZLhVc4sMOjWOs7N6WGUUOoIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDLTXXRqIzidYStKPoCrcAwK5uiUr%2B47OwbyE5VQjRYhiPdfDw1zhX1QcqSRY56b3kqlo4CG2WPcHU1xVR2kxJUy%2FrGZXiaIpLAAYFbBbXhalSFJX0RQHVMLehkYY%2F%2FNzAsAEHJAYR9HZD1y%2FpDs5veUkPKGe04zJ1wROaqtPZ%2BRzetR3pwYZY0BSBNGiPTYciHLz6eWhz%2BaIwdYuV65mc3aCj9M%2BhQXfdKeB9p77BOgVWI9gEs3zplGryE%2FXx%2BZULfKisRbTpsUcpCuzCrjYXzltVv8jkPWlXAsZkhoRpS%2FdIa2DdaXEzvbNvq4bclZuzRGDcrSK3G%2BxibyPas%2BIjwkZWbrXoUNBc6QHDa42lk3BSNOkhYb6kIuAl2zqZ2f7CcGK67co9Z1EdOAdS2MXG9hF2C8FDGXkXkpbNCPU%2Bo6funyNxsJWSHlkmFrFus06DAT%2BU3lhN6ECkG6GhaV6ny04GLiLY2zMHEMxfJsFlbDx7px%2BRIqsmFCfIrNfrhC6tMH%2BefpnK%2Bj8JWt%2B%2FxAFNMf55XJwuU0OOmkYdVSE3Q7Ljf6TtYTAU5lopXYdNiX2d1XIHNdBZo%2B0Ftr0aLcT1RADcUAxcBnzAPIk7loIng9DccKWBuMl6Ts0bLdxv03F4%2FD70ZezCcZScUwCMNfUwM0GOqUBJ%2BNHBzcMkfeDtEvrpxPlGzHIaXSQ6bM4RWpf3SfhPLsSLTwcjlGYLLDPpTLlqcYCZwrIJPxIknMJ5ZAW%2FtKG6l8%2Bt%2FMHM0osVBHkjv%2BRkr22bRaYfPBlnGdWi9qZJDAtWbFy810AOhJ2CmQoVBLXxjbGL3ynU8DChE5R2OBOA71kD0I47ql%2Fc1JtnXTAGIciNDm071pXoptPqRYV30cPIr6%2FJKQN&X-Amz-Signature=c00d6ce799a87fc702b7c5dbcfbc807438c7c29e7aab777bfbb9d583bfaff507&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXYU7FRX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIBQQYo6VHgOao8zJho2W%2BY4DFUvRMsdxKKi9RKCO0rDEAiEA7qf98wmyceijuCt%2BiZqGZLhVc4sMOjWOs7N6WGUUOoIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDLTXXRqIzidYStKPoCrcAwK5uiUr%2B47OwbyE5VQjRYhiPdfDw1zhX1QcqSRY56b3kqlo4CG2WPcHU1xVR2kxJUy%2FrGZXiaIpLAAYFbBbXhalSFJX0RQHVMLehkYY%2F%2FNzAsAEHJAYR9HZD1y%2FpDs5veUkPKGe04zJ1wROaqtPZ%2BRzetR3pwYZY0BSBNGiPTYciHLz6eWhz%2BaIwdYuV65mc3aCj9M%2BhQXfdKeB9p77BOgVWI9gEs3zplGryE%2FXx%2BZULfKisRbTpsUcpCuzCrjYXzltVv8jkPWlXAsZkhoRpS%2FdIa2DdaXEzvbNvq4bclZuzRGDcrSK3G%2BxibyPas%2BIjwkZWbrXoUNBc6QHDa42lk3BSNOkhYb6kIuAl2zqZ2f7CcGK67co9Z1EdOAdS2MXG9hF2C8FDGXkXkpbNCPU%2Bo6funyNxsJWSHlkmFrFus06DAT%2BU3lhN6ECkG6GhaV6ny04GLiLY2zMHEMxfJsFlbDx7px%2BRIqsmFCfIrNfrhC6tMH%2BefpnK%2Bj8JWt%2B%2FxAFNMf55XJwuU0OOmkYdVSE3Q7Ljf6TtYTAU5lopXYdNiX2d1XIHNdBZo%2B0Ftr0aLcT1RADcUAxcBnzAPIk7loIng9DccKWBuMl6Ts0bLdxv03F4%2FD70ZezCcZScUwCMNfUwM0GOqUBJ%2BNHBzcMkfeDtEvrpxPlGzHIaXSQ6bM4RWpf3SfhPLsSLTwcjlGYLLDPpTLlqcYCZwrIJPxIknMJ5ZAW%2FtKG6l8%2Bt%2FMHM0osVBHkjv%2BRkr22bRaYfPBlnGdWi9qZJDAtWbFy810AOhJ2CmQoVBLXxjbGL3ynU8DChE5R2OBOA71kD0I47ql%2Fc1JtnXTAGIciNDm071pXoptPqRYV30cPIr6%2FJKQN&X-Amz-Signature=a30621b475d916508dc29ed16d6e252a13768cb27369fd734547cd96d0e8f833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRSH4DU3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIFaPRJd7XYyjWluzZDlfc7mGNR3aYl4afmmYyfRoOH8PAiEA7aVdhLMsy%2BDAFMsTbnmluvfOYYlQ%2FqI4eSf5D9WWHDQq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDERwxxpbBR7mWiq%2BZSrcA5T77NqKDiTnCBPJVNpge7%2B7%2FUq23e1W2UUu823YAVfo%2BXdmi6%2F4TQ2w8PyCPaE8Y6Jq%2FfWvud60Kp6dCg09xFyHXSsDK795WmPUpe6gBPYK5wzK%2BjQZPsUgBT7P05R5mKnTu45ku1UiyNhLjw%2BQ%2BHVZ98gdfgbIcorarBFPVNSJwbLL60R%2BXHG4n7%2FgcllFIXtcRr30EsNjJcIGmxXTUaOoSA9I3Oc%2F7uue9KfBavxwvRT9Vne%2Bf0OVLm55k0d8052XfvIWevpJr%2F4T%2FagYwwtRPLOJAVgoki%2BHZXwRk%2FpD2%2BgTvP%2BhSLz0Pjx%2BhjXZ2IqScuW4IEg813mqPPEWBWB5HehcxM5JdSC9hWweMOoMa8X3PG1uJPRojc6a3qz25H48x980U%2B2g6Ud8ed1x%2B7OL9TTXC9BC9ssq%2FzCWmRSQmT%2FZfnJSez%2BDrwbd2giDEoXaVYgs8UBqkMlp6OX6%2Bint3e8jJ018HkPWcZx87PodXyQXDtntJdaebLZ8kDhWt67Hxjnf5FriYgmh7Cx3k55G9rbnx5JwD5eF6F2nTCrSH6OCLP4TyUKuCYQPpnCngmBs1ZW1kEZ2o5LqktQKH%2Fp%2BBoPj8sEiNdyUsoVAZztK6GIzCPGDn91A1MPeMMHUwM0GOqUBucWE5Ck55QY3odSFJUlLP7UX%2FwpNnnH6888xOMU3z42BHtYPkLQFK1oGqgc27u86XOdiWAFbTaeodzVoKZxuFgwBf3WotPLmuW0qHBXmx2B4FCE4ShS1tpNM4hfYlfs3p3HEMyCs%2Bml9ARrevzcGiYxvHX6%2F5%2BZY7Yoon6ZHBkwU2GQ1e7U81dFJg4U4takreCoNBnmBN9m%2FC7b9KBHfyb6XDaTF&X-Amz-Signature=662b7981609e31c440b6c36a8b0fdaefd30a6163c16297f7498b443dca637ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZD7XT7ND%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIGBSaC6R3Tp8l7sfdYwWN61Im8C3tslfePaqCkb%2FbPPqAiEA2knYHRKnrIPxRkYCUQ%2FV2Yu4TjaCeZj5PvY5bOpHADMq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDMnUf%2FNtt1tZ4Ml0wircAymdgewDES7HntOBVVtafHCFquoor%2B6f%2B6DsyESFcwSgcT1GTXdKmjMYDDo1tPF%2FKfxYz6z1w0YMvlo%2BEIQjuvK4HAn53IVk%2B6hCgCHcCexjrqETDCKFnFXWxXfGFuZ9IFlUD7Srm23Nkzf2wM4ZupawVuVLNjlw5PJygvE139KcFwx2LnGGEiGESOGxH1zKw6cfQN9SJ%2BkgmiHBY1jLTcrX1QCKvXTpy1X66UZVBGgxaJNQfBL3Hotwv5F7LTg9GZoYe4hsK34wkqgpVJmsDY%2FhZe7h%2BcU9C15Sb%2FSVxzArSC5iUY8hxFOXA9lqdPy1%2BdNIi5ETEh8nuFWQjZn00Y5I3NjIGvqjOlCq83oMbTOZwA6JXlKmXPLlmajBaue6fNR7gXwHEAHlk6L5d3eV2M%2FEQljYvIQs8HzfG48w%2BCFcKJ%2Bv0E%2B4zGySZ%2F8iCZfEFgPq1g1gfShkNAeQdw%2FccgHSKYHQvTWvy%2F2Yuio%2FdHNXn%2BqCIfQvRl1FRwLuNr8q4uTxWfWFSCyQITQ3u%2F2BCKVaSP35UPmb4d2l%2F%2FgyVmP5SCdUZSIJ1phHMPutvkI0g8Zlo8LExouFoDklWfx7fciI9XtmbllTdC2IHYrPqP6UafGGMu97zxu%2FTEf3MPDVwM0GOqUB3tr5z5twny%2FoVQ3L5FAOzWg%2By6Rcz3KG9Fyy%2FZXO4aahEMtvoYQePG%2Foco9UiJNpjOFYSRrzR6C4%2BNItYDziBEqKofmkuI%2BVFcobhZKPPLDvdGd%2FqLPuVM4tkLwln79ZGer9kQDSccfHxVht7AUtXlfrvrpXjXaPWKk3R9BrFFrupmcfZh5LK1Ozsy1TlvbTgSG7DCDCbp6pQoFiENJm%2FVwfz8%2F5&X-Amz-Signature=005b706c870fa943bff3fa270086649791a404a652f5f555486232a753a5278d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZD7XT7ND%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIGBSaC6R3Tp8l7sfdYwWN61Im8C3tslfePaqCkb%2FbPPqAiEA2knYHRKnrIPxRkYCUQ%2FV2Yu4TjaCeZj5PvY5bOpHADMq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDMnUf%2FNtt1tZ4Ml0wircAymdgewDES7HntOBVVtafHCFquoor%2B6f%2B6DsyESFcwSgcT1GTXdKmjMYDDo1tPF%2FKfxYz6z1w0YMvlo%2BEIQjuvK4HAn53IVk%2B6hCgCHcCexjrqETDCKFnFXWxXfGFuZ9IFlUD7Srm23Nkzf2wM4ZupawVuVLNjlw5PJygvE139KcFwx2LnGGEiGESOGxH1zKw6cfQN9SJ%2BkgmiHBY1jLTcrX1QCKvXTpy1X66UZVBGgxaJNQfBL3Hotwv5F7LTg9GZoYe4hsK34wkqgpVJmsDY%2FhZe7h%2BcU9C15Sb%2FSVxzArSC5iUY8hxFOXA9lqdPy1%2BdNIi5ETEh8nuFWQjZn00Y5I3NjIGvqjOlCq83oMbTOZwA6JXlKmXPLlmajBaue6fNR7gXwHEAHlk6L5d3eV2M%2FEQljYvIQs8HzfG48w%2BCFcKJ%2Bv0E%2B4zGySZ%2F8iCZfEFgPq1g1gfShkNAeQdw%2FccgHSKYHQvTWvy%2F2Yuio%2FdHNXn%2BqCIfQvRl1FRwLuNr8q4uTxWfWFSCyQITQ3u%2F2BCKVaSP35UPmb4d2l%2F%2FgyVmP5SCdUZSIJ1phHMPutvkI0g8Zlo8LExouFoDklWfx7fciI9XtmbllTdC2IHYrPqP6UafGGMu97zxu%2FTEf3MPDVwM0GOqUB3tr5z5twny%2FoVQ3L5FAOzWg%2By6Rcz3KG9Fyy%2FZXO4aahEMtvoYQePG%2Foco9UiJNpjOFYSRrzR6C4%2BNItYDziBEqKofmkuI%2BVFcobhZKPPLDvdGd%2FqLPuVM4tkLwln79ZGer9kQDSccfHxVht7AUtXlfrvrpXjXaPWKk3R9BrFFrupmcfZh5LK1Ozsy1TlvbTgSG7DCDCbp6pQoFiENJm%2FVwfz8%2F5&X-Amz-Signature=005b706c870fa943bff3fa270086649791a404a652f5f555486232a753a5278d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5DATSV4%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T154556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIG1QEw%2FnWsfe4do%2FukV5uvIaZA10TdflrSjdeF7V1M9DAiEAz5zm3VWFEf3MXUcbEM6cl75vHF0ReJF6JTfJSFms3nsq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDL6v%2BYDUbiqEF9iTxyrcA9d8vwT2WnkO8SVzInBg1GV7KO%2FSek8J1lhNiGOKoEYo74kEt1WddcJwwWHm0TlUon1oAXPt%2FTYRJ0UhvcPoiO3EXOciYFmy1aaC3SvrrUI5A8yZTO6qB6oiIyfMs5ShYXzoFv5EH3GNEdPV2Un2mSAXf5cMgVJG7ok%2B0Bn2MbizBO0y1QwySbNtSTxwDg9CPyzmws9WltQW3NJYgBNGMnYFQGQB%2FrGA8%2FJ4WddyE22G481TM1OPf%2B6zL3Ksl0li6uZm8LmV1WoHe93DIhZtPPh4VTuztsj%2BCaMGU84ajblY4%2FTtuc8c9fzh4gtJFGXDCTvdluMZO6ZnL2fQDi3qDBC3U943ifWOnTod3uyucpCb79kiyeiOb%2Fp%2FuzTEwY%2BpQzMzeUkaGZvORLUIfRdNvpgcKy9OlGWp52rlxLEko%2B6g76vLK%2FF4SmR6pUA5HrOMS6M8c2KTr1nTvyn5yfQL6yM%2FVQP0jPoPYHQ6NU7EWbllMr3G3XKF2xI2YHuXTryueh4RZlJpi0d9KemAqwdCncm6W8CT1d7Ho1nhEp1XpNeQ%2FwxP49uYc7G77IL%2F0HSrCq7mygFBYprCQiEmwIdaxkSB%2FZPPyN%2B9MBJBRr67c3ueNtX%2FyjhKMFWsOuJmMKzVwM0GOqUBENn6VVSipa%2FzjL1gnU561vo5F2aX9Plu9gvwlnMnBQqQOVK1KNhYjrji%2FdcYohTqbEcQvI%2BSCTILXCISXTJfuS7pnCpb%2F%2FCydenT%2B%2BP0CGP3zOuwS2XfjU4Jni3lveaVhahxr76UEtp8VypZUxJhsJiRMQBk0tfjxMevsccSNpIJUzFXtswxMrZYJHUeCEVcGsTNavSU6ZQI2N59aeQpUnQ%2FXWe1&X-Amz-Signature=814b051e33b38133258062a1851c084cfcd23afef5bb2b0183af33704676892f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

