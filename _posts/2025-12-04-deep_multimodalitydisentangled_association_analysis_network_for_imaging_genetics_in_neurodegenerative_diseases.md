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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HVLQ7ZQ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBpiqYNHjpk1nJadjIz55R%2F6C5mAyaYiHIrPYDAd2vuhAiEAo7G7u2nhYMN0JARLPgh%2Bzw8prmqR7Ga2wwhn0Wkl6bkqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEcrf%2F%2FidbI8TLo6YyrcA9soYs1it9y%2F%2B7N34U0DQkXJGbR65uJeWxFWYf1EckDiw40d6Pmff6TnaIeTom1Cbgipv76kLRTsCJTShcRxfHfHYHFMx%2Fj4jh3RHCoZfofVIMUVIs0bQOAX29qcVpZoh6NMghmXDAev5k8M0UyjKY3a4DuVVaPsWz3f7%2FA6Qk7zWfHr6VE1tZu1yp1E7IZl2037E0jmtauAO9dokVBuFvFNFCkFjnKPeeGJiyFbIDva%2FJ3AXhSGPFVsXuC0dYEZF7vLA4ER3VDQ8bcW6cktZNoAlYAnJ4Zh63Ntgymekq07QDZ5iiYNERc74KlHHU0RuP71CYP4oLckHVjFKY%2FPyU%2BmAosXZNCP4TJ4Y5fF4KBwhuDXQogPyb9ELF9OytlL7wnxF3fQHKYWqFYyGXWCduOjSxEb8TMXZvqhoFLp%2BRobve39WHEjq3VnB%2BMTgtv2zTX3rPhuB9KCdz5OlePIlqcsfvVP1xKnMGhYv698iHcEnaz7EVTBhoZlW44TGA9RpbS6kF9oFEmk31h8v9KhxBJ0G12yDa1kg3E%2FaWS8SsBn8H5nnXhc7eVGzVHJCPv2F%2FaA3r7FjNNgoNK9dTb7Z7JdJ4%2B0O0VuXj%2BPiLQ6Paub32O%2BcCGJsWPdTBjhMJnAhc8GOqUBfuo0oPIEShgfqs4jfzz%2F1wa9ofGnAQpU0Po67YG8zJdMfJRbECKI4FsozoT5zCqN%2BN60DJeIYaGYhEkQYzCfxkbQveNMoaKR1ju%2FTj0bqtfcQQuVrrpxzU60hQwi5FYJrJ%2FAvH8jjLp%2FxYYAP8u17Vm6nrJ%2BtRzVpWPxpAKzS2%2BUXqVSSUqSV2PlmFWM35tbGYgloB%2FqBwn6dhA%2FiUPZ%2FDuVA8To&X-Amz-Signature=523fd4d440286e48df41e83049e4780099317886a23b9c2a82f963f8b30b8ea7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HVLQ7ZQ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBpiqYNHjpk1nJadjIz55R%2F6C5mAyaYiHIrPYDAd2vuhAiEAo7G7u2nhYMN0JARLPgh%2Bzw8prmqR7Ga2wwhn0Wkl6bkqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEcrf%2F%2FidbI8TLo6YyrcA9soYs1it9y%2F%2B7N34U0DQkXJGbR65uJeWxFWYf1EckDiw40d6Pmff6TnaIeTom1Cbgipv76kLRTsCJTShcRxfHfHYHFMx%2Fj4jh3RHCoZfofVIMUVIs0bQOAX29qcVpZoh6NMghmXDAev5k8M0UyjKY3a4DuVVaPsWz3f7%2FA6Qk7zWfHr6VE1tZu1yp1E7IZl2037E0jmtauAO9dokVBuFvFNFCkFjnKPeeGJiyFbIDva%2FJ3AXhSGPFVsXuC0dYEZF7vLA4ER3VDQ8bcW6cktZNoAlYAnJ4Zh63Ntgymekq07QDZ5iiYNERc74KlHHU0RuP71CYP4oLckHVjFKY%2FPyU%2BmAosXZNCP4TJ4Y5fF4KBwhuDXQogPyb9ELF9OytlL7wnxF3fQHKYWqFYyGXWCduOjSxEb8TMXZvqhoFLp%2BRobve39WHEjq3VnB%2BMTgtv2zTX3rPhuB9KCdz5OlePIlqcsfvVP1xKnMGhYv698iHcEnaz7EVTBhoZlW44TGA9RpbS6kF9oFEmk31h8v9KhxBJ0G12yDa1kg3E%2FaWS8SsBn8H5nnXhc7eVGzVHJCPv2F%2FaA3r7FjNNgoNK9dTb7Z7JdJ4%2B0O0VuXj%2BPiLQ6Paub32O%2BcCGJsWPdTBjhMJnAhc8GOqUBfuo0oPIEShgfqs4jfzz%2F1wa9ofGnAQpU0Po67YG8zJdMfJRbECKI4FsozoT5zCqN%2BN60DJeIYaGYhEkQYzCfxkbQveNMoaKR1ju%2FTj0bqtfcQQuVrrpxzU60hQwi5FYJrJ%2FAvH8jjLp%2FxYYAP8u17Vm6nrJ%2BtRzVpWPxpAKzS2%2BUXqVSSUqSV2PlmFWM35tbGYgloB%2FqBwn6dhA%2FiUPZ%2FDuVA8To&X-Amz-Signature=523fd4d440286e48df41e83049e4780099317886a23b9c2a82f963f8b30b8ea7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVFYYV65%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCHzlp%2BvlOQT7i2n7F9jM5K05v9KD%2Bnl%2FZPaxUPyWDXEECIDTV54yaIMW6U2XeAmixrX%2BevmHf0GqfI3H1sD8bs650KogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzFQvvQr1psbZ%2Bj0mUq3AOOvcb8S36iOrcejw9hZmWw8bwESGvBuejiPQgaotdUkgy7SL3XgyHAOgqXGAO4EI1yfNzGqgXz%2FQubPtwiLQ9dpWaugK8EFyOXiYozozHpsXmJUCFTKlb%2FLwBuOvTWpqVqCuZoz2VdhRsP8zoAKlQzahOflbcuGJ6qn6cMS7wfeI3otYSrRXFNlDb4WUezkLrWIGujVbztTLexxsdcZdLFTX3U04zSA%2BRY9MD7lkLSJcAubD3tuU4kNoQUw4cJphmCu%2BrruVvo1ZA7I8Fib7WojAqQVKuE6Kb28o51yu7Ssfzgm5B%2FpD%2BgxXJRxXxZ9Y5ufRuT%2B3SFYe8aF6vkhDZRujerPVnukRQxX%2F4brmAS%2F83II5WvUVxwdqu0SmUWpDRje6ZswSXG3FtMSAW8ht2CmN9R1XvgAaNfzKr0ORvj1wVPR4DoeJ0d57nZ9f9Hv5UbwYs4aTZo6sUYtjEPvOrdrANaKJY5l2u3qBfOtXG1Gkc0QXJ%2Ffo6Q365ot%2BH2u52Ie9jVinH3QqmjufJ550%2FEE4CW0KN%2BzKBoWuJTjLvxJKlHrau8hIbg61LPzGdEvsKFq4lVjEEzLDPerhO%2BWAalC6Lo2OiLZapKC6JX76n24whhx3xjOuFo6WTavDC2wIXPBjqnAVpfaznz%2FcpJ3gsXzQdu6uUSpPco9DrV351qt63IJCq%2Bh9Qw5GiORPXcVCfu9XeW5P6aMmCMpVc354kFLF2D5dWxhlSDaEy%2Bvu6T5OWBr855OX4fv7w8brh6zBE5V9r4EXkpOZ31F2a0fW8UO1ipplE4rblKqMt%2BzhZSZmVD%2F7DEVpbujaJmqenLdrzEWfpLvWqjtgvk9e0aqmCWPB6BK7MXUrZurdYw&X-Amz-Signature=8ec253c6645af9067905b6b558ebf6d819ce97250641178bcc2f483aceea36af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HWNQJXR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoET7Hy8XQp5LeA6G1OR6mPw%2BHEi3DaQUzvH%2BCZnx%2BKwIgVTgK%2F4TGwJ4bnQviXV%2BSznBGU9Y%2BT%2BVxvC68Ly7wsPwqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIZZdwLAS9rdU9eEeircA%2BGupFpT%2B8rF4Z3R1n3xCgesGvHDxfPNIytpMlHlSXzu4xf8SkZgZ5DjpLcQYReLu7XqY53zTaEM2Xy%2F0o9VZNdSrlOyVOiwNlC%2BB%2BOczYsGxE3EiH6ZMw0asbAOK1yiu%2FHq3u3xDu3ZL44D%2Bml3K4SM4sRjcACSM3Kl7JZDulSKyvbWkHK3mNq0ZhL5Kih9evaOO8XHW30u5rORk6%2Fa2QY1Bf%2Fgns9438o1%2BKTrKu8dw7%2BKy2YqoEUKKYvpUQH4%2BCC5fCqNxcC%2Brq1n%2B1rzjoYWYCLyV9yzfTs7fS8nd72Z9e7kzETSSKlaM2wI6iCXeH3pfonKOpzD5zD9dfrhDprLOiB4jebVmlskXds7POzqQ9aNgi%2Fc8m6wbl2WmsPvrSFk016oOVWhnDTov6qrKDJu7klZT%2FG%2B0mSxBKANmybAJdHL%2B8P9UHVdhXlBK9gRa5qUeza96Ef4%2FaCPJE9iMiIIjwS3yyLU9%2Bc09jb9cK43XJwPApmaPeYJNO14aTSHLD5BZcj937USubL2pZkeiUHeymuiPPE665QPjV60cxBb%2BcYsnhQIvsZ2D9NI0HRccIQ5FpCP2v3gtLLYTOZ9urcB%2FCCMcuJVtnTSK2y%2BEbx5H%2BcT8iXJ4vSHdXHCMLvBhc8GOqUB7SmH74avkidtownJGUFOpfCIN4pJTSjNVWHruSaODMW%2BkrORxzs7%2FTbXX6E%2F7nHC4C%2BX8hTh%2FOCcNQpSobfYkrDfLlEu%2FWXGLlOtMFqQL56n%2BWeU2fnFxcXdVblLfUhs%2FoE7ao%2B3LHd7BF7L4%2FzoGsQFlpVe7UvsxP3rcDhLUVh9eNPtFYvsSd%2BUvvfduZbCIuGbypnyn3KzVpDVjZtR%2FcbH8pVA&X-Amz-Signature=e8ba726ff1d579b2d87ac620d06b6ddb5d217495a8badf7d6def37c53fbb7e58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HWNQJXR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoET7Hy8XQp5LeA6G1OR6mPw%2BHEi3DaQUzvH%2BCZnx%2BKwIgVTgK%2F4TGwJ4bnQviXV%2BSznBGU9Y%2BT%2BVxvC68Ly7wsPwqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIZZdwLAS9rdU9eEeircA%2BGupFpT%2B8rF4Z3R1n3xCgesGvHDxfPNIytpMlHlSXzu4xf8SkZgZ5DjpLcQYReLu7XqY53zTaEM2Xy%2F0o9VZNdSrlOyVOiwNlC%2BB%2BOczYsGxE3EiH6ZMw0asbAOK1yiu%2FHq3u3xDu3ZL44D%2Bml3K4SM4sRjcACSM3Kl7JZDulSKyvbWkHK3mNq0ZhL5Kih9evaOO8XHW30u5rORk6%2Fa2QY1Bf%2Fgns9438o1%2BKTrKu8dw7%2BKy2YqoEUKKYvpUQH4%2BCC5fCqNxcC%2Brq1n%2B1rzjoYWYCLyV9yzfTs7fS8nd72Z9e7kzETSSKlaM2wI6iCXeH3pfonKOpzD5zD9dfrhDprLOiB4jebVmlskXds7POzqQ9aNgi%2Fc8m6wbl2WmsPvrSFk016oOVWhnDTov6qrKDJu7klZT%2FG%2B0mSxBKANmybAJdHL%2B8P9UHVdhXlBK9gRa5qUeza96Ef4%2FaCPJE9iMiIIjwS3yyLU9%2Bc09jb9cK43XJwPApmaPeYJNO14aTSHLD5BZcj937USubL2pZkeiUHeymuiPPE665QPjV60cxBb%2BcYsnhQIvsZ2D9NI0HRccIQ5FpCP2v3gtLLYTOZ9urcB%2FCCMcuJVtnTSK2y%2BEbx5H%2BcT8iXJ4vSHdXHCMLvBhc8GOqUB7SmH74avkidtownJGUFOpfCIN4pJTSjNVWHruSaODMW%2BkrORxzs7%2FTbXX6E%2F7nHC4C%2BX8hTh%2FOCcNQpSobfYkrDfLlEu%2FWXGLlOtMFqQL56n%2BWeU2fnFxcXdVblLfUhs%2FoE7ao%2B3LHd7BF7L4%2FzoGsQFlpVe7UvsxP3rcDhLUVh9eNPtFYvsSd%2BUvvfduZbCIuGbypnyn3KzVpDVjZtR%2FcbH8pVA&X-Amz-Signature=2d2a3c352aba3ed3bade592a3e37e989061cc6a18d9e91ae2c106fa8052e7373&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4NSF336%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAXWbvPbrsQCa7PyGMy9GFxK317sD5p5PEyULQc6eAiNAiBIbiSRZ%2BDoo%2BaXbIPWsBkbaoWn%2B6vrtfUuvOQCSYpFJSqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0FW9HwC%2FvXvyV5s5KtwDNo0Zdi0NotSClPVW7Z3gaG%2FZB8Yply31Rln3zydn7ktOla20AYHeAQDbBgEDR0hi%2BxSNCEk9wkWx4gj4uOKlw0XGskYYpg1XpC5iTDiV1kmEOxGc2C5ut60AYl%2F6z41Oz81SOSbxEoOtFKct2mFjF6uehUTcC0y1YGIcC0bhMhizUlQMq4iaUyLiH8T5rXvL9NAKT735YVCuuHRySuqHOpHMwx2XTFdDUPQ7iLfFSDUZSI0p8pwN%2FYHaOCjYBUp2xO6hJdId%2BMTUDDk%2FMaTw%2BsHdME19Wk%2FtlMS87XQgsgfvVcZqBFwHe1Ho77LtgtkyJemGKn0V3xkYMuMohsiZyWFFVG1JfKRMNucVp7kMff4lbh1yFK2O4kCHFGslFN69HuHtPgjZWedVL9ZsQ0tQZH21c8ADKTMSgrOA9T7hh8%2FzIlDHp03tuQ1O2f7VfUNeRcPl9EmvuwNpfsNYV8L72%2BjtxqJN%2Bc0TQ6Zy7EzRFTMM4SC%2BgWokNzq3Wf2efXG09RWXnOxr2MPuQIBo2qTcEy%2FmMAcUoFJfRSVCUMyZI3h16ZAN5orLDWZQ4ZGC%2BuLNFSybPG%2BY3S8OPz8T3FBs6gUAw1z%2FkqzyinvKZD8IX8ZeQ79eeEeQRsMjoWkw%2FMKFzwY6pgHIdfekGwkd0EgF3nlM3S5g2QDOOkSgqQnCsskErcMLlvZvTX0FOP2tQd3Rz2NHPz6jXGQtJj3zacxrsmM7ysgO027sKEvHU%2BDwHQftujXM0DHTPWC4S4B3HrwQPPcULqI%2BecR%2Fgf0mjnnWbF6z5W%2FWKeDx7L0HT0QMJF%2F9jf42XCt3gGOqmbvZholIp%2BpZp41nRTOjPLKSiwRLBRW2Z3sw4ZEkrzVf&X-Amz-Signature=994aa77bfb5858d314a9e2d09fb3a9fa88dbde909d5356fb9f9180666eacdecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKIHJHRY%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBnrAXcEO7Abiq0VlbcC%2BiWNauLVJngyr9zN7FCk%2BTXjAiBemHTm8rvpYqFx0qe7cMQdYA3fYHF22iyJiwxQAgShECqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3hQhigeq%2BcBJvtf0KtwD8Z2f8ou1%2BiOMOB4kEeUFIcED6XeCiD0MBVBRNqr5gYiq3SCdA0X6AyUEZshFXRrvxvWc7KBV8XSf0qTgmfvQdoC5mK5WBJL4WB6kkOUEOjFidC1qz0KcoVieADdziolpdteln9KnrCqvlO6dSaMrMQe2s7sOCVrP9KFsdbdDqA6jhhN5ljCaP13WIRAxFhmr4Q6UG7LLp5xgcXBc5ICsbdXtQeTDBy67Nhm2MWYXX31HTDj89m3T361nL7pSUidWJVEVgGBufDlXE4%2FgTqWyQ2h0Pbu9p4sWguUW9CrKG5oWUrVXgr8P9pf5zRQp8KBYvtVFTQOfs0yEMZSBpOZK%2BgcwNUvaAMwer4HTdfFixhZsK5PCKmwAwrxqSL6evwoOFmcmhJtZ7v2BWJCDsoJy7bTzvRTpj8SXR1kDt%2BzFIEfWWMZQGOCadhO0CiQ5bj78132KQvxArJX8j%2Bi5x1DK6ABdPmzum7%2FOjzqJW3l58WjlTIV4xpV1tNaSrBoMlfdkhJuxohGgbKpawTxevSBHj0zq4Hl06cuL2%2B6L8aL466%2FdtvGFPnTX7vIATSiM70eWB%2F8bB6LXu03os8b%2FEMifPI462LhPGS4BoeFUTPKUyzloOKRBqrYesfHfmCswkMOFzwY6pgHHKC7u4zWzr9XpDS4TNmn9aGsCNy6mdrRbqh%2FT3gisLIWYZfpDj%2BOmokphT7Yji5bXI2ll%2BsVved7Tgu1a2BzhP%2Fqn5c3rqpWCSrE7bAHZVr0O0JGaMEF3IyQLiCUlLg%2FcuPSlS36g1QdhQlItCHX5gnvyQKaAdLzUi02d5fbt54UdSJIEwpQ2W%2BsDL%2BP6mygs0mht204icOWo64yg1TiHLhM%2FSpvu&X-Amz-Signature=a89fe03a2c840fc28d0594cb5fe8ff313a849be100cd0258b50910c0b9e08c69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IZ3DKPY%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDuhYvmuYcXN7YBLQmhSDstadIciqnzUlp7xVSfCMm%2B%2FgIhAMeD5ajnZGd%2ByjqX8vhXj2Qw69rwLqWtrM8PdujyhebDKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwVTWeExhg9aObPwW4q3AM2XNoTW8rIMciqkYzSY7y02z%2BnpYKUCAQIkuJ2e0TZ5KmtB8ifWHfV5pZA1sjbNm77rxFWbGNqJ%2BTIF4LMqUmDN3VKk6%2BiitdhgPEfLSBhrE7PTmqB%2BgM2ZSF878kX8cMjL%2F5u26aye85kajum3xGEojJexl70I1nLd8j3CqjHFaN15CL%2B1YHpTM4mAwIVIWEUR%2BftfqCqNBfUDhYruB%2F1S%2BNCL2%2BQIX370wtlj2Dj9GNAe3WYp2JSRcirBtVj04vNfU4lTZWWIzrABkGIW8xv%2FHhJLgEepl03XdLKAutR%2FcoxE%2BLvFfmbfAh8lZMll%2FW7sx%2FAm4wqc3nI9DbbEqJi5OrgutRROwN8jH27PmBPAO9x3FJ7f9m5a5XPyZRWiPihFqPBF4VdjaQbmxt9fs49fFwXCazmnLtbMS6z13lDUUlCLN07%2FQ2Aa2iBKx0De0Ef0xyrL1XDBhOz1RHoFH9XlSVwKn80QRIFI9uZ91cq71MQ7yDDvzFL5ZX78bBBNU%2BoLlzVO7RQIrsvO%2BR8eCghKnjjCvcKwTNutDTcaIIqJixRArFpcNjac5MWc6uL3ZHuu9OcIY2T4tCTaNDqQD9MVOqU%2FVP9c1yyyort1MDbkehL3CoynJ4%2F1niVODCkwYXPBjqkAaJD%2FGj4lPfEMvDiTO42JI4CjE2a%2FA0tuWK0NLCy4WV96eFHJQqeT2A%2FakT3NPmPjNRNjnn4BbJZD0PW9nQki9W8gjvHzDesHHWr7W4di%2Frxv65C5wa%2B8RyTVKHfav6evLOUTikpEt6Dp5oI93Kr64cLwAqSH7NcYB0%2Fw0TT2HFgQULWt1OM8boJ%2FdZYMyR2IfAF9TSpfASulUCe37yux5X3Cnsk&X-Amz-Signature=1118a862e747cfe3621486f33c6cdcc3d3a6d6491a7be5fd4026bb6abdd3571f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HRSOZWI%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClt02dqEOrMp%2F1P5xPq8dLZKjqm69qwCQzm1I6UporNQIgY3laHkMTmZkb4UJpUBB1sAxT0CG3WvyZhuHInIcL9YMqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB309TnalqCYaiOQMCrcA5hedVwNbm17HDmOzxwfl%2Bve%2B8VPtdcPe%2FS997gXtkb%2BOUq4sb9QitnWQ7REQgLdJ2iwNA16jIm0oZEuMP6Lfjl8DhziUleW51%2B5VgF6RlZoJthOAcmmmusj7TYiVUiZOlYUqHVCF9N9beW%2FofUs2YmyRDs63lLOAqH%2BN4rnjkhHkk86vwlVrxp97cCSfbYpzwtj020dDQAsuXZ6SBBPkoVR7JNgOW5bB1unjNBjKtEyDDOkZ2m5l5ihcp1XYql3XGVKmUv%2FvgBtmeBB733n5Um3YA40iTtQKFFXW8ppl3mIqteELgaojX9%2Bc7KSV8bspBvxnkJ2libJMXtHDBWtcPCqyVUDe79WuJ93D4muLbyIlHaFAUojT2oEhUHRDvq6p019ls1Bz2vMBCsxmWWoMt0hzK1fEJdcev9OMpFypeaZRPe9grGoYKTYvorGW1im2UCvzXduBxIFCPAaNwPMUNr7T9ogqw2snqbV1Qg5oDKF4%2FozTECiXRaRBDBQwCbyFzRZklkxm5V0X%2FhAHjBBhsVZX3JbQ5fm0y00c61jn2b6hQgRpIhW0%2F9pI6xMICRu5wA3IVk2KUt4qM%2F01altFTSp%2FKTgT87mXX7knNiOnbuvZzHBwkfN5u7Fq1zzMKjBhc8GOqUBkdE065NSonlH6najfjGQ0aM1ipJgsckgSYOIrcHFS6Zsn%2B36cGKKSVuEGfEOp48PFtXB2muKrYAiJ95NSqjwqsAoC0UCYvdhueSBQ23qQTxhNcgY6yEm1LbXWsWRpA%2FYk8x8jS7CxpvJABg6pc8LIGH3P16oXem3LEK3tADv1s0B8VOMCrxV1xxPw2duVFGTayj2AqZZOd5F9m5h%2BcNPKiseoRo7&X-Amz-Signature=4ea8164f356f2ccf998fe92d8de19c0959ad4938495ca0548ff676fc53ed8a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HRSOZWI%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClt02dqEOrMp%2F1P5xPq8dLZKjqm69qwCQzm1I6UporNQIgY3laHkMTmZkb4UJpUBB1sAxT0CG3WvyZhuHInIcL9YMqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB309TnalqCYaiOQMCrcA5hedVwNbm17HDmOzxwfl%2Bve%2B8VPtdcPe%2FS997gXtkb%2BOUq4sb9QitnWQ7REQgLdJ2iwNA16jIm0oZEuMP6Lfjl8DhziUleW51%2B5VgF6RlZoJthOAcmmmusj7TYiVUiZOlYUqHVCF9N9beW%2FofUs2YmyRDs63lLOAqH%2BN4rnjkhHkk86vwlVrxp97cCSfbYpzwtj020dDQAsuXZ6SBBPkoVR7JNgOW5bB1unjNBjKtEyDDOkZ2m5l5ihcp1XYql3XGVKmUv%2FvgBtmeBB733n5Um3YA40iTtQKFFXW8ppl3mIqteELgaojX9%2Bc7KSV8bspBvxnkJ2libJMXtHDBWtcPCqyVUDe79WuJ93D4muLbyIlHaFAUojT2oEhUHRDvq6p019ls1Bz2vMBCsxmWWoMt0hzK1fEJdcev9OMpFypeaZRPe9grGoYKTYvorGW1im2UCvzXduBxIFCPAaNwPMUNr7T9ogqw2snqbV1Qg5oDKF4%2FozTECiXRaRBDBQwCbyFzRZklkxm5V0X%2FhAHjBBhsVZX3JbQ5fm0y00c61jn2b6hQgRpIhW0%2F9pI6xMICRu5wA3IVk2KUt4qM%2F01altFTSp%2FKTgT87mXX7knNiOnbuvZzHBwkfN5u7Fq1zzMKjBhc8GOqUBkdE065NSonlH6najfjGQ0aM1ipJgsckgSYOIrcHFS6Zsn%2B36cGKKSVuEGfEOp48PFtXB2muKrYAiJ95NSqjwqsAoC0UCYvdhueSBQ23qQTxhNcgY6yEm1LbXWsWRpA%2FYk8x8jS7CxpvJABg6pc8LIGH3P16oXem3LEK3tADv1s0B8VOMCrxV1xxPw2duVFGTayj2AqZZOd5F9m5h%2BcNPKiseoRo7&X-Amz-Signature=2668c7ce332a9720fc04e8edde383de393756335c3c878fb19d3f9bbae3256bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVPVN26H%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDg8HH24S14EBX%2Fwc6yiV0ovk91bKdnya0aTAyHxtshJwIhALO%2BZ7pKZ9zHQkyhCw4QRsGcSd7VGCpnCOyuivmNn4blKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxP2JPQ%2FE2iLb22q6wq3ANSW96ybmPlNXn%2FwLRhSXHTQ3AyOyXbTF3FJy3rUj0CNHoK07UyPp%2F1MVsKcj4qlailOThJJzfQr4krsmtMf7jKVSFMn%2FezsMpdfidWHKw4Xnk%2BfFMHYVQIs%2Fzpk98tHUaBpYyvA3eRQ7IKoLFfoSqgU9h2G%2B4UU5KkvXAHlZpVIK6EmQwOuEgF1NBSWoTmN8HjnpCK7euS1N34MOTdxRzhoWkCLOxOIy5Kfc1TvODUlGG27TMmwX8Wu8fRLkPXaMaCWQY1NFW4Bs30U2Rep3C4I9EtIRR4fKl2NP3uHHK%2BBfyHb2lRL9lPwoXXSlpMfJd91SWSFJU3wjd0gbSzijqKpKH0lFdDDRF4dIOyhg8loBVV0yQaKPrTRjpGIijrMSjngCswFfLcz%2FQ8sImvFRgtWfu6KGFw0e5mjOAac2E9IB3q7CseiXnpF7nDWpZ5zjEN02YILil0PFozZecKM3cIpEgOZEZUzZPtBcOyFF6HjZzffdBcwNLB9DzxSxCn4cfad4DBUqOZSPf4h9AL8%2BaSUUZsiT1LX7hL2x0AgPk9cz%2Fg8XKWXrM8rQnZb4oasdI5UKl4dQHDff6j3QheZaJFUHW9EkUf3NYXnfXy4e0TcbULhwqMnmW3DoaXhzCMwIXPBjqkAbVtR4zGYAN0yqUy6dS7wPqEcKhJe%2BmyRI9lyUQZpCZVDUI2GqoD69pVXdqv2QJ689vf5DxyRY6zuMqbC%2F8xx1YkJXzVRaDrlk6DbVmlKjchwN%2FwsPfI3f1yeH9STYLNp9kW6VjUEBHurlJRG6tCQ9tMxglEnAILZEpICETPSUN07y06bmsgDrmSSHOd53kJL7D51aCXWhJBrfTGbbBp24mYOOsu&X-Amz-Signature=d7011d679f0d7ed1b57c5fcf2306bdd7b44941d7a217de81a8a0e7bf3c956b4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS4JRDDC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC1175DaAZ6ddXwtFjb7PQwA9FheSqyh7gKEd7EJKwUTAiEAl%2FrrFg%2Bpn7heciq0HJ5ebXV0920RuWYeFtyNME7VLb0qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzpx5yGzOH%2FQEWy9ircAzBMZ%2BTL0%2BNB4msik%2BqRLYViLQIhxy9Avwz9gnYoGhofa60STSJMo3GA1uELUpZ%2Bmjj%2B55YnWrdRgNdXLtNTMlwRebHcZLBe%2By48pUNc2eloibmQH1sTxR1aqT3a7Qgo3zWLCZgnuYYwEw4TZWEoEnBupam2TrWu6FRRU4n%2BCKt37ylQto6ymJFsqQRzvxFVkM9IwOA4t4umG3FuczKaiOuiOXyhJOG%2Fg1rIVUlSvhUnXxI%2B%2BsAjOALKL4GCdBtmstsctnuCUdVyrbuMoYcSddk7fS9YvzdzQumLuCW26MWHhYr8Rhtr54bWEwKEUzO%2BHC21xSg3eYlqducrFCb9kXgYdc6N0%2FVZ5gYiib3l%2B124OalWY5rUddEO4OI%2FkLrQUD0AzI%2BwleuB92WWnJNYFF%2FBB3O7Kj8QXgXULTDixQ1phaG%2BcGa5eiknR1%2BJJG2ViShkbAVrywF66J9YECgX7tXh9ecSMvN%2BXs%2B1OK%2BDJ8Xn%2BUyoG78rVJ3c%2FpvbqWbtWEcTuxmB0gwSax6pAn%2F0R6v6om4qolZ%2F%2F1Ajyx7lz0uviz5auhIONElE8ilDxzmkjNJQGjWo34mvEsMROTz218MuPGQTeBl8u2bijb9dlVm%2Br2wANy%2BEYKMGTgh5MLXAhc8GOqUBNdACM50s4BwwqiaIEucItHa0bTXY2ZgMI9gv7H13xd3M7h8SocpcF0teoQW4fdWOzSP28AKpVi%2FD4mrtXZ79GJeFe3FOQmNxHYoeA2vX85mBP7wtkUryaNwFmZ3VnGLS7qrc2ajwvc1QeRJMEczC9g7GexD05IfmSi1oMlaRQAAgnXQpRUV9ffuPI1lDe5ek7x4xOVxucxunYmHIaUGMCPbT30wP&X-Amz-Signature=542cc413fb26cb55bee2c93433e2903d0f2db05c9666750e0b0d99331b5162ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS4JRDDC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC1175DaAZ6ddXwtFjb7PQwA9FheSqyh7gKEd7EJKwUTAiEAl%2FrrFg%2Bpn7heciq0HJ5ebXV0920RuWYeFtyNME7VLb0qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzpx5yGzOH%2FQEWy9ircAzBMZ%2BTL0%2BNB4msik%2BqRLYViLQIhxy9Avwz9gnYoGhofa60STSJMo3GA1uELUpZ%2Bmjj%2B55YnWrdRgNdXLtNTMlwRebHcZLBe%2By48pUNc2eloibmQH1sTxR1aqT3a7Qgo3zWLCZgnuYYwEw4TZWEoEnBupam2TrWu6FRRU4n%2BCKt37ylQto6ymJFsqQRzvxFVkM9IwOA4t4umG3FuczKaiOuiOXyhJOG%2Fg1rIVUlSvhUnXxI%2B%2BsAjOALKL4GCdBtmstsctnuCUdVyrbuMoYcSddk7fS9YvzdzQumLuCW26MWHhYr8Rhtr54bWEwKEUzO%2BHC21xSg3eYlqducrFCb9kXgYdc6N0%2FVZ5gYiib3l%2B124OalWY5rUddEO4OI%2FkLrQUD0AzI%2BwleuB92WWnJNYFF%2FBB3O7Kj8QXgXULTDixQ1phaG%2BcGa5eiknR1%2BJJG2ViShkbAVrywF66J9YECgX7tXh9ecSMvN%2BXs%2B1OK%2BDJ8Xn%2BUyoG78rVJ3c%2FpvbqWbtWEcTuxmB0gwSax6pAn%2F0R6v6om4qolZ%2F%2F1Ajyx7lz0uviz5auhIONElE8ilDxzmkjNJQGjWo34mvEsMROTz218MuPGQTeBl8u2bijb9dlVm%2Br2wANy%2BEYKMGTgh5MLXAhc8GOqUBNdACM50s4BwwqiaIEucItHa0bTXY2ZgMI9gv7H13xd3M7h8SocpcF0teoQW4fdWOzSP28AKpVi%2FD4mrtXZ79GJeFe3FOQmNxHYoeA2vX85mBP7wtkUryaNwFmZ3VnGLS7qrc2ajwvc1QeRJMEczC9g7GexD05IfmSi1oMlaRQAAgnXQpRUV9ffuPI1lDe5ek7x4xOVxucxunYmHIaUGMCPbT30wP&X-Amz-Signature=542cc413fb26cb55bee2c93433e2903d0f2db05c9666750e0b0d99331b5162ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRTQCH2R%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T232851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCww%2BjkPN8W2gsOpByDfRPM5ZFlcf0vvspwkS6h4S7yFAIgLxKGZbg2uPWOL6PkR5TKcG4bL0jYN14l4%2FYSxuMqN%2FYqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDATRKqlZZvrp%2Fy%2FJjCrcA2TIVvnNvkcQUGrWdvfWZzBScI%2F5DGfXA8DCq%2BKFLCIDWGzhhJo85vBPk9Ytt1K9O9cNXBypHhU25k2QPhhgRp1cwWPK829EAoX7%2B3D5IVr4IjYQA0a1hNmzNSoOOEoHlVC%2FPz%2BvCGvJyrKM2fSYYcd9Es8zr4%2FJOEBskYeFDG8Tz%2BCfhtBMbf4yG4%2F%2FE51CKO6knWcmoqIoQ4NbUGIlNLdmUMlcHr8qQBwVp%2B3m0h7VuFc6QJjHOdxMdlVzUWeB3LlZQJ4dJ%2FwNy6LcF%2Fm4lsJ%2FP85x0%2FUoux9kTxspBSxSR9paULgF3KIYDeLPIWNp4cc%2FJHawCrMJvGLPaxLP%2Fbjlp1lYgURlK25ObIG9nwNaK1SpAS1SVKwRa2O1%2B5hhvw48HXMJccA2kB3qQvDOKceWwdK8YqhCQG9TkZhh%2BkSY5FZVM3uCwqNwsyefP8V6IsMeY4sBTeOzLzXOvHbiZFVXWj6UqwyTP60E4nU07Vt5xaaMjc5WVBaIEiYDQec0espZ19GH2WBBSvXwGFT2Xx3fV2Xv58a76AjN7Gv4BOnHVliZgU%2Fvc4vvifS%2Bki6GUrAsc4onL%2FSob4Rg9OZALXL5Ywu%2Fj%2FRntIAObSyXMRcrKVGjXT4CXIMLnEASMKXChc8GOqUBXZ%2B%2B9U0gkoXk%2FBbEEENc9FMgeN6tGvrY20kY8QQjqdtTbxxiuvDa4j0kaJV1tz3wKS5Zh%2B43rZhyLwmSt57kJwLLexUQYUeNsG7hC1QR3O%2BZawIoUAhXGyxgaOehRsWpKI6VPcBqcEsqcFWpoRJKiLUGnPQDmpjWnyNQ1uKiUZSVqVNm959D6QhHflMU6KZGAeIAPGdWVnhj1OqCXAqpawZ%2B0JR7&X-Amz-Signature=26eeca7d6de0831f05fdbbcc3c2a088de730b3fe8f77389a5f49551db98bdb65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

