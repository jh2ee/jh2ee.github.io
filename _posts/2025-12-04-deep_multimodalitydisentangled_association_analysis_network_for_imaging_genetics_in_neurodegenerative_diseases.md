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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLX6VFZ7%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDn5LiNQBu5Isay7RwKVEdVAOxLTEnu%2Bu6v%2BMc%2FdS6HMwIhAJ%2BsgtipUl0WW3sQ4En6Vk7i5bEvegF4A5Z1%2BtY7tw2PKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNOxOCP2JS5fjl%2Bqwq3AOzAmKWs3ZB4d%2FoAJvgs74ezcmWiV0OZ%2FCpo4gFH5JTcaqG4%2Fs6VbO7wBWnA%2B0sokFVHvAiONbNi0VH1K%2FZp4EEtm7jBt00Hgb2tk0D2FhxUL5i9I97FjfA9bsnx8FndwVoSZsW%2FoxISMWNGIZsgOfiw60sOwqScl%2BZQAyMQVKXe%2BWV3rl6IolgFM5cVn0HKhd6y2QjaGLRNt1dwmfXg%2BP5txkXnt06rL6uQPrpU%2B%2BfcLhfPcRf9l5fKwYUJ6sr8ud1bz%2BJZHnuBCq%2Bpu33KGYU2%2FrJSxiFrlXxdZ4Hl4Aoi3kyigVf3koGSo3JlSCbXj%2FlUt0b%2BkY0yQhT2BqZ3HQefiieXtnE%2FhdV89cRO6XU6TsdkgBNP685iAHsQKSABv5odscmW9Xz9NwGMLtIm%2BtIO%2F%2BSMWKks1dhXfBeSNRvq3%2Fr8XOeDdGkJo9BzoSREPVFKBUWlNONDRfHoxekiM3rDcbPo5XSQSWmWRCtWE68D08EI896jOiV50bDPbq99cCRQ4qZTaHsLUx4moXs0eeU5dPgOPjImeC06JWdeMgAezWZbvk0C7P1nCUnKWEBd4KMSQCNOZ54VfJnhjWJzVoHZTcNo8wab1sciqWFWuFk3C03JkIS%2FeiwfI319zC3od3NBjqkAcpZvM5SXCG3a4NbnEBJF0qG4SiEnThUogxGaR%2BINRqLcJXk3wJJx1hcdB8ysDF2zp3MvtezIVsi5Ivf9vNlneOF5iyC06tXvUla0Egd1j6ufunpWGCzyWSUt%2FtutXfaTRGTRY%2BaZo4rVtMagmYu05b2kpKjYigeOqb6DQrlTN6KPEDueJIqZfH2CJlBBKgeFWrplRdvIjmTZcZd1ndrivt9pbDo&X-Amz-Signature=12c7ba8ce80f04e4497ba594ed498696d6ac129f5c3fcd06df1691969853bbd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLX6VFZ7%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDn5LiNQBu5Isay7RwKVEdVAOxLTEnu%2Bu6v%2BMc%2FdS6HMwIhAJ%2BsgtipUl0WW3sQ4En6Vk7i5bEvegF4A5Z1%2BtY7tw2PKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNOxOCP2JS5fjl%2Bqwq3AOzAmKWs3ZB4d%2FoAJvgs74ezcmWiV0OZ%2FCpo4gFH5JTcaqG4%2Fs6VbO7wBWnA%2B0sokFVHvAiONbNi0VH1K%2FZp4EEtm7jBt00Hgb2tk0D2FhxUL5i9I97FjfA9bsnx8FndwVoSZsW%2FoxISMWNGIZsgOfiw60sOwqScl%2BZQAyMQVKXe%2BWV3rl6IolgFM5cVn0HKhd6y2QjaGLRNt1dwmfXg%2BP5txkXnt06rL6uQPrpU%2B%2BfcLhfPcRf9l5fKwYUJ6sr8ud1bz%2BJZHnuBCq%2Bpu33KGYU2%2FrJSxiFrlXxdZ4Hl4Aoi3kyigVf3koGSo3JlSCbXj%2FlUt0b%2BkY0yQhT2BqZ3HQefiieXtnE%2FhdV89cRO6XU6TsdkgBNP685iAHsQKSABv5odscmW9Xz9NwGMLtIm%2BtIO%2F%2BSMWKks1dhXfBeSNRvq3%2Fr8XOeDdGkJo9BzoSREPVFKBUWlNONDRfHoxekiM3rDcbPo5XSQSWmWRCtWE68D08EI896jOiV50bDPbq99cCRQ4qZTaHsLUx4moXs0eeU5dPgOPjImeC06JWdeMgAezWZbvk0C7P1nCUnKWEBd4KMSQCNOZ54VfJnhjWJzVoHZTcNo8wab1sciqWFWuFk3C03JkIS%2FeiwfI319zC3od3NBjqkAcpZvM5SXCG3a4NbnEBJF0qG4SiEnThUogxGaR%2BINRqLcJXk3wJJx1hcdB8ysDF2zp3MvtezIVsi5Ivf9vNlneOF5iyC06tXvUla0Egd1j6ufunpWGCzyWSUt%2FtutXfaTRGTRY%2BaZo4rVtMagmYu05b2kpKjYigeOqb6DQrlTN6KPEDueJIqZfH2CJlBBKgeFWrplRdvIjmTZcZd1ndrivt9pbDo&X-Amz-Signature=12c7ba8ce80f04e4497ba594ed498696d6ac129f5c3fcd06df1691969853bbd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2K3QETI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCICpiGKx5wrxDisueFVY1PYUB6FDXbyZ%2Fo0ObtnHliwp7AiEAiS7Vf8gf0NRHY2%2FUvQ3pxCZ8l7wcuRgwRnoLiBqHMmEqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN%2BX0wooRjcHLi9L0CrcA2%2BzAYfNV8SwYT%2FfAnW53mwODXEmgZPyVBJrWbpQESdMnK0DDpQpnqa8NZUh9FCdKinyr%2BoXuVsejOk3uIls7UtD%2F3QcSh%2BKlo1VCFDCsP5PzyQ6IQN04t9YleXsteio6WH1vhY1Td52fLSL8aFicN83aLpsH33GuHOm3SwoAUTOoVD%2FocYUjxGU3VtS8b2blYNs5RAGljzKJfv2sxIfDeJmhbOBtdpkaA1Cpl%2BaG%2FPpJCpvT9XRsHmK8xW%2FqlMQAs1QDVNBQcweeVbezWYY5W5Mhzx%2BilpJfLpW0ic7sILa2HS3VkCbQi5G%2BepSoYFx%2FjoV2r0a6MFxGNrs3eeHxAerr8GwI8wq8VR5d2%2BMyH24Za82IAadnjeiHyEpxl66msTZKhNqtW5VoiAgHXbxp6wNR5u2AeUdD2R3h%2FT7ozpOjwj91xBurZnvrNvcQ3AYOhnMFAj1ZZ4po5HkjEh5oevZxHAKMVOQpaHX9YRIarm31T%2BzlTqBlDWXxy50JM8XA9IGu9MHGW0RjlGLJc35aY%2FwgqvGwHt35Ct7%2Fj0cWcUjncxpoCYPnHhy3oxe7McZ8%2FZKAN0MIX4oqS%2Fp7BoZLUr6yI6Z%2BDGWyj95%2Bb986VRGftwBE5aizDL9PhnvMOag3c0GOqUBswOi4LXTbd1CeNW36oElZi9ksdtwfQ8Q8uFJOpShOdvdio9cHkvIbccq7vRT9L%2FFLA63wkrhYxNOVq0eQmAEyIC7uF7DcZnlodrYT3%2Fy1zw%2Bou%2BCyA1BDyEPTWgOvyj57PFY6zuTEL5CmEO3NbKkwl05dTEmNG960fSDds6l1TBJHrQZ6qW5CJAzKsbnRozujMisfYZYQtod7Ge4Rr%2F9KMViEzvr&X-Amz-Signature=eca40c89dd45f529c90f05857aeb0d722f8ecab64c280bac1c00ceded7964703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWDV6OLI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQDVj0QYl7pVXWO0Itlw9uFVotKzOpRl%2FdQdpUvNTJ%2FDDAIgF5M04gviEJuXHiiTE98ptuhOAjxFhru2xqiHWXFBmdMqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBsOh8pThLjEDYD99ircA%2Bgvg2%2F0chmqu%2FtfzlkLr0oJ2hXhR3e%2BSCDxPE22%2FE5NXYjdmkitNAxVG%2Bcda6Zk1gIEyoCxn6NtdJ%2FPgRGBXKJL%2FMiJdre56NNvIC6TnMwEQQHWnh2KzSyCm7LbwyRCJ2aQap45fwd%2F0lOeYtxHNgKd6K89Nfn%2B9z4JDVjS3WHtMEX6iVYXajpb%2FJhfGOxGMYCsTRsgEQQ%2Ba1pM6%2FewAMfJauNFdIelicVA0HerXFVSK8TV1tWKfsIqIPjCCI%2BNsx4iogjwoTI4YAbOxAz8Oj2LyO6PTOgvzBzfSZcUohGcYbh3mHmIW5sB9kdWBTii4GGVTQwM%2FgUQyVCCmQG%2FTuSLwxwZWuJMM34SLwiR5Cap6OXKOH1UTNP7HSO3cScb6BZF264vg6kiALYDDuUSRxJh8bUXevKprXUOfuUUiVMvkrHfKaPj51Ja%2F3Lj9q%2FaZJrDDGCGK26nYsLiGIERi9vWsgbgeeucFhDwD2ZQBfA2FWn1s9a45sgfKy%2Fh%2FVXGO%2F0vHobZereyHl3dowx3IK99LDUjEFjalb74O1HsWOn0cjraMZb6FrYDyJl3nKtVWtU6fFNoNixqCaZELdk8cFv7iHp44CUhhIGG1lyJjxZotHj%2BjUdlmtp0kJDaMN%2Bh3c0GOqUBCJMGbsWrLwX6qGTvqsW7nEgsPI0SNL4Un3m2Az6e9f6CJTj9Hee2CeRnpwZgBUIybP1rPhE6w4r5H6pyWXsCRT3o1wm8iduypUAnvQ4hbMXFDvSXJsblvO4dlR799DGoLeOk0kcHJPdAjxDTFV641rvfmb7RvevLNOqGdzH5WoCEwm1EgzqqpYHa2eOnhk6zGZgjQiEqBMIdzkGQnwB%2Bd6nKoPv4&X-Amz-Signature=9193bd4ff5fa66fbb39ae62d65c31cdf0c0f359a93724fba83cf146f96441637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWDV6OLI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQDVj0QYl7pVXWO0Itlw9uFVotKzOpRl%2FdQdpUvNTJ%2FDDAIgF5M04gviEJuXHiiTE98ptuhOAjxFhru2xqiHWXFBmdMqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBsOh8pThLjEDYD99ircA%2Bgvg2%2F0chmqu%2FtfzlkLr0oJ2hXhR3e%2BSCDxPE22%2FE5NXYjdmkitNAxVG%2Bcda6Zk1gIEyoCxn6NtdJ%2FPgRGBXKJL%2FMiJdre56NNvIC6TnMwEQQHWnh2KzSyCm7LbwyRCJ2aQap45fwd%2F0lOeYtxHNgKd6K89Nfn%2B9z4JDVjS3WHtMEX6iVYXajpb%2FJhfGOxGMYCsTRsgEQQ%2Ba1pM6%2FewAMfJauNFdIelicVA0HerXFVSK8TV1tWKfsIqIPjCCI%2BNsx4iogjwoTI4YAbOxAz8Oj2LyO6PTOgvzBzfSZcUohGcYbh3mHmIW5sB9kdWBTii4GGVTQwM%2FgUQyVCCmQG%2FTuSLwxwZWuJMM34SLwiR5Cap6OXKOH1UTNP7HSO3cScb6BZF264vg6kiALYDDuUSRxJh8bUXevKprXUOfuUUiVMvkrHfKaPj51Ja%2F3Lj9q%2FaZJrDDGCGK26nYsLiGIERi9vWsgbgeeucFhDwD2ZQBfA2FWn1s9a45sgfKy%2Fh%2FVXGO%2F0vHobZereyHl3dowx3IK99LDUjEFjalb74O1HsWOn0cjraMZb6FrYDyJl3nKtVWtU6fFNoNixqCaZELdk8cFv7iHp44CUhhIGG1lyJjxZotHj%2BjUdlmtp0kJDaMN%2Bh3c0GOqUBCJMGbsWrLwX6qGTvqsW7nEgsPI0SNL4Un3m2Az6e9f6CJTj9Hee2CeRnpwZgBUIybP1rPhE6w4r5H6pyWXsCRT3o1wm8iduypUAnvQ4hbMXFDvSXJsblvO4dlR799DGoLeOk0kcHJPdAjxDTFV641rvfmb7RvevLNOqGdzH5WoCEwm1EgzqqpYHa2eOnhk6zGZgjQiEqBMIdzkGQnwB%2Bd6nKoPv4&X-Amz-Signature=a6a121de5553a6e1cd49b1e79b22a23fc8f15bedbe1fd69121006a551cc93451&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD2WN5EL%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCICG3FcGvd1DMIA5b5N10QCs6yojQGtlKrxSNjHHjqH%2BAAiEA10UicA9Vm0k3KkeI%2F7a4k4NhFRAIaVTLW%2Bx9bwv7tTAqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBDIFHOhOUSv6Fo97yrcAylDtqhADPZm7rOzQ3bWLB9fuDXBVZklC6%2BJ9qYWsdeEIeHpf5hbqjrbgUg2FoM1HDL6NpZQ1hL0UO%2B3yiUHoGZ%2BCvstsWMngwb%2BRPzfrsNtL9L3UZP2W%2BVd7i2Jz%2BdXxOZ1VdegKvaWKvTKq6r17hn6Mm8yz%2BMICTKKaEKKd64AuBLPdSCnbSLape5DSfdw3%2FfM0nUjdIKf9FsQajw%2BpacmO2YlvLPtBd%2FHNSHpMZwvXdxWnaC5Eb%2Fqi4LIdtRZcLF8ztmCD9V%2Fm3Mc6uaqPjuVbrefL0Wu43V345VxoV3tOV6AImza4vwHZMGvlZ4%2F2Rd5sRUqpFbT9Iu8wzs19uGKGZdWGDioDXd4xjuVrs0fUtTwko1cUyX6tJlEiWTJpi2KfOTIH5wwWo68r%2BlnjatO62nlih%2F4mYE35bnKPe5Mps8T22h3Fgm%2BhgPIc%2BiwkEY0ornw1%2BD1M0eDSvc%2FTlyrCxtd3ITcqE7FLeiaMmPkQZSDUWl4VZPjOTp1WNAteILMNpw9SygmlZ7Jkps8FZpwYJX9zyOXKeNj%2BcmQhm3%2B6zh8yqj0uc%2Fr4paGFRyTglZ5cAa7xLYYQ3KGQf6iIfugKN0t5TpTRBxvc%2FV7GzIt14%2FohLnn19LSE1meMKyg3c0GOqUBZhKYS6rnrCI2f2wEIStSN5ltOEtlI4A1PWgCzdbeQXtVItjg0qM8BS%2BqpWI1VtD%2BeLMjSAW55M%2FVtDAPzN42%2FLBHcXJC87r%2BXrXAypSsr%2FrnwNsgE3xfXX%2FPRonKeIN7OD64PMfer8XjC4AMp8unlreHYDBoYXU0l4Kju8b5md5xxxW7vvxWH84lESkoJTUY7G9o1gf6wGjsxrmeEAwp69EQPtkc&X-Amz-Signature=9a47e8cd3f48dbfe8e73b1febf3c7bff64ea3a483079d7b506439b48d5da69a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCAM6QA6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCICM5wCcRRMO9%2BeiV2pp%2FeDMZ8is3umWO8lafkyRZq61RAiAUpc5GCnvB6MaQODNFP7OMZ1uQrLMUk1ev7sYheUFXfSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMV9RU15K79C4L4A5FKtwDSTaa1VEHwcwqlcbXEBhR6gla5B7bJQ2otftMD5%2Fr8%2BxeDc32NezJZxNcdXKtfnTqNM7dTN%2F%2B%2FH33zxR2fWmyAr1w21gObHkjfDJ7s6fMFHzUXFcggEKx4r4sayGpwdo1Xb2IxgCoLXVnNKB9wKEcxJvGRLOOKo6wlznRlT7GBAOL7YLiiSzMS8YW8GjXyvsmeLlSK2ODBM4uPb7W5yVtltbIg%2FZB%2FhyIuuy13aguEDLfHNE2LPx0Kd284pUoX%2FKKMlYLFxAhtL%2F9HHtnn89MLSFbJx0OE6TPOb%2FWrPUX3ifkZGuhy0W5s9nQxPHu1jRisPqVEXDK%2BXSUDyNUe37elBKe7oUE4fG%2F0VyZU652SQ3qw9WbqYfB7YbwVrKXnSybxmdPloKCDsLQOdLslrkLyFfvsjV9ynBctQjW5H8TGXPxNqc4RvVdu53eZLbbMsDu%2Bitlx%2Fmfwb1wif0sZl%2BTjxGax6y6hBG9C78atTxJ%2B9nTiaQpQccARyG9ppO8FHAMqZ9qYdw2Vc%2B1m5O7GIyUpshJ2fpJUWrtQ681IX%2BfU%2BY2kcDDEyCcDM8Bx1eY7CnKuc0jmkot86CpQ%2BHabi8jXFCTq2SFfgXUamVyueofWC%2BIO1szTntOb6pMS%2FIw9p%2FdzQY6pgGHt7HmDFP3lz6lWrEMH1rsxScWGyC2kKr83G2lzPe%2BeIadwsw5WKVuBhSrTsgzEN5CabRcUQK3CuP1f7tqTw0O8Ed9ANsyh2o0Kj9nKvZWQvs11EpBqlrHCwdZ5ix9iLcquqyUCMKc0RS%2FNpxw0hfhjzOXdhn48UCv1EVEpU7UW3%2BXEW1%2BQaEK%2B14YiYq9kBwfq6RoEPvVlCuHLLbzTkT1pXyuoXk6&X-Amz-Signature=26719ea2e6f60f296318680e4e7dc0c75c0d66bf47d21b95a7ac5aa90357a6c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIQBK35O%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIBr3NUnc8pVSiyk8VVdNGBHpjSHF%2Fq1RnWEcqJ6gm9h7AiEAq90pH37chidvBnNJ5%2BFiwr2S4Cx6Cd38p%2FZ0%2FFCPzE8qiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJpbX%2BcdLzjXKLHa3ircAwpCzG8fn7ry6nZYK%2BidSYpSh28InfdE%2F02IujHXdgN2rpd2sV1Kyg8uKTZI8n61%2BPqiLIcb4TYrpWeeyDDnm4GbrvX%2B%2B94lgw5ByU%2FRyiPTWtdtbAb4ZK4wiOxACo%2FCctwQ%2BUrEwq0Lzo%2Bz2JNomYgSe2qU9JT5FEaBZGWFhUtiR0FzCfAccaJEerMkSKOWovxdl3s8NsSIyTLa7%2FwoDIV%2Bk7pMoWdWUvmruIKL3PxkBxzzymwHUDCC7T8%2F1LhfVUWEZZC1mXaWE69lEugCZnF59OjqR1GMgU%2FIVnEP0Czp7XIjA2QIxXhx9TqoIVl6dinF7qMkXMLVsdmCdRI9UgbIsSdz%2FuSu%2B%2FyVY6HoCRt7W202aeMt9bTbCYvz%2FliQKc5JyJFdI9YSp4iz6NwU5haD0xJ0qeqA%2BECTU2Bh5G87KDKw7uEWhLqP6A9Np2JMhlBeHKeUJSSLIKtMx1FMb%2BqF9WRfBkiE7IAV9yOMOqgIcJIlf4nxoSd%2F8G9qo%2BWW%2BEaRBMWYS6%2F5COfRMWy3k7hQqKdjYIMeokv2%2BB168SAmxymt1lmLklI8llBnOdsQ4zIO7ubpdX%2Fjz069KQsj3ZK6VTuXX52GPyUv0owO693J6vzBwAOckBu%2B%2FRhWMKKg3c0GOqUB9yeZVYGf58WZxGjlphJ3aq2R1Wv4ttZGwhq3JklucMIiSsDryIX64ninezc1viGVOvf8OoJN1uHS%2FN8nR7ih90eZTPnO2l6diewnWSi%2BpWLQOlLr4g56QcfAHDK3nSDlqjWFoYynfd2Xl7KLMPeupQnBFqV0PR4s47FNMoo8BW81QYiGRH1ql2oK%2BJ1l2cgaA%2BCCIfL7EeSWX6470dWCi%2BJ3G3rf&X-Amz-Signature=9b442ec737848dd1d0ace255bcebba7d4486d3d291718019ca97cdfc2b419246&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRSSKDH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQC5BfyeRD1SUOtJqq%2FTO68TPOPJUyatqC1%2FeepBeVVEywIhAIj%2FrpmGncU%2Fn6cslcsc7vNlZNNv66hDmuluQQW4Ma8HKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcrBGi0sAQp6x%2BF%2Fgq3APIICOvtppwysXMDr4LUKneLPRXRjlzyjZl6B8y7Gq0htJwknWXlBFXpnahHFdLV737VYTEkUPFRePV2c1S0ExlzOpFH0tgmmI3%2FknhkdLgGXwRFk6mlIYksYzcEjdkplq%2FjTPCDCHo5wE2QgdsByEXwpyHS%2FocJzw8SsdE49SMwTmBsXaLbvODGsILoeQS2X1Lpg8FVxZ9s7oVbxR%2F5TKR3QEOJ5iRB3zh4KVfMoNhc%2BNhUOsaTzEXB61I5m60cEcJDxC9pT4OuTj88hQPVDRcNOnXjGf8FJCEZ%2BT45FkpSy17FOwsknIU0CezdwvHEscwUYmxl2KcwUALFDXzWU9XN%2FfkOrECmX8jT95NmHWZhX6r8toQ2IXbPBQis9nowbSDxtc9YZCKGrGnxwkbcMP%2FAtWumJcGjrbDs1%2FPQuYSAljNgb40pmcwnTTk2otKQe6v84CeYGJeVzRX6R5iG60YjJmm0WNRqbsp7X9FxOw%2F%2BO%2F%2FG1mapLGJ231nlj9TWYOcjZMf1KS8ON8tCb52pHtAgcQId2wH2n06v75zfxIgb9hAckhaW8nI2DGzwPXRABJrAKruSQ2Xenyh16stFdlxONTGetQtxlQDJNbwEFyRbhOxWHOD%2FDI7H31SuzD1n93NBjqkAQFzewk4Nficn5rPLiIE9D3iFGPRp1hk59%2BSDGO9%2BZuDyYQVBPg7LGUUYssCUvLe8u9rsF7Flod4il5aJFV%2FQjxfzxNtpw3B1IVchRiSZbT89%2FRNadh8%2B4GqEaY7c333MdJThyWlAQDiQz%2FhHaaKT3nlzmmO5fU%2FA%2BJrtIdUm0UGWOA6qMiVQNx284GKas9rPYdWGbgosmT2Ea2Wyrzm210m0m4x&X-Amz-Signature=236aa453c60a8735299b3fd813e3433576026a3c86c0f4080154eca1953b1eec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRSSKDH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQC5BfyeRD1SUOtJqq%2FTO68TPOPJUyatqC1%2FeepBeVVEywIhAIj%2FrpmGncU%2Fn6cslcsc7vNlZNNv66hDmuluQQW4Ma8HKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcrBGi0sAQp6x%2BF%2Fgq3APIICOvtppwysXMDr4LUKneLPRXRjlzyjZl6B8y7Gq0htJwknWXlBFXpnahHFdLV737VYTEkUPFRePV2c1S0ExlzOpFH0tgmmI3%2FknhkdLgGXwRFk6mlIYksYzcEjdkplq%2FjTPCDCHo5wE2QgdsByEXwpyHS%2FocJzw8SsdE49SMwTmBsXaLbvODGsILoeQS2X1Lpg8FVxZ9s7oVbxR%2F5TKR3QEOJ5iRB3zh4KVfMoNhc%2BNhUOsaTzEXB61I5m60cEcJDxC9pT4OuTj88hQPVDRcNOnXjGf8FJCEZ%2BT45FkpSy17FOwsknIU0CezdwvHEscwUYmxl2KcwUALFDXzWU9XN%2FfkOrECmX8jT95NmHWZhX6r8toQ2IXbPBQis9nowbSDxtc9YZCKGrGnxwkbcMP%2FAtWumJcGjrbDs1%2FPQuYSAljNgb40pmcwnTTk2otKQe6v84CeYGJeVzRX6R5iG60YjJmm0WNRqbsp7X9FxOw%2F%2BO%2F%2FG1mapLGJ231nlj9TWYOcjZMf1KS8ON8tCb52pHtAgcQId2wH2n06v75zfxIgb9hAckhaW8nI2DGzwPXRABJrAKruSQ2Xenyh16stFdlxONTGetQtxlQDJNbwEFyRbhOxWHOD%2FDI7H31SuzD1n93NBjqkAQFzewk4Nficn5rPLiIE9D3iFGPRp1hk59%2BSDGO9%2BZuDyYQVBPg7LGUUYssCUvLe8u9rsF7Flod4il5aJFV%2FQjxfzxNtpw3B1IVchRiSZbT89%2FRNadh8%2B4GqEaY7c333MdJThyWlAQDiQz%2FhHaaKT3nlzmmO5fU%2FA%2BJrtIdUm0UGWOA6qMiVQNx284GKas9rPYdWGbgosmT2Ea2Wyrzm210m0m4x&X-Amz-Signature=f5981576e8fc20773a0eb85046bb66460003e3820e8b0068cf576e683acf599b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDJLXLDE%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQD%2BGQ3VuUHqsXKoHTX42zjiLcM1BzJY2%2BTSSa9%2F8u3lFQIhAI7gXSCJygVCBY36frNxO78YWaLaSRGAqW8KJGTcjEtSKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyt1beIxIRzAxivpboq3ANNePXMbp4TOtPXU%2F9pvPPEBCUGBuJxryu4ssFYXSUcMHDbvWdXNblrdENVcJ1nkIQIPNNWDigrhL0XW%2BvZZngEqeDoDQH7EWWB7ZRI%2F11aYNcFSjWjH4xdPIaGHdCjnS3DO%2FlZQRNPQsftInk8d9VBtbnziGCmVo2Sn7BEfsR5ReLlWoTT4J5R9LzZ2PoBU4B9JcCPfD2zM%2Bmju55nouhPOwC96b36CTh%2Bj%2F4UIatJWf5m6gayxfAltXomFrjke322xPImakKIf3bYKOqwGNp8BEQiTjqh4uhc%2FRFZRZdb67whjounXi2VzKQ7FNF4ly2B6qlN9Q%2F%2B1b%2BNAC7LQU6%2Ff2Q1PUkGM%2F5b7ezKczjzCRaHppB5TYy5CxIHstehdnxPFd9pkWWXgDBVHqc%2BzSBudJa5EcxbMKecMEQ%2BZaB7ASI1dziKnGvC8aT84TAYgEjYrBZU5N1p%2BpC2JsroedOgmz44%2BQadarbVU1MaFTy%2Fc915KDCjrOS8o9XbXImV27ye0HyfojbFVJ8LsJN2NvzOlcRrWi017gUlLW1w72n0Zm8k0nFV0XCW8qvMN4Zyj%2BXgEwWh51PlISIpcICepnzzYRY2emvZz9beQaivGkBJVURDpjm8CCfNI7UeTTCeoN3NBjqkAWTYyIG73FJHMN4JWhv7aFiIZPaTP7EKROWD9l%2BV9g0zMF%2FqUnJjxJ%2BWhYmZ7qG6BhU9MA%2Frjs0ZWDTzFRErCPe1Q6HzgPFzJbvNeuj1I%2FSjrNVrmmwRM3yVKhXGqCsRJYWChjfyJQ2MPtv8gFJe9L35vKAEfbgXIqTx0XDiTHNXX2%2FHxvjQ0fuzTK%2BLfMMlg2GumP%2FczcIBlJu15OU2uyBYAP%2F7&X-Amz-Signature=5af347fba48afd01edb64edfbdaa39368f970dc3ea023433fef8eb0175e023c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY4PQQ5W%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDlFwmEfd0VV8b6m2OnRj3L%2F4eBNmHHIJA2UkoZMa9ZQwIhAOHQLA%2BT1dooqdbyJuv1eKG2h4KZehaXNq3j7wHzgNFUKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyeHB8ieWf79SrhlM0q3AO5naZ9HOY0xNPov8DVoWONCrSflBOHblUGTpjSnDU0BveZQIxlO1bmT1wMt7TQYvDk2%2BBgBWooKwR4Cf4BlFNkA6QZeEwQ6JM%2B2R8GfiJAWKAHmeqCtImpFGgz0zfCaFRChZlSymP3NiIJ0HHcgz1TNjyYV4GLefmiRzq4WQjrImYxJG5mqdOlaV1PWeDOvNGVf5D%2FJJvR7jwqZJg7dv5wKFxCHTfoRxaquL5gl%2FT6qLhURIiasQH2N09pSh26DIi%2FpVPVODG715w9dsqMDgVvh%2FUYt8lG%2FRZC5uU9RXVej7APc%2FNC%2FV77cu%2FNs8pgCeCo38CvZl%2FgXyi0daA8%2FlIZhamb8jhWPaMa6vYNWApUpoEpSCMwX7uCE9pyw0srtLEXf4yQe8uYNlMvBWSzO7XpCdacWGLjx%2FhQJ6RsL5h5DeI97pNYD42yHlNJLUnZaf4x8fU%2FQsACLxoYg%2FMn9MvMEtLVDFsHDyN5LUBDf4d%2FZ%2FKA6oDsuJVP1v2S1a7fwgqxSQiTVmBpEWX0iI6Cnf7UgdnNYnBO5KpPlhwRlr4AODSO%2F69XtyTKKWxXkj%2BlQwGJ3K82XYWtWTs7vd67sgFYofi2TlND4RI%2F%2F%2FvSUXQPXQJRbqOEu7JyDBXZqDD%2Bn93NBjqkAfKLHJujUB8RdQaUKe2dUD0L9k5Dwtg5cSMR8fP%2F8y5DERn8GIv2pyVzwL5pyBE1mU0aoecimrAmO6ZeqN9rfDfEuNuLkuSsitwxDZd7isr0QXObx0dSgwIpYljvIiAd4gCnGipH3MFbcRhYgCQNTdKCaJLVjRKLXMjdL1RZRP%2FbgA88tzNnM1ucGcNmdMFiuFLbOW1D%2BIEXdoiVNWfZqnTk2fJC&X-Amz-Signature=eadd7601d63391ac39cbc61b2017386fbf9e98338728d0cca3b62900b091e7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY4PQQ5W%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDlFwmEfd0VV8b6m2OnRj3L%2F4eBNmHHIJA2UkoZMa9ZQwIhAOHQLA%2BT1dooqdbyJuv1eKG2h4KZehaXNq3j7wHzgNFUKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyeHB8ieWf79SrhlM0q3AO5naZ9HOY0xNPov8DVoWONCrSflBOHblUGTpjSnDU0BveZQIxlO1bmT1wMt7TQYvDk2%2BBgBWooKwR4Cf4BlFNkA6QZeEwQ6JM%2B2R8GfiJAWKAHmeqCtImpFGgz0zfCaFRChZlSymP3NiIJ0HHcgz1TNjyYV4GLefmiRzq4WQjrImYxJG5mqdOlaV1PWeDOvNGVf5D%2FJJvR7jwqZJg7dv5wKFxCHTfoRxaquL5gl%2FT6qLhURIiasQH2N09pSh26DIi%2FpVPVODG715w9dsqMDgVvh%2FUYt8lG%2FRZC5uU9RXVej7APc%2FNC%2FV77cu%2FNs8pgCeCo38CvZl%2FgXyi0daA8%2FlIZhamb8jhWPaMa6vYNWApUpoEpSCMwX7uCE9pyw0srtLEXf4yQe8uYNlMvBWSzO7XpCdacWGLjx%2FhQJ6RsL5h5DeI97pNYD42yHlNJLUnZaf4x8fU%2FQsACLxoYg%2FMn9MvMEtLVDFsHDyN5LUBDf4d%2FZ%2FKA6oDsuJVP1v2S1a7fwgqxSQiTVmBpEWX0iI6Cnf7UgdnNYnBO5KpPlhwRlr4AODSO%2F69XtyTKKWxXkj%2BlQwGJ3K82XYWtWTs7vd67sgFYofi2TlND4RI%2F%2F%2FvSUXQPXQJRbqOEu7JyDBXZqDD%2Bn93NBjqkAfKLHJujUB8RdQaUKe2dUD0L9k5Dwtg5cSMR8fP%2F8y5DERn8GIv2pyVzwL5pyBE1mU0aoecimrAmO6ZeqN9rfDfEuNuLkuSsitwxDZd7isr0QXObx0dSgwIpYljvIiAd4gCnGipH3MFbcRhYgCQNTdKCaJLVjRKLXMjdL1RZRP%2FbgA88tzNnM1ucGcNmdMFiuFLbOW1D%2BIEXdoiVNWfZqnTk2fJC&X-Amz-Signature=eadd7601d63391ac39cbc61b2017386fbf9e98338728d0cca3b62900b091e7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBVSGJMY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T010441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCICNf5Z2%2FS3CQc%2BQwHenf7H2H%2F3TY6vZWHjrOgpvQis18AiAZ3ZZpgBI31zrryPeDQIHz02cBewfIupOLNl25CRNi1CqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3Tm08nnFCnxF5fggKtwDr%2BPhlVjJ4Od4fnGV6TiaqR6N4QKUVjg2HWt2ZYZ0VaRbfdtsjmML6bpaNBQlid3BaJHY0Cpl7b0QLyuTKAk8TP3JwuXC7TAsyTLOpVjY0GxK1kscQmu%2BC3ShcAuTFEmcCoCGLMxERcetirxCFE%2FRyyLHSCoxZ4Fvq9jpvqHl9jrG%2BWpiyMngCq4NhMBKyXEvBmGAqKdbcnaZtdpSe1UrkJIZHDkjWh76zRqv0%2BwKo87TaRgkOqqKZ6csXeoDkRbnICHWmNWbeEi9I44ULuKwzjrxLn%2BQJ6cCu0xJyhduGekQlOKaVmCgkOabEsIISYcpbwe58vV7eOivwrJSLuybPsjQShoJHAdUiMIqs8cy8i16diEu1OhrBFBxOwRUtNE%2F4S%2FY09Rtqbyf6FBgW%2FlK82Ta%2F8q2OhY7nlVUOhW32pjTWw4dOXutyollM7ANH8R1GWWWfJxkreJDqCtgpEW2KHou89hy73ftNQMy6Jnps6gPHbavyuG53zI2Lo4G8eaUSL6EOkY2jZb2BkrwnnMxmC%2FQ%2BG68TWYA02AykpIaawIpDRZL8SiT%2B4sxPQPVDHTFLgQLU2G%2FILhAVWuB2lOf0EM74lamDje9swVPAo0PGBVqlovNZJxNdWojZtowxKDdzQY6pgEJupW5YzYO9DaT9pjrTMA2X2UfsAyfjtxk%2Ff1iP%2BnJaWPb22pMQm1NOsxbcRuNPbfgZGZkawXnCHlkiEnJYJGKd2HgnmcCkURAc7dDk%2FuhCdwZPp%2FP8%2F%2B2csp6P%2FPPtAWdMwldRsCOPrP4knCyR3Y%2FbcGyTqD2mc9Rqddmu0RLlgpO34Z2fMUKkmGB2aYxwcY2C%2FJO8l%2F1kTYScYWA5j54KqFmVEvA&X-Amz-Signature=794a18ba56ff4e1782e9babd5ec717663f84efb9ae1b235558aa512eb669dcdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

