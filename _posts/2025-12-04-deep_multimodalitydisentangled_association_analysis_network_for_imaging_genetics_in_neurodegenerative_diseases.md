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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDKTJJNW%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCID4LoflEIo6qK03xkQVAeiQMCA0p3cYc6K%2BFwnIURH7nAiAkJqNo%2BbIEIgX5oqkaEQSa2wE%2FCzQw8odLD7JtAcJNpiqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyF5FtDZON%2BWexDIxKtwD6IXkMklqaYGYGG10uo1JsSj0NGEqa1BS3iZKi6%2BDgrxhW1Qq%2FczF8xEfpStIo4qIaVPdXNtJW6FN9SjSM%2Fic4qragxyJeuWPySpc2PBjXio9OdoP28qUzl9JoePM9BtvbWZlZdrk%2Brmya6Jbn%2BN2vx%2BVJGWzpMJPsm6FFypDZkD6Y3PvrsCQu%2FGs%2FB2gv3dTqGAKCVRcuuLyvkE3Xj5fPEaijdDjbLhgmyhEjsTjfDyJWwW%2FAdMgnJPAc3x2Orq%2B2z9YMZpQ1YML5Zgzl2KHrjeq2%2FBg0JthUz49ul9KRboAi1ViNhnhwJBzx3kaM7gv%2BvPI%2FJIqBDcMmNC3gWtWin2PsIK2lr3tMzhtOTbF%2FdOSKmejT6xayAVvtzJ83H57a8ekeSr2oOGhzwbjB1XjhTdqmDl8oGLPXcrfisnz4N%2FdftcosKoH43HaxDFUp6zSuejSx4LHsVxXTpRQneTQ1N%2BJ43D4J84OmArm%2BkYrFE%2Bb501VeIdPLbf8KIs5%2BFCAtyqhdBZrpzAMAGXKlJQXHCUsRt%2FXBKI%2BUQamfJphtv3a8zsHlWvr93q%2FsYhmjPEctLlF%2FvfX7F7knqQ0i3TSBST5bNlUjzCRXGdeLdqXtN8bvj0Jph%2B33ECtTtowoqLFywY6pgFynAywx%2BRIjnBith%2Bm7%2BexmmTRCmYgJn3zXFlYdFVMaM5kliJNKDK6qbP6K85XjFLyGu60cDO0BejdLHoPwWxl8vffcivrZeHKIw33hjfpFtMNpJ%2Fsuxc5bgN1sDAQXzpIy7%2BkF1aY11orklCA%2BePC8H0KWhGg8w8MUUgHx7LostmcSs3jfqSkScXeiphGImvQQRjPrwd90XVxs%2FFVYojGhmmcTulg&X-Amz-Signature=d9f237324963276791b1938aae48e68d8986549a9369c94fafd4be9aad6e007e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDKTJJNW%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCID4LoflEIo6qK03xkQVAeiQMCA0p3cYc6K%2BFwnIURH7nAiAkJqNo%2BbIEIgX5oqkaEQSa2wE%2FCzQw8odLD7JtAcJNpiqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyF5FtDZON%2BWexDIxKtwD6IXkMklqaYGYGG10uo1JsSj0NGEqa1BS3iZKi6%2BDgrxhW1Qq%2FczF8xEfpStIo4qIaVPdXNtJW6FN9SjSM%2Fic4qragxyJeuWPySpc2PBjXio9OdoP28qUzl9JoePM9BtvbWZlZdrk%2Brmya6Jbn%2BN2vx%2BVJGWzpMJPsm6FFypDZkD6Y3PvrsCQu%2FGs%2FB2gv3dTqGAKCVRcuuLyvkE3Xj5fPEaijdDjbLhgmyhEjsTjfDyJWwW%2FAdMgnJPAc3x2Orq%2B2z9YMZpQ1YML5Zgzl2KHrjeq2%2FBg0JthUz49ul9KRboAi1ViNhnhwJBzx3kaM7gv%2BvPI%2FJIqBDcMmNC3gWtWin2PsIK2lr3tMzhtOTbF%2FdOSKmejT6xayAVvtzJ83H57a8ekeSr2oOGhzwbjB1XjhTdqmDl8oGLPXcrfisnz4N%2FdftcosKoH43HaxDFUp6zSuejSx4LHsVxXTpRQneTQ1N%2BJ43D4J84OmArm%2BkYrFE%2Bb501VeIdPLbf8KIs5%2BFCAtyqhdBZrpzAMAGXKlJQXHCUsRt%2FXBKI%2BUQamfJphtv3a8zsHlWvr93q%2FsYhmjPEctLlF%2FvfX7F7knqQ0i3TSBST5bNlUjzCRXGdeLdqXtN8bvj0Jph%2B33ECtTtowoqLFywY6pgFynAywx%2BRIjnBith%2Bm7%2BexmmTRCmYgJn3zXFlYdFVMaM5kliJNKDK6qbP6K85XjFLyGu60cDO0BejdLHoPwWxl8vffcivrZeHKIw33hjfpFtMNpJ%2Fsuxc5bgN1sDAQXzpIy7%2BkF1aY11orklCA%2BePC8H0KWhGg8w8MUUgHx7LostmcSs3jfqSkScXeiphGImvQQRjPrwd90XVxs%2FFVYojGhmmcTulg&X-Amz-Signature=d9f237324963276791b1938aae48e68d8986549a9369c94fafd4be9aad6e007e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ESFSA74%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIAm4cqylxfMJot6ekIegng8hUwcnpNxAsg8xFGc2As4VAiBL7sZ8VU2CGrf88Mt4T9tqdfpDS2u%2FXkCdxPZYQjkCHyqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Fkbx3GX1ZqTuAxRGKtwDMdzQBV8UnR%2BmB9bYOMlEPGIZl62zFbx%2FjO1LzN0ZKHmWXOrdpEqJVmkl5%2BpaHcSyomTm7VLvo%2Bha5cTajLDDj%2B1u%2BS6uAZ%2Fr%2BOzbsrL50YV3B%2BZvCs9GingZliqxumLS79Ytz4Gvpeu%2BkM87Y4mCMcMPdmle7IpBh%2B0PCx5wxSes81lJsIWoqCluitJIApXCD5CfwNSG0uyGg1dZZ6fIn5woXXxk52J4WxbNwj56CI7%2B8ed2KV1vjfB40nwc6eONFe6RaWydA9sWNpQnrFDMikLw8DmQE9ld8QP4q7opodg43i2QpJ8g5DmxOJhBYOfD%2BjOCR2qZAY2VroknaAdeRVx%2F098VtXFR7eyenKntqXxeNdr0PQTL1ptsBMUoedMIvPrFfK3IQqLRaCg450fLOwmGbNLMrHHjQ4%2Fs3gLKK9d0GiL44Wn3ZiPNgx7AWQGIWL8eMIgsUlOBY4hMqdS5srJ7Xn6E55vXx%2BeQfJ%2BOHtnK9R0vWSolum64Vsn0dTp3oLHuAk8PGU%2Bm2aaNbXHX6sY5crH5VcLjGKJdroRVJ4NyVIqIwZYTla8aaSNh5IcVuaFvUsE1nxpYR3p1yBUIRaW8%2B2TmHikUA12O7fophC7xF2v7H3RGDDytWpYww6HFywY6pgGZ2uJUlSm%2FsGwfO5CwHFBwkE%2B00u9MKdnBJUNLXQsD0PbkrWaS13bOSCI347UNzBdITBx0LDqF3Np6BMNrmtTBxjjRhSArjXlAJK8nNAB53mAiD8jv%2F%2BRRSttmf%2BB1dkjJcwztM6RXSUhUFAUhRZ%2B77c5iNuGCAC7D7%2F4Y4VKHgEIhH8Vp108zrtjcmLjz2XRG8UFK3Glq4SJyRRllA3qjPRh1T9qI&X-Amz-Signature=9243220c8fc6b6483da2c425cb2046e29f929eaf86271002c1db1e50e58d2a03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MM6ZMN4%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDJK4ctWUIMEwR8S9jn7ZIWfnNymERj6vqhRBoeY1kf7AIhAMWvDI5mYkSh0bSbmh0b0YsZPwxMfHw6No5XXhrQVk8TKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgymL%2FcLYcI2w8zibE8q3ANM9Bg%2FgPzrOKxnWtvIUByPB1DnuNDr6xMunzkWd0d%2BExIAywkNb2zUA3QOBjMzyP0EB8JOLNb%2BHrDaiE3CRw8UtWEIeqRt%2Fale33e7m500kTdu%2F4uPyLwInB4z%2BBkuZ7SLKqqfgGaJuucmAVl3gj2B%2FXJyv3WD9TsZa7xL0%2FKCFIqULtCXmk6PbqARdkWpzbT7S5wXcOdY37he1tfDpCg5GS4u6ynoZ2quAR%2BUYheh38%2BW%2FK6C%2F9y0YKG4l%2BO4n1W8Gf52HI22UJ7JkRwo5UqsYWnenaHHrXnf7xNvt1SKaOqG0RoX%2BaQh78gMbyFVEBjTMWXaqRHs6w5hDN2WgJXc3LGfc3t8DseGVjDIDcPBzczExprTrEHT44XpZddNH63guh8nti3d9%2F%2FAg4vxBsyWxBBrGIm3bBvpefKPyaPcDM1s%2FDUFgSztf0C%2BcWIFkugKgjZLKIlJEhYetOhEVO4nM0uOuD%2BVDir994laHQVTKOSH%2FSpwMt6XbJQ%2Fp0QHct079zqBmggMrnv8nFU7LwegBTjlNPz87uiTHWjukcTVGBU9%2BffUCIcURI1U7AAECK0kyhV4bwl0LxX18YVbkssKbHevwjHm6KFdNzgh2qVxgcU7yjWwX5YOY0dVrDCvocXLBjqkAY4SeyDmFwDN0qS0Gir7KlzBxFpF7mGf%2BuMpKHEjd99SFw4UjfVxYfSS%2FKTnbNhzEn1C9ce0kBAmtygnFJvzLq2z7JRcB2xwnek%2FhRdsWiih90mhRgemVqgEh9OmqDZj2ehi3ZJekRdZHpWJTgRPalz%2FlPaYvrR1knhOy3tz8CKBngLIG4dACY2lT92VXp3JEf%2FB4RUOOXeoR0CkNk2ANRdDsEQU&X-Amz-Signature=77d07984568412a7c86635fe18009629658d8a2824fd0bce2932aa75c3296e40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MM6ZMN4%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDJK4ctWUIMEwR8S9jn7ZIWfnNymERj6vqhRBoeY1kf7AIhAMWvDI5mYkSh0bSbmh0b0YsZPwxMfHw6No5XXhrQVk8TKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgymL%2FcLYcI2w8zibE8q3ANM9Bg%2FgPzrOKxnWtvIUByPB1DnuNDr6xMunzkWd0d%2BExIAywkNb2zUA3QOBjMzyP0EB8JOLNb%2BHrDaiE3CRw8UtWEIeqRt%2Fale33e7m500kTdu%2F4uPyLwInB4z%2BBkuZ7SLKqqfgGaJuucmAVl3gj2B%2FXJyv3WD9TsZa7xL0%2FKCFIqULtCXmk6PbqARdkWpzbT7S5wXcOdY37he1tfDpCg5GS4u6ynoZ2quAR%2BUYheh38%2BW%2FK6C%2F9y0YKG4l%2BO4n1W8Gf52HI22UJ7JkRwo5UqsYWnenaHHrXnf7xNvt1SKaOqG0RoX%2BaQh78gMbyFVEBjTMWXaqRHs6w5hDN2WgJXc3LGfc3t8DseGVjDIDcPBzczExprTrEHT44XpZddNH63guh8nti3d9%2F%2FAg4vxBsyWxBBrGIm3bBvpefKPyaPcDM1s%2FDUFgSztf0C%2BcWIFkugKgjZLKIlJEhYetOhEVO4nM0uOuD%2BVDir994laHQVTKOSH%2FSpwMt6XbJQ%2Fp0QHct079zqBmggMrnv8nFU7LwegBTjlNPz87uiTHWjukcTVGBU9%2BffUCIcURI1U7AAECK0kyhV4bwl0LxX18YVbkssKbHevwjHm6KFdNzgh2qVxgcU7yjWwX5YOY0dVrDCvocXLBjqkAY4SeyDmFwDN0qS0Gir7KlzBxFpF7mGf%2BuMpKHEjd99SFw4UjfVxYfSS%2FKTnbNhzEn1C9ce0kBAmtygnFJvzLq2z7JRcB2xwnek%2FhRdsWiih90mhRgemVqgEh9OmqDZj2ehi3ZJekRdZHpWJTgRPalz%2FlPaYvrR1knhOy3tz8CKBngLIG4dACY2lT92VXp3JEf%2FB4RUOOXeoR0CkNk2ANRdDsEQU&X-Amz-Signature=ded56fd9f0d3c93c8afbd8df46676cea7e134c3db829df8048af69016ba91190&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YKJCETO%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIHAZp%2FyR5IfwyG942G5oN3gMd%2BMJixIJpJwKD0nOF96PAiBoAiBzxrXZ0QaVRWrAOx5uwhPvzVUJgEhh56GHXcA%2FCiqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMV4tyz6jSHajFesi%2BKtwDwzJYBA2o7MCYG3K0YOMY5h4UoqxQIX9k%2FiXmoGdf8iaGqCWLLxR3K7UTDWm2ha9V5JJ5Mll72zA1F02tPf5cLkYkoQ7la6hJai41tTGnk5NQADGJ6hFjPao6AQTyuSmVNvXdN7dg5H4nJKS5oSwLwuGi19CzbN53gbasf5L4LvIg5bklx6OAXVu2oMvrvYdb%2FMVUyuNiHICZTN6SfUJu5lXWtZD97CeFZ2Y4WDYhx3dfxARa8kSdFFJxt5iD%2BFlyRtky0cyK404gIYUA%2F4cyI3%2FHKRzIjIqwh59Tuksgb2NQyFtFTd8UzD5n1culTQ6XI8cSjKuQFiz5rBAmjFX0XZUMXsN3UO1bQLTpTebyJzBbrwDpMUI95EJZtKtX5TsRwRCvr67WTzZmHJwWIbuKfKzFVHqjV%2BWerlx588B5AnGJHV3%2BeoS2%2Fgzvigq64KniWvTZucAVoYDZKVVz%2FR0S2dM5NFX7AeVYOL0mRTPZ9tmQfxocnrUKRqiPJu81v4ndawQFtPwk1QYE2vf4po1CY43M%2Bn7mLaOrekr3vg%2Bhpsx9%2FiGTn7OgagVJKRgFNrcHkE49MedJpzcw1ykkRmakecvGzLD9d6SdwuFBr3Otmi%2FxyymacWogZau4dikw%2F6HFywY6pgE3qjfyw4s8iJaXCRPCUHelUgv6%2BGJV3Cev%2F3dbypEm231dcWqRH9aKr%2B9TMyAbjqEB0s92CiEBoQhR3Uzzu6A2arxrNg2DPII3WmgMbeei084Zu1YaYQj0BvakmjA7RASknSeg8feKMYSC08nETE9c%2BFz0gEjMowLx1Lw8U7ee94QrN9wVO7oAu6%2BvkVDoxf0rcRt4uNFid7KnyK6Z7V3dKKtlQN1W&X-Amz-Signature=45d4b7e06aad2f265032d9d7efa87b42f211c1a140a4751b4b9bb5d805834e25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NYED42F%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQC06QAB2iP7auPzkYBbkpy%2FUMi5UjAGsYuOAgxLcdNlbgIhAKHFGNzyxn1w%2FLYLZqnLpBf4NSuASULALgMa7YkeByDeKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwLVo28CW9ph8F6qrsq3AM0Z1gcfJrRKCzhPJfslPup5Qn%2F6HQ6wkcE4O13%2BXd71h8qmzExbGOvCPtS91NXk3thW4gsFSOsf4BO6JIimBCJyiugyA%2Bhk4Ms%2FItg1sSx304plNZzKwgHbTWHvmiimWHEi5uUXe7fKKgK8VZVmV6lWHt2xIISHeWzYfM3k2AoSGogAtxgexFuv1KB72W0ssqKHTYgGle59pb4hvlfFlGbo6eoQVSEkly1uyd6hc96lfwbVSXImKvAMv3ms%2BYn12TQ2HhijTH18f4q0dMw%2BkUCcqiQoMpc%2BRQupkmhbt67BBi6181suUs7uXVlTZqfz7EIJ9Phs6F1uTinu6NlLwPChZId%2BNRfUBxZdlUKzpfZcH1b6u%2FqvuUIka8hL8G14uDDM8N2fUHUN%2BoV5BZwo33la5nioBmMqWennc2wNsVVExCTkWP%2BJoGkZqLjswIJN%2BJhsYsoNVs%2Bihu0QdlhGtCUvE2LuT9Kldai77hTcx51RZB7%2BXEUul5nOhxjBgo8LUp3RQp37K9CEbNIrLjiDDGj3zthfIb5RXhUVl%2BaOSt0Q0WRiTs0a22X9ILD8Lhl%2Bp6Z75qKCoY9EHz2vynslTSG4ZkF2HpCxJBVUzjW8RY7XXhYkiv56fJPuRpWljCRocXLBjqkAejVa%2Fl5oBynHOZZcta48B95BPgG%2FtnOBxKKx4o6A633qrMnSmAT8D%2BHrqDCJppkay%2BzAV%2F3NPF%2Fr%2FPQsUl14olASYXMAmxAlrNSgstic8svNBA4Q5ZrPBSoHKkRnXZrCZcMLC5AyiutOi4w8EF4l9GwARiPPvgn1K6q8e8yQ4VUetgBYN5gAEnO%2Fm9WEk8I8nN%2FUIUB5%2FSZ2NGZyES6hJxpBY5k&X-Amz-Signature=0604e6ff90ec88566241aaf14792c7c093a5d8165a8289a5e994983874a4150e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY56SGLZ%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDOiH2ItILpSlMOkeS3a9YB981ucioxPYUqGxetEm1kvQIhANfV3dmdEhrobHhYBXDteyMag61aUJGXmQfE5pnU7E%2FmKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgynsSDz7tUF9uLsgF4q3ANHGgwmB2s4Gf8Ge%2FGxfPHR2NShVeKPRxSTypYoaL2PrkjDAeU%2FznxeIoHGcq1VJOFFQS%2F3YslR1f9G44V%2BqSJc15eynUeN%2Bb%2BE7GdNygTJVqOpDI2co5JD38U7XmaW0hb6a8faKxRflzB4uWtEBvj2F5xjvGVombSsKnNyRH9TWloeImgca7tGKTVbgSTTExmS5pSnsK3S5V68ca%2BdzqbOeHTGx7KIajnfEBYRsJe5xMDu2Weh9wuaNUVKQ%2F4tt3SPosR%2BMTcwTikwI%2FicV0yWAf6C6HEwZVGe78XxntPvcC06ua9Tj142MlGRRkKCuUouwI7qpC5RrkwLpHyxxzdtrvSTeCCODD97cJsLQdnyhUklk5k6S7oXIZSq7zhflTAQUJA87zqV35VZCIkghyiE%2FMKwuDBk7W7pccEgCfJEsg4g4Gf6MkTYbU3nrdoSZghbIEU4JHv9Eg5%2FXBVcoFqgtJMR%2Bng0XyzTsj6i7RL1OESnuJmBB64tEk8DZPGYxsBH6w1D3UrcYPT0D0uzULpIgVomL7Dy2eLbZJMOiiUzTMmf9z8wHPjpgOIrmAqzxKEOe%2BAlUmzKH9M%2Bk6ZZM%2FHPVlu3oOkQnltGGz1x1Z7NB5hErbkZIyI7VB8LxjCwocXLBjqkAe3posf%2F63OT98x2821ONaHNgSvlweCURbm3vfc8GMFjLVm1mItGX%2FG%2FT1V1zKaL1JS%2BQSx%2B6AgUfzP6EqCYOQoFesXnmkOzcV9%2BmImY4V03h4UK%2Fu2vAveu%2FmuhKl5EfejC85xdpqjpqrntZd1pFQ3BRm6JIiFz5zDHoEE6MMry91L62gOZVcpl3tBeipByZyiGSjv%2BOzTFRTQ8A4u72mXv74Hd&X-Amz-Signature=645c4d1d4e3ddc0ba8de8b485d82c88a8185edf39f00089b99467703cc9b815a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWA54TLC%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDQp4%2Bqa7AaOMnF9afH78%2Bn6Z%2BpcGwtQFLn9t7KqJokmAIhALuL4xoQwMNSUNf7QQ6iDFMEySi2g9LBJWilL7Uwws5GKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyvDXyE0rbfQaSRRAkq3ANKRYLrUKuV%2BQyzAnMG4cRYDGaoQ7S0MmIlIq%2BA%2FxPRfCrYQVu9lOKhodYYuIn%2FfISp2K9YM57TV%2BAe3y%2BE7KAm%2FhPbHo%2BtuQH581K9ljGIYqXb74uXG0GJxMlFAQbrZ80hREZhbLgOlVL0iBo%2FeBzYQKVhCiuHxSZPRKl658VnGNIdfYhpdvxCCuE9%2BtAmbDbq1d5ziLXsDQgXs4aEOS29c7kP8g7AE2Gsk21bcV%2BMd4Jjky5lHc6YdFyHmb0Dnxtl%2FzLb7x3Igw0EBz5k9LnpwYf695WygaqDCyA0pPV6qrgIISnt8rz8OZK%2FcoRMvmcBdEPGP%2FFK8zv5Qsazsy23rCJNuditlPO%2Bk8F9xZppEhI8VOFBrGCZNk%2FFYB5C8gJIh2KgZpsh5Zu6%2FuxDNB06JC2pRsKcPLuH90dBcnHAlLPhdjmGLtxryZhKqwOLRCPP%2F5yigR2%2BHFdekcjF%2Fsb8lsXPfJ4tacZNQtXjv8dqtAYCLcPpVNLe4x15hp5DFCpEXqkyY5I9%2B8qxoGuZwnBXgel8ABA7t8wTqU%2FdSAOYhcROektoPgxeVM3Vk9pTYcMTNgeQ2UlGoi%2FK637LlfZPjvLJS9YBiNOCbeERiiMNCk6Ad4z3WQZUC67L8jC7ocXLBjqkAYvGrAnlJ9aHxw2MBsagD8cWhF2NoilL70qyYBmUqL%2FzkRZy9ivJdVv47aSs%2FRcfsbABh%2Fm0dWkTE9uWojNHWVRZPURfhIW%2BSEy9FddAhvLvpmzIHnaUrPlFnKuObfcikUOwgZYWY9vQc%2BGK9357ssX8nXQkjhdxM6SsAIpujmKdwoYT4DEHLzykgfmn8GdA9hnhq5jSjxeKOXj%2FBxLSv%2F7KO9uQ&X-Amz-Signature=384d539614a0d714068c0414f4c55d96dab9e15d6dfc7dcdeb18692a978aec44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWA54TLC%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJIMEYCIQDQp4%2Bqa7AaOMnF9afH78%2Bn6Z%2BpcGwtQFLn9t7KqJokmAIhALuL4xoQwMNSUNf7QQ6iDFMEySi2g9LBJWilL7Uwws5GKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyvDXyE0rbfQaSRRAkq3ANKRYLrUKuV%2BQyzAnMG4cRYDGaoQ7S0MmIlIq%2BA%2FxPRfCrYQVu9lOKhodYYuIn%2FfISp2K9YM57TV%2BAe3y%2BE7KAm%2FhPbHo%2BtuQH581K9ljGIYqXb74uXG0GJxMlFAQbrZ80hREZhbLgOlVL0iBo%2FeBzYQKVhCiuHxSZPRKl658VnGNIdfYhpdvxCCuE9%2BtAmbDbq1d5ziLXsDQgXs4aEOS29c7kP8g7AE2Gsk21bcV%2BMd4Jjky5lHc6YdFyHmb0Dnxtl%2FzLb7x3Igw0EBz5k9LnpwYf695WygaqDCyA0pPV6qrgIISnt8rz8OZK%2FcoRMvmcBdEPGP%2FFK8zv5Qsazsy23rCJNuditlPO%2Bk8F9xZppEhI8VOFBrGCZNk%2FFYB5C8gJIh2KgZpsh5Zu6%2FuxDNB06JC2pRsKcPLuH90dBcnHAlLPhdjmGLtxryZhKqwOLRCPP%2F5yigR2%2BHFdekcjF%2Fsb8lsXPfJ4tacZNQtXjv8dqtAYCLcPpVNLe4x15hp5DFCpEXqkyY5I9%2B8qxoGuZwnBXgel8ABA7t8wTqU%2FdSAOYhcROektoPgxeVM3Vk9pTYcMTNgeQ2UlGoi%2FK637LlfZPjvLJS9YBiNOCbeERiiMNCk6Ad4z3WQZUC67L8jC7ocXLBjqkAYvGrAnlJ9aHxw2MBsagD8cWhF2NoilL70qyYBmUqL%2FzkRZy9ivJdVv47aSs%2FRcfsbABh%2Fm0dWkTE9uWojNHWVRZPURfhIW%2BSEy9FddAhvLvpmzIHnaUrPlFnKuObfcikUOwgZYWY9vQc%2BGK9357ssX8nXQkjhdxM6SsAIpujmKdwoYT4DEHLzykgfmn8GdA9hnhq5jSjxeKOXj%2FBxLSv%2F7KO9uQ&X-Amz-Signature=45203e716c7c5bf1c373db881a6772530ab74fe5c85bbe88c06e4496367217b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JYM2ZDY%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQDRzjvKnda23l8Wdx1h9nznlrXazr8wcbTiwNHrJlwm%2BAIgHgr4eZTmd63OeBAvtv9IOJvGlyj9j0VIWzEAug7oTZQqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLBE64eppHelhOEBlCrcA8kcmlgh33fnXIBoSWtgmO91wxEZpJJm4Ut6QbY1LpXr9R10p4PPFiuxycfR0352C4rd1zzJZQu1TPnr25otQDHxfcm6MNP0e6wDjsN6CLoap%2BaE%2ByCAun3L3CNObYdpECrAyYRdzySHv07UoQuCNi1q9KFY6lEZwnR5Tprd356Qzx237GMfRha4gQTS5RBsXexsfn960OsOsZAx0iswgFk9ddR3unNMYbKk0lC5%2B6jYIDbgLt%2FyVntALBhJ4nSVp3pkIy856ka4rbpVilq4jb8hf2ZG4tgPXM%2BYxKOe6xHNUc0PYoiBxFRKHSOZ9B9TuSfhrO%2BA0SSJeqPLnoEDAKIlIjyXFYA5QzGWa9cUM5r3XEDDyM5mGJV6VkqXd%2BSWrEGgXHgha%2BRkfaDG4UqT2obeP1nwpD1roUxvsvSAt55CEcbloCzRbEZixw4xYI9LRerAeCoLpeAoihn04S6kyUj80szDgiDbTxozp56G3a4lSgjGtmX2dn4A%2B%2FSucBOz5gqUJIJkIBc4Vc7hcAVCjzItLMM5UbaR0r%2B6fZVpxHErklCycimRHixhid7rNBGBVPW6X%2B1Q%2BDuYXsQje%2F2a2r1TfAlZ%2FlToONvFQJ0yQyRUeYw5YoPt6JCIQEQyMJuhxcsGOqUBWANcwguUQRB1wnZXrtZsNaP42zOjXKXdk8EOfqxsC3LvESrveHFxzOld%2FGoh9ESm0gZxhBZ5ls0Oh7VAi0BLDajqKJ%2BrnxP2hlJbQ9HbkZzO9%2FdRqS8gRwz8fjAQqmoHv3UOgY%2F5vYUhCZ26spTAcxZNvcvbNjV0W4rsSC%2BMA%2FXkeF4fTr5EPYPsptu0KmrfzYoiPSVXVG8L1PNWyM25ayIJZPsN&X-Amz-Signature=2132a560629b2545932027f7de27618bde311421466fa77e0f004085eb56dcf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6IQR6VH%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQD2jpst0lgp%2BIjfc1zbkQRrb4hk4%2Fe4IQUUfwYjQb9XigIgRPG0Kicuaqg41cshPH33UJBobHW%2FMllFvttihs4oj04qiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJFTHgT8ESTntV4SUircA3O1WLJRzkkYS%2FOY8A2VB5PDYL1PbEF7k0wHvUYcXh6mMPrklqXQUmMS6zr99115l%2FIOeP3opyOixbgi2%2FI5OWq1c7qZfw1bn5OUycQR5YSB7gSAeF2vpCSC50TWf1atrcwZPQTKqpaBTBI6ucjOSOyYT1IDn%2F8oSFBuVPDRVxwqwkw85sB9MbKwmj9o%2BgnlEALHtSnbi8FaW5z6tfN3BSE7d9lw7vxksOlBEDWiw2GxFrXoc0hiuMQqCpR60nr5PsZ49DRaZvl5DxpybkLYj8Bn3sB4HOXBK66FASeekmyp8QjBndpc1KRU6kgsarQg1s%2Fm%2FcHrJ9leZ3ZHbDWHbv4F611A9CpvKQa4cB2yZouQCwclh6t9%2F80t9FGajHSWpQljwqjc9brr%2BondOcUVPlfIrfaZ4%2BRxjY7j2RrutFsVawVGiRPGSAKWL%2BOyYCTBgkeGNL9ToF6%2FWYQ1T6VO2RehrOX%2FbA1CCQhKf6ZZRL2UGOlBTy2QPYL0QJgtXDV9uCSK1503f7iw1%2BhoWKipiMxrPkuQqABP%2BLYsNm28eMp8D0DkPiF2zZtYDAvaZ4JMedWetnO2dUNuLIB50XM7jVJ%2FMRhjY3gGRcVUZz7%2BMeYnHQP51HUUeChw0tRAMJOixcsGOqUBZBl41Lyia5mxGZH3I5A8hwV1LpqaigmY5xRcV2Uwsx1Gh7adS%2FD2W3NeSV4SbeOaIq971Crd%2FMGwRSOVG8oo6My34yO%2B1cfeXP2IZsdFaRMIjtsaweYeuMOTOhUpRNbjA1oP4AVpL0tYGN2zAw0CuxjHTeJfUTofTZfbQnXNRQ%2Fo7Xk1PhZL66mkGdQfR0l4s%2BKcM9JZG4GndRMG0gAXTBcYHKl5&X-Amz-Signature=616849dbee8fb0705504a9584be6c3c2f33181c8d185c539e1a38334ac0271e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6IQR6VH%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIQD2jpst0lgp%2BIjfc1zbkQRrb4hk4%2Fe4IQUUfwYjQb9XigIgRPG0Kicuaqg41cshPH33UJBobHW%2FMllFvttihs4oj04qiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJFTHgT8ESTntV4SUircA3O1WLJRzkkYS%2FOY8A2VB5PDYL1PbEF7k0wHvUYcXh6mMPrklqXQUmMS6zr99115l%2FIOeP3opyOixbgi2%2FI5OWq1c7qZfw1bn5OUycQR5YSB7gSAeF2vpCSC50TWf1atrcwZPQTKqpaBTBI6ucjOSOyYT1IDn%2F8oSFBuVPDRVxwqwkw85sB9MbKwmj9o%2BgnlEALHtSnbi8FaW5z6tfN3BSE7d9lw7vxksOlBEDWiw2GxFrXoc0hiuMQqCpR60nr5PsZ49DRaZvl5DxpybkLYj8Bn3sB4HOXBK66FASeekmyp8QjBndpc1KRU6kgsarQg1s%2Fm%2FcHrJ9leZ3ZHbDWHbv4F611A9CpvKQa4cB2yZouQCwclh6t9%2F80t9FGajHSWpQljwqjc9brr%2BondOcUVPlfIrfaZ4%2BRxjY7j2RrutFsVawVGiRPGSAKWL%2BOyYCTBgkeGNL9ToF6%2FWYQ1T6VO2RehrOX%2FbA1CCQhKf6ZZRL2UGOlBTy2QPYL0QJgtXDV9uCSK1503f7iw1%2BhoWKipiMxrPkuQqABP%2BLYsNm28eMp8D0DkPiF2zZtYDAvaZ4JMedWetnO2dUNuLIB50XM7jVJ%2FMRhjY3gGRcVUZz7%2BMeYnHQP51HUUeChw0tRAMJOixcsGOqUBZBl41Lyia5mxGZH3I5A8hwV1LpqaigmY5xRcV2Uwsx1Gh7adS%2FD2W3NeSV4SbeOaIq971Crd%2FMGwRSOVG8oo6My34yO%2B1cfeXP2IZsdFaRMIjtsaweYeuMOTOhUpRNbjA1oP4AVpL0tYGN2zAw0CuxjHTeJfUTofTZfbQnXNRQ%2Fo7Xk1PhZL66mkGdQfR0l4s%2BKcM9JZG4GndRMG0gAXTBcYHKl5&X-Amz-Signature=616849dbee8fb0705504a9584be6c3c2f33181c8d185c539e1a38334ac0271e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DW6725T%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T231333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIDvURr%2F%2BOGIm6eVLB2bX4azEZWer8KQiRMwbbvRsmIvcAiEAn8%2FA5MK15Zt9gz2%2BoxwvAMkR%2FN7abQqN%2FGQlsgUg8%2FMqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKc4TZhmo2el1qyafCrcA9xTG9QHqOwoeC9vBkSNtT29vaMOV81HkMlZ9QfapJlUq3YscmYVlI6cAlHhVHHBAPKvKtRsXm8woOlwrKhQU5XBOxSXgff6fYqC8XfP0lPa79VZBbgqEG2olrVWE2vfM6ZKyyJmQkyG7pJ9yhRY0fxLpjSlqNHbWiC8CcxobFr%2BkQOBalAbZuVlRDboiZ0u0ry6Afht9Hs31%2BPgPv2NadA26Iu%2BQH1lwhyLFsJaAqWH1g9GZBaXxqDuk9tFlO6V40xtjJrsNWH6NewCPSzlAPjFD61vThq%2F6iXf6K59JRvnV780KDsHZSELHqxur9VLcL7bURztQTI5xiYJSm9Wdq3V7FhFYSACCUY3%2FbalvHUFaLTAnBx%2FGCoKJ1qXCYvrlxUcks0H3EpIazcMNti5jeWaHh5yp3DBfw2q87WpiXgN5Vf6HluLgeEg5oBQKWSOAqLS8k%2Bh7SpoaswM6ExRjIx80gcuSfxnhoVdO623fT37ufje53R6fmqB2kG2EgXpB6ldy2aotG7FTzY0pPdIxYRqDTHlY6h1NDAYl1qd0TIqQh2kXrJrwrdYGlqZ6Y%2FsZFA%2FYRNqWpWorej6OxHF7Ks8uYUZ98tpUAKHSxBDqiWEFE9Fvzxzx8zUClw1MO%2BgxcsGOqUBGvnRdfxBaZw3S8U6yjDb6B5XJeqUHVG0%2BPcj%2FtqNF1oAAWSh%2BiSRMi97JDy0DpPcVdR4ULEim6sbpc5lCVWM9KPlA%2F%2F%2BJsAct0aeUJwLworv%2FUdUuvobAouceiDPPAlf1psqG4faYTeZf1XH%2B8EffHWgKfneK59eskE0Z0R%2BbI9U%2FKYSlXfKLtP7iFDZdX3BP1qW%2Fq38UVx8msaTph7wLl%2FU5enz&X-Amz-Signature=407f67aaf99e545c3e298b1798b8b8a24a5f96bfaf01396369e30d74db3ed048&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

