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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TDTG7NC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaD0gD27VcDFCrUlD4AcWOW6NslWkO0ZRoDlSbgNOVKgIhAPshps2apDbO919okhpr7GdUYsnF5z61rss4uBY3poAuKv8DCEwQABoMNjM3NDIzMTgzODA1IgwNkJwt5geIETn%2BBVUq3AOMHdXe%2FUIdUoqExEU3m1q8rJpQVHG%2BC%2FYYzIv0EjXf2MqFj9jncrYL2bLi0tSU9MiXhq3Qm3msUIiRppKWoRm0IObF0bYP2jiZqN1qLDHupjbPHg0ymlEQ4mWqilemB1bXO45ef79AkIePwvP5r6%2BaxtqYhTW8%2BDu9DN%2FGf0SqgoTlI%2FBXa4pbn8KQ%2BmHshmqTuPitCVo3NVsz%2F4HJ%2Bn1oTcD5k0nfnFBNkLA%2FR3JJ%2FgkUr2m2eQm35aFLGVsR07S%2FZ9o5HON4v2NrCSV1suHibNSegPpjOXuQeKGpGEiCSaYZgAZEPcEaq9frqmakl%2F9RXGGhaBk38RQHt3WbfFPc5ymFTTl4yhfa%2BKXFXRmhG8pUX9OXj3HbuoJ9xdqGmRCe4E4tOWqW4rCttEdxvLsniuL6I%2BnxzEaRE%2FFAHUcSqox8FLX8H8Oymj3wqSYa91UIMQuaunnPn2iPBYNR3QVa52mf2xkw7Y4efKbKLXcmgRDgcodRM2bOZB9OSpWZ2%2BwFaMTZs%2B1O4HCwVhnLP7tnxuS0gjdjgmEhiIiM%2BQdeyKqeVSPyKhVzmTRpx1mCIF9juXsFneErOXmJ62MonAbKzqGczADk1n5hCbCD3MCJZM%2FWaw5tqsz%2BPoWF0zCHu%2BrOBjqkATU9SYi7KbQjjMOGO7CoRE0C6w23iMmmY8UqyAEGbVshOwjgJAJ6gsFZaXE68YpuoeqwYxv8%2Fxw1BHgyeKsM5P68FNb6kQOuDfMDY2NoSppToZRQohKOFhSQ3djPALP2RemE7bJDOxgLzNdwCmoCL7rONLVFMz1KhiiVztRThBc3%2BiHKpWzODcpeNKyDDHllQC8urX378HHPfpD3DQIhdyPnCEqE&X-Amz-Signature=45ec67b5784f88eb6ef595c14124271e6b9048020a2baba89a8a279d9635a57b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TDTG7NC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaD0gD27VcDFCrUlD4AcWOW6NslWkO0ZRoDlSbgNOVKgIhAPshps2apDbO919okhpr7GdUYsnF5z61rss4uBY3poAuKv8DCEwQABoMNjM3NDIzMTgzODA1IgwNkJwt5geIETn%2BBVUq3AOMHdXe%2FUIdUoqExEU3m1q8rJpQVHG%2BC%2FYYzIv0EjXf2MqFj9jncrYL2bLi0tSU9MiXhq3Qm3msUIiRppKWoRm0IObF0bYP2jiZqN1qLDHupjbPHg0ymlEQ4mWqilemB1bXO45ef79AkIePwvP5r6%2BaxtqYhTW8%2BDu9DN%2FGf0SqgoTlI%2FBXa4pbn8KQ%2BmHshmqTuPitCVo3NVsz%2F4HJ%2Bn1oTcD5k0nfnFBNkLA%2FR3JJ%2FgkUr2m2eQm35aFLGVsR07S%2FZ9o5HON4v2NrCSV1suHibNSegPpjOXuQeKGpGEiCSaYZgAZEPcEaq9frqmakl%2F9RXGGhaBk38RQHt3WbfFPc5ymFTTl4yhfa%2BKXFXRmhG8pUX9OXj3HbuoJ9xdqGmRCe4E4tOWqW4rCttEdxvLsniuL6I%2BnxzEaRE%2FFAHUcSqox8FLX8H8Oymj3wqSYa91UIMQuaunnPn2iPBYNR3QVa52mf2xkw7Y4efKbKLXcmgRDgcodRM2bOZB9OSpWZ2%2BwFaMTZs%2B1O4HCwVhnLP7tnxuS0gjdjgmEhiIiM%2BQdeyKqeVSPyKhVzmTRpx1mCIF9juXsFneErOXmJ62MonAbKzqGczADk1n5hCbCD3MCJZM%2FWaw5tqsz%2BPoWF0zCHu%2BrOBjqkATU9SYi7KbQjjMOGO7CoRE0C6w23iMmmY8UqyAEGbVshOwjgJAJ6gsFZaXE68YpuoeqwYxv8%2Fxw1BHgyeKsM5P68FNb6kQOuDfMDY2NoSppToZRQohKOFhSQ3djPALP2RemE7bJDOxgLzNdwCmoCL7rONLVFMz1KhiiVztRThBc3%2BiHKpWzODcpeNKyDDHllQC8urX378HHPfpD3DQIhdyPnCEqE&X-Amz-Signature=45ec67b5784f88eb6ef595c14124271e6b9048020a2baba89a8a279d9635a57b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQNJ5SYB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFZmff0qoMXOgyt2Q9Rm11o48KuXUdo3Stug3FHBYSuWAiBHYVgJXf5tugdtb7zRQlFu1Sh%2FfNeIjyX4ENzNYlZGFCr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMzc5KcMT2zyQkiTxvKtwDtVp%2B8GPBxY7Lq%2FgwKy7CP9BxZCMJCbPLMnRGrezL3yGEhX93tFAVAc8AkrLJy6%2FYy7KwsTprlvQIoh0yv4SIEpWn43%2BbaOyd5X%2Bft%2B5CzQR8dZXVbZhL7J4GoNiThr%2Ffu0vZ1MhMNogvgYw2ng%2F3U%2FhVwaoh3gGocRM6poNRYX3bAFJFYmpwDcRe8pG27yfQDMhsbxDdfPu6FLCXsP0unH9AWsmHbKcIwRFmVnZAxhzP1IpKQtBusAc8F7G12CyzURvYonceA7HT0s1vp9J4Ojvlm6jcvSeiEh1v3MRcsrUJSOsWy3rzZi1xcETRmIko9GtrPftSs%2BIo8pL2enaLXbMrCec5pCWySokyyDTYEjyxV8ldj70HkwGoWsrahKDwj6qionrsgLcHHcUJeF3BEFa05m1d%2B5MOZjOvBwZr%2Be%2FRnDmeH1qJJMsWJnUxd6JUdWa0ME%2FHxHxUlHhCH7YiljDZpggbMUKj248nb6dzoEcAD5axVot1lE9VfhhdpH1Ll5UI3hqBoipe98Jqd0H5%2Bah4Vk2xNAH2RsB%2F3mbuCEGYWOoIiAndyFugkMa3lR8S%2B2ounAUbeZnE4l2MpMNPdVKicKHMHD45rN9uW8iqYlr7vYRI%2FfdsjZIHydww0LzqzgY6pgE%2BqKuiIkPyCH0uIQiVMm5V06uNESS65pop88%2FRDBz0av4xXGvGtFyhVSBbRofXDCayynhvdBd%2Fw%2BqGndkrzQ7PdXXKE3yt7HGs4l4YG9ELaMwHrtL0yjB9XIxSSciq5NggN6G00I%2Bzgz9JspaFT8MzEEZktmgPVBSgt2q5n%2BV7JGNNGegcoK7slpROzOeJAtW96A1IUPNQeMHDI%2BKDkBUEHWHLwNZT&X-Amz-Signature=cf07135ac5ff6e1037503be4cec0a03e62e5e830125372732514f4d91421ee28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X2C3TPP%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGnzkSDn0n4FI18uN4zDSP%2BXx%2BhBGxTf0Oy%2B5njXJK81AiEA44KnMAISXCgATHe08b9x7eu6SmWjkYmUuDcZtQX0XHcq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDL9KmBkqQlkwwIE19yrcA5Wjl9fXUhYBALmFcb9rpq7%2BvH54hC0Ic%2Bmubl2X%2FtDAkJktykqoMOYnTFqrz7jQD%2Fj1P6OVO%2B53LiysM6hDJY%2Feoc0LE9De9E8KcBiBVIqJu3GpKZ6b99C9npZr6HgQHHfSrF9bx6VEiNfMHvWiSNsl%2FsnmtzpK0FVPupApphyQHm8vsOSyzck02lH3II4%2FRk7EsYzQp3y5YXUswgw4HqBqexSbMcaDbVCI8mKSZ%2B4q5lIidtEhPmZf0dRopbRcMyagsbIyY%2FS%2BGDQQCEJqW0FxhcY2PGQm0gy5pWf40f4Qz4BBRBX6wefvjE0Xnd9VuocwzaXZO4nCDyUm93bZ9QQT5EFS6OSJPO8S0%2Bf5V%2BclOq%2BFpEwc4RsKaNZ40Yqz4lT%2BR7E%2BCLgsl9qdTj%2BTswNHFwS49EeVgsnLrHlf%2FPxuCrbIVDfqqeBfjMQgwS7t9Ap3VoAc9Nzc2sqTwWxLvFYcyE2VNolEKeUC6XO89YFhL2Piy84UyHOdfKXT3y3bFsbvXB1PYyoVlGSzbUWqQlTPnkabg3BhIE97vJnd3mawjSivpF7A6nCm9rtAyEsQiPeOedAStzoLLsFFJW5sKWUK5DKYPtbDRO254lIV2dTjoLSiPsbg%2FWWhZW1BMOe66s4GOqUBzinGUispV99YmFwsrQZl8Iut2YxyG6Im67uLIPxqHFjfAIPjopNg3gy7jgKy9nCGlySzCNbPT3b65NZydDUeVbuTjdrM5guZkC%2FGi2dRCs6SsqtrR08UDM0k7vZ2sIBszIXPmVRY1RcgqMS%2B6mjxRoSruML1tDkopNjqt5ah59kzuDJvkCKe9CwQGBg5cHnbiNZLU6i9EfEenhwqnrWciRgWeP65&X-Amz-Signature=32db9f338f755fb3cd550bd5e733d5e67284dbeac28608bcfe582d42df91f2da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X2C3TPP%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGnzkSDn0n4FI18uN4zDSP%2BXx%2BhBGxTf0Oy%2B5njXJK81AiEA44KnMAISXCgATHe08b9x7eu6SmWjkYmUuDcZtQX0XHcq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDL9KmBkqQlkwwIE19yrcA5Wjl9fXUhYBALmFcb9rpq7%2BvH54hC0Ic%2Bmubl2X%2FtDAkJktykqoMOYnTFqrz7jQD%2Fj1P6OVO%2B53LiysM6hDJY%2Feoc0LE9De9E8KcBiBVIqJu3GpKZ6b99C9npZr6HgQHHfSrF9bx6VEiNfMHvWiSNsl%2FsnmtzpK0FVPupApphyQHm8vsOSyzck02lH3II4%2FRk7EsYzQp3y5YXUswgw4HqBqexSbMcaDbVCI8mKSZ%2B4q5lIidtEhPmZf0dRopbRcMyagsbIyY%2FS%2BGDQQCEJqW0FxhcY2PGQm0gy5pWf40f4Qz4BBRBX6wefvjE0Xnd9VuocwzaXZO4nCDyUm93bZ9QQT5EFS6OSJPO8S0%2Bf5V%2BclOq%2BFpEwc4RsKaNZ40Yqz4lT%2BR7E%2BCLgsl9qdTj%2BTswNHFwS49EeVgsnLrHlf%2FPxuCrbIVDfqqeBfjMQgwS7t9Ap3VoAc9Nzc2sqTwWxLvFYcyE2VNolEKeUC6XO89YFhL2Piy84UyHOdfKXT3y3bFsbvXB1PYyoVlGSzbUWqQlTPnkabg3BhIE97vJnd3mawjSivpF7A6nCm9rtAyEsQiPeOedAStzoLLsFFJW5sKWUK5DKYPtbDRO254lIV2dTjoLSiPsbg%2FWWhZW1BMOe66s4GOqUBzinGUispV99YmFwsrQZl8Iut2YxyG6Im67uLIPxqHFjfAIPjopNg3gy7jgKy9nCGlySzCNbPT3b65NZydDUeVbuTjdrM5guZkC%2FGi2dRCs6SsqtrR08UDM0k7vZ2sIBszIXPmVRY1RcgqMS%2B6mjxRoSruML1tDkopNjqt5ah59kzuDJvkCKe9CwQGBg5cHnbiNZLU6i9EfEenhwqnrWciRgWeP65&X-Amz-Signature=249c8e8c32c5f7499ba87099743ae51a5a99e945df2aac5e47ea4b5fec0f79ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFANM7NL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB2b1qm%2Bnu9HlzOzw91jFkOPVrrq4xTl7JuXIflVVck5AiB6vLX6KUgwYcXDjtvsMjhQENw6pn0tk96WsEheZvnGoSr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMCgoq%2B%2B2UpBnPMNDGKtwDCofzZVkAob4dgzVk3dUhPB3CdNXBGldyvjz9AnKpS3IdjSn5IIpJz7%2FK6zDjT8l4Hzf8BYZKkiObDOB6%2FGXZraNbV%2Baun%2BYdqwSOz10cnIsv%2BpkzDF8gRBguk9PJaD%2F3lPjHmEnPZoRLG%2F5ieVhYVL0KcA%2BJqqQhQNXDKlQ49KSVNVivzLvyP5Z17i6Qg6qZEJctbQTZ182jdgce%2B90Tv7InwZ1UMNOh89s6nOGhJ1ZXkjWLCdyC8iXKfEr6gjWynO6cG9hdjVYlvD2tb5r9lEuoMHdlyf2WVY%2Fs7Q%2BJpLN9zP3gOuzG6zSxawdvC2xtWCGaY%2Fy2HDBT4z2KGOO6tN4yxiV%2FReETYl32zozeNsC3Iej1K%2FR4T3lrmtR3RIaZGdVNV82e7MMvbRfT%2BPZsWSyodfwRkZXM%2BfRbCQfY8uvjVbZfrnn7wg741paMNnCEzd1qm9uiAYIfvEUG%2Ba%2Bj8elH0CCm%2BajSxkkaPBFI%2BfZhp6a%2Bj2e%2B%2FNHxQTSo8IDbbXWi2OpnYKab9xUN1ol9sBijMwojk5FhG4xE0eRB40AcIIzdO52%2FvmZDLQwlDkDmgimNBOmUsDaoIJ5Lcm6NLLk0uLdnZpwpC4LZUMNYIBrsL6Ws7gyQkRb6Naswj7zqzgY6pgFLFCBBuGI0O%2Fa9%2BiMM2ODyDLJqoAXL8Hqg93%2BD7UjXXwp1HgxdCIQvoAvOBSYQhXkf1LsoRHvhxEETkTDxh6piwt04WpITxjYPHH2sJZjjwbYS0A9Ql5CNddRV5PKscPuzCz9P0gkDjExrIY4z5PFMA5BeTYhL26pyXDTMAIDSdWlO8lJVlprJCbYMqMmUga6ADJoVF4m30r1twBRcnhHbFnsGilRc&X-Amz-Signature=350bb9208270c80dd47083bfc3b0d8fd371069d3dfd6875798efa713e0e5b81e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FKPW4RL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnT%2BXUffFuEfmcEFuSz96KLk2XNgjX9DfGBFO0issUnwIgLye3ZAxCZ6VhI7V%2FhgbodEnN%2FYd6EcP3kVTbWCcG1wgq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDEoAEhCdVBEGn1QAcCrcAxR8612H6REo%2BYCLYQy1%2FAGrHg1gQ2sjYA8UYSdNcMox6p5Qmy0o9%2BuIFCCKnTdBotfmLhgUYUr2zpwZqDt%2B8umzd0d6kRCHAaOslfmPVX3DpN2r3u5NTPdDYUpy2kpxScprIcwoMesf18eKtZV9uGz4BEyJhEa%2FVJVZXxTgnhFLMDcY8e9LjoYtaS956JgRdPc3ZLkTqU87OodvpBMu8C76PeN9xGvMgZWjdBjhse%2BZOqhTECJVLQTVeqanTgshJK9V6OgbHXdlslZLsNxnb3CXG13roRZViW7B2E%2Bj0hCmPVdtAfDHZsHvShX0OjVHlp0Rr4m6Kd0k01PBjAZicRPiLWMSBkUQl5b5sOBcgX%2FxIbmdz3LLA0xwkOFZ%2BSELDzQaLlMNDcfzbXYwvOHDCYhMQWVaeYSRgzL%2FNCpy5rGS5Njr69HVBJFliISbEIgqvFK5ItPylLWOPNTE7T3AfOa%2FfmJvorwTTPYtV4v9xOxrUnwF%2F%2F%2BasYwdxBr9wq8z%2FU9pV01a7YcKrZUbuO3858sQtFttI12K22Qxm9rmy1JT3elKadbz3%2Bu68NPSDfe1ATnJfanBVVC4RZKBp8zT2Wp%2FQ5kqs%2FOG5JgK3jCAR0QjOMVNxJiGHf0LxaKQMPe66s4GOqUBjPQrncSihch2N8pPbDClUzN5OWuhBhnB%2B72UjSjDCaN%2BgaxDOcbGwsm8g%2FElzBSMupUEdtdUg%2B9s86VHSeWjzmZ9p2V52o1kAYMPabwDlBQpXzRNxvLHmQiWdp8glp%2BwTGatqMNpDDCK6oT48HAm9gsAfQcUhnEuh8SFJ0XpfwB%2Ff9RPC8MTcxjtnMZFQ3EWpL3jYfeLXTa9KUX3F%2FJjknJ5vFrR&X-Amz-Signature=9fcbf28fdb228af68213f43961df153f1dde5dff51ed2474712390b956280d54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SL4R432P%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEIjJZOSAVWNrNBh6OyFlpujIkrHgVOzv2IkOGqJpYvCAiEA87kqYsho8X24N3R4ncSk3wekjbcbHn6aWxJMe%2FsRDZAq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDJb5m5LwvR1BSj2vsyrcA04kF8ZrkZswHhg1pEP1QVDC999KSEwIpuS1l5%2Bt3jYf13k3CKFRfmFatUOTNJNeSVQJaNz3H5hczINy6eD3Vv%2Bl%2BLRNDetrmDNNFOqPZ3h3weE1Evh05PR2vexqM7rJ2b0DNHAtngvYZzXwbtBEdzweKxZfx6jNn0YPM54aVImL5RnxBDh6YuvSXDAwj7P29akvrMMPNlPfCmGighIJM5QKgdvIplm7vX7MAUaFzXvCj%2F3UMCY7rsJmiZdtgUNKCvYBKD0XbOS18PKPnad24KC8rrVgd%2FpgT5MR9CCX2isvUUpizWXhrZWBirL%2FHdt%2BmGoiC8uHNQgsSJ5exs0PP2oHAprWxUKtPoF%2B%2Bt4hGoVxFE%2BjxoZVJI5EBEfCZyHXpM4tSGFtYtQmSGjHjPE8dedFRMWcYyvQdSol9AotKJvErYj5o2rs1WHxh6hfPsXesCZcT5B5VEZeDfY8lrwY9FitcKR4GwopTcZUrGRswb27PD%2FBoddhR3UrSVQH0yq4HkBb1KwaxK8yEohv3MFD1nRk6zFltCzSSTs8o11i4s4fcZh08rL%2BtUA33RdpcxssWTDj9WbHzi9EkAHt3A6eNtEpQmhakByWO01USOmZhEbZIdfXkkuTNrcJixTQMNK76s4GOqUBzcPxwrB5NuIz17pgU%2B0DamxXNqSMFlvJc3iwb%2FdZr44whUnUF7gVLRdBTGRPNHF%2BqCDbSy%2FEy3gX%2B%2BEQMvi9kAEig%2BrmtbCoTEyCyMbKUhCORIGhQMVOsqzSHFdwRSYOPalz8ItWzD2JaW%2Ffk4zMQk7girngdWt%2FqgRCcm5O%2BtTqRV7E8tL3h5MlVlOkyVo%2B%2Bg%2BtJ4NRKLMujEEj2NS0%2BRSC%2FPL6&X-Amz-Signature=19599cb29671cfbf73db9feebc09662c009fcc6d0a7d4a57ade9e0b7624b54c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQGIPZIR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvFX2eSgp5UvL0fIXPNKTQv951jP3r2cy33pcoCCKEsQIgLKZC0uvj7w1%2FCPTeefoHrTabo4J%2FtTdIDGH%2B1golxZ0q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLCTT5XY0ZDMUnVuECrcA8MZ1y%2B6QQpyg9u3PbMUGhfav2kX0M1QweSaGqRZBFr1d4tluPQy4awCzzPaQfKctQG0kZ6iRnv5q4YigIe1EhqEkoeFlknrc1HLegZW6odzNVWW47f%2BhO%2FLqF%2BlgmYM7ZFYO%2B97ahE4Efy6LclU9yVter1nZclJu2iJpqNTl%2B8BiFXCfjbv%2F4Bl1BlHnHhOvU8b2lmbRshkLrZxWauqwajqk6T056v6D7SqPIJr43AvCT1W9RfDIYQnwStySqfZ2fEj270dXfCKgqAsFs1ZoAVRCk7F2hobG1x5%2FM%2BE%2BGRbIX%2FAEuWx0uHUQUaMu3AQ3X3avH5m6YunJOkaM%2Fr4P9cV6xATLwNfwQOkVWYakopy2eyMmj7fI2qCfzHhYJsX1niS1ytQgt8C%2FWjlIx%2FsTVlG7OwGto2eL0CObZVEG0znElBza4QWRXS%2FRwzTNWi6SpCBfoDmUOL%2FSMpJTSh8xwnSkNQVMxMvi%2Ff99rK5AuhXUDbe1w%2BAXxK0%2FYMhsIPHAg3pwWeLLHGCDwKOlF9Pqc5yL6iY6HxIGDyIW3d4yJepXhKlgHuUmHtb%2BUNDwMWa%2F7%2BJX16ycKUEiWW4BWhGMMoiVTdEybmk6B7f%2BXjril4Ed7L5hTd6kNhDbD9CMMK66s4GOqUBs2jP8J0pBc7rKUEczHxxRcRIq6PjbUsLrL0rZcl6CRE6ITnGRSvm02CrFpUVarc6ln%2BXr93WgoAvqa%2B7qpduM9Rl0%2B0ZUx9GkUazTpmYmX7ciKNhohW8nOimz23FqjutgWmp3gD0feii6bHYxKRnH8uuTzFER2toWSohvooziE1ekhP3OwtveAeqSqls7bIihGRDt6LQwKjLSvQQmgnMpG9XDbKe&X-Amz-Signature=3be5f2b996f860b9ce8339efac64b5518c8fc54c48033126dc25d70e6acefe82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQGIPZIR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvFX2eSgp5UvL0fIXPNKTQv951jP3r2cy33pcoCCKEsQIgLKZC0uvj7w1%2FCPTeefoHrTabo4J%2FtTdIDGH%2B1golxZ0q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLCTT5XY0ZDMUnVuECrcA8MZ1y%2B6QQpyg9u3PbMUGhfav2kX0M1QweSaGqRZBFr1d4tluPQy4awCzzPaQfKctQG0kZ6iRnv5q4YigIe1EhqEkoeFlknrc1HLegZW6odzNVWW47f%2BhO%2FLqF%2BlgmYM7ZFYO%2B97ahE4Efy6LclU9yVter1nZclJu2iJpqNTl%2B8BiFXCfjbv%2F4Bl1BlHnHhOvU8b2lmbRshkLrZxWauqwajqk6T056v6D7SqPIJr43AvCT1W9RfDIYQnwStySqfZ2fEj270dXfCKgqAsFs1ZoAVRCk7F2hobG1x5%2FM%2BE%2BGRbIX%2FAEuWx0uHUQUaMu3AQ3X3avH5m6YunJOkaM%2Fr4P9cV6xATLwNfwQOkVWYakopy2eyMmj7fI2qCfzHhYJsX1niS1ytQgt8C%2FWjlIx%2FsTVlG7OwGto2eL0CObZVEG0znElBza4QWRXS%2FRwzTNWi6SpCBfoDmUOL%2FSMpJTSh8xwnSkNQVMxMvi%2Ff99rK5AuhXUDbe1w%2BAXxK0%2FYMhsIPHAg3pwWeLLHGCDwKOlF9Pqc5yL6iY6HxIGDyIW3d4yJepXhKlgHuUmHtb%2BUNDwMWa%2F7%2BJX16ycKUEiWW4BWhGMMoiVTdEybmk6B7f%2BXjril4Ed7L5hTd6kNhDbD9CMMK66s4GOqUBs2jP8J0pBc7rKUEczHxxRcRIq6PjbUsLrL0rZcl6CRE6ITnGRSvm02CrFpUVarc6ln%2BXr93WgoAvqa%2B7qpduM9Rl0%2B0ZUx9GkUazTpmYmX7ciKNhohW8nOimz23FqjutgWmp3gD0feii6bHYxKRnH8uuTzFER2toWSohvooziE1ekhP3OwtveAeqSqls7bIihGRDt6LQwKjLSvQQmgnMpG9XDbKe&X-Amz-Signature=a4cd7c024d448d7df2701a366d708f84157b6542a5036063ce715a5118af9181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PPNRA6D%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB2k7Kn4GNrAqdeXhnn1MHcWNJ68amLP1WTRoW1n5sojAiBpp8soJUeucrR8%2FuYBSkgSgsD35dXx0ZLvsJgrCYKbhyr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMacBdACSnfnXgGSoAKtwDcBJrfSwbkiy2HahNZav8rWyj9bige76xbKsy3%2BrKjScZoGFH67HkBb7lJnLSRiOCdqVu56X5vFJTr75SomdT29vDm3Fyyu%2BWYKONBEED9AM%2BQrNCtJRpbcbX34QVNToQ0%2B6kAD4GXXAH8vn%2F5djjea9d18dTJcFuLqCODK6ncnHG1j01amk7S4SBtFiErUEFYoTxg1Nq9WQBIUdG1RsT2QdzZcpzea6LQ7o6S8fKAtAJTUuf9gcsXPDbJ%2FJeEB%2BqL1NQPWtS2qG4zRjHLeWkQBy3f6B66RwDcm5nm9O4EyByXe2Tza%2FTsZTPTXkwlDyrNnbnU81vLvCYzKT5YeojSFRYBo9C72VTS7sg0wNwagyOAf2e6wNtiME1lyGo8It%2BwceU6%2FP5IjcYPVC%2FvXlHUWOYmBhxMT6TFlAyncDS7L8CT0kHgVqreIFWv5EWffKkOEYrMVbQD3mJa8lmy2foGhmnePjlfcIW1XmKAigGIz%2FaTrh4ABmQRJOimhB3Wxdoxr%2BMUM0ZP7kQoxE9ONwURvGUxYG%2FeVhhr%2FBNKjRiilVis7wrleSUDRX%2BicGjM8wVcikxb%2FHak1Pt9%2B%2BWFyvXepOjuq59lI80N7NARiLbrMvT2XhtoxDTA1EuEqsw%2FbvqzgY6pgFhXlFSuvY5gF3I5TYA%2B0F4bLGI38suCbgkdHm169BpYXM%2B%2FAkrOvWPXhNyBact%2FQHcCM0DOQx5WdvhLm55ZOv9HrubsrWP%2FXHmAyEUPxMT%2FBRpFS8n7eYIVXHiGH0t6bk09KTLWqby67WEb7ueEkn0tQIdCS%2BCQm5nGEkeiyFkmm%2BmZPkeZT5CFvHsgbFTPtT1K%2FcTe7YSLNazmWC9s2hFACQkK19H&X-Amz-Signature=0088899fbdc0d0bf03cd66dd606068a64eb5535d21a2d8fc8eb96cb4770463b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RYGUA6Y%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6CMh5MSpmyrPAJBUdvuJ%2F%2BkoabuMrsWQAJRWZMCa90AIgL%2Fpe13pPfx8ivt3zBkFsMOh0GQelgGubpJfN%2F7g2Hrkq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLYJsDZcFdtsZZuIPyrcAxIcP3bj%2FX5DovYqtrBls1YmSVVmMpfesbXFmSC1Pnf0I28RKghDK6clFXCjTsqrQQSB67FF8sjuhY4zvQcIQjbrQYLLvyfqXEdy2jPuE9y1lNbwWQ61dBVE9232psf7zOg%2BVRocsjW1s8%2ByMnC3548T2%2FfH8BEdRAn%2FwwdJDzLi1mlZtZY0rs5ir%2F9vI%2F9XW1EZXaLSgXlknZdRXm5HVnjj01nFPaIK9Sbz4OAjgWj23jhiJUorwYhsLmpo4EIbpbhzSN3WqINAT8ZNoHYjk92dYld2L5UkFKv2Ri9NLOxTOMfl4rxG8Fb%2Bv3xMR4ZQ%2FMopOriUrkbcsU9CbIHrDO49k%2F22LN5HhToH5F%2B91%2FBuRGGFVPo91dpLh7r8WSfNEvTekPzOkp3B1gsiL9m%2Fx8rngCdk0t0UR7aTuavSEajrPTo1wIxtvr8ygqG3wUuk%2B2d6%2F0%2Fi4fDgnF8VIagW8Woum%2Fc0EUPHkgAEKRgUZDSrWmpEeA%2F7eNVbAK1iZPrWwOdPrIPL9h%2BPPDXITTgS2o8osYcXuPrEgb99VEr6pQdz59qnvFEyXyDX1buWFyjb8qTW3SSi%2Fo1xBC6c1mw6%2B1xn96ez%2BgoCltslHR8HOYQ7K4pnUhUh5DPfLl4nMKa96s4GOqUBs4ODjKlWvOqeT0EXJShNYwL1ALRib0QGMgXTuRU0Ee3p90QnfIpza32cakx9Fy6J9Sx%2BiWaYThCzoiVosIcTrv34ltj8dKXdI9QbdZzUEW3KCCkhawVajTgM3aCiRLt2aPbEP3qOB%2BtDkd1B32gie15MfIVZL5AoZJak8Mm0nfqFgl7w2SKnHDgVzDqzGDF71ZbVVDWnxdoKD7f1K0yRslV11L7V&X-Amz-Signature=9a27a0a3048e9a46182e9f3e77b669762254565fc2b60076c15fda4e828176c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RYGUA6Y%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6CMh5MSpmyrPAJBUdvuJ%2F%2BkoabuMrsWQAJRWZMCa90AIgL%2Fpe13pPfx8ivt3zBkFsMOh0GQelgGubpJfN%2F7g2Hrkq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLYJsDZcFdtsZZuIPyrcAxIcP3bj%2FX5DovYqtrBls1YmSVVmMpfesbXFmSC1Pnf0I28RKghDK6clFXCjTsqrQQSB67FF8sjuhY4zvQcIQjbrQYLLvyfqXEdy2jPuE9y1lNbwWQ61dBVE9232psf7zOg%2BVRocsjW1s8%2ByMnC3548T2%2FfH8BEdRAn%2FwwdJDzLi1mlZtZY0rs5ir%2F9vI%2F9XW1EZXaLSgXlknZdRXm5HVnjj01nFPaIK9Sbz4OAjgWj23jhiJUorwYhsLmpo4EIbpbhzSN3WqINAT8ZNoHYjk92dYld2L5UkFKv2Ri9NLOxTOMfl4rxG8Fb%2Bv3xMR4ZQ%2FMopOriUrkbcsU9CbIHrDO49k%2F22LN5HhToH5F%2B91%2FBuRGGFVPo91dpLh7r8WSfNEvTekPzOkp3B1gsiL9m%2Fx8rngCdk0t0UR7aTuavSEajrPTo1wIxtvr8ygqG3wUuk%2B2d6%2F0%2Fi4fDgnF8VIagW8Woum%2Fc0EUPHkgAEKRgUZDSrWmpEeA%2F7eNVbAK1iZPrWwOdPrIPL9h%2BPPDXITTgS2o8osYcXuPrEgb99VEr6pQdz59qnvFEyXyDX1buWFyjb8qTW3SSi%2Fo1xBC6c1mw6%2B1xn96ez%2BgoCltslHR8HOYQ7K4pnUhUh5DPfLl4nMKa96s4GOqUBs4ODjKlWvOqeT0EXJShNYwL1ALRib0QGMgXTuRU0Ee3p90QnfIpza32cakx9Fy6J9Sx%2BiWaYThCzoiVosIcTrv34ltj8dKXdI9QbdZzUEW3KCCkhawVajTgM3aCiRLt2aPbEP3qOB%2BtDkd1B32gie15MfIVZL5AoZJak8Mm0nfqFgl7w2SKnHDgVzDqzGDF71ZbVVDWnxdoKD7f1K0yRslV11L7V&X-Amz-Signature=9a27a0a3048e9a46182e9f3e77b669762254565fc2b60076c15fda4e828176c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYCKIM35%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T201731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDF7ioxfMYqu7yfYAHgrRp3QvjwF2p4j7eMbCvvhEyPOAIhAI6VLUG3Wvd9kMQIv3NcexXLv75CbyAbde2T8%2FqJp4SYKv8DCEwQABoMNjM3NDIzMTgzODA1IgyCMD26oZJWiNTVl0oq3ANv%2FuxCaEYKJofWyoNb4q8Zss9CUCJvBbHUFWi9VJe7XIe1i0X3lFkA%2BXA8FnJ3iIPtRpblpix9QPmiTT%2F3GMXSnGJpgnAFsQl%2BMNB%2F2EXqIK8OwFNBanwbzr4uNy5eByE4idYpHrTMs2zS3YQV%2Bwlp6FZAj5RRADs%2BN852AwX1Cxh3S0yPDD%2BCbycPH59TRht7gU7d%2BPDx0Vi6wmyGkDvpln0JsD%2FN2v2780BCxPgxhnvWO72vOcXCifQW81I7%2FZ105KjLnRZhrCNRtdMkbcG%2FJOBJQw5xsyL65RKI6SdQD%2BVlk65lRWcjnGB1r6j7zzRpEbjOt4gIj%2BTEPGoR5H8%2FjGDt0cQd3ZKoV1gNYCAZwRR9RXojmMl8UENFSWtKR9XdSMdpnYh3M1dQZDhxYxgFXuKGsuPQKl5x2q71jlBOQ18w5nlox5j9Bk%2B%2FmJF8g4y9c0yLp9q7%2F9to9ImHQvHwQDXbL7l96A6Y2uVWWkWetL%2BLjZXXWdiJmWY8%2B5Iq7hheXw6NxYJkIEUqo%2FBJ5abi8HBacwxPmundUfOCsZm%2B0sVmyYss0hvmFLlHclpa2Pp1O2ejtuNLaHpNujThKR1EZcMO5jqTqw6ZJoJ5LPnxoeg%2B8d8qYALUv8%2BHqDCvu%2BrOBjqkAbJbDp%2Fzo9IKkEe8ya1AZkM3J7hcKs1tjf3%2Bc9T6GrHzEVbJYXV7bWjG%2Bi48%2FP9ZoR15BcoRVoqK2RiByb2mtmbSRETYWpQrCJgRUlFhlfFhqwip61VKU52r9CW8r6Mv1E1P3FXx5113Qcoa4rhdgTqM%2FHtvfSEdOF2ltUT8Dsdnlr35JKsYIBmWAUfxmGMUNefNfUnzZTpbu%2BVt0jAeZFi1%2Bmmi&X-Amz-Signature=09d1783d0fdda0867f057aaf7286b1009bb0bf63e0887ae4d421d26dc2ead919&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

