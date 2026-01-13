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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLG6WJ64%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQDoSuuiowpi7Vwf%2B1XN%2FY8Gm9yYJIZt0CxqLh0rva8tsQIgAoKGuqxswKV%2FJrZvAUHdVUXiHsNPJFqNzBkG%2BVqbP1cq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDGPqcsn2eHqObv2%2B9ircA%2FeWaiSVmZ7mZ%2BCxJey6fFSMcpKMPTebIrR%2FHP8Xfi0cbNgXFMEb29KzT9h72JUHxQ%2FKVWdbiWOnMbx%2FotonM9j1tsKn%2BAvb7vogslYuRphSbTEBiSVxDX5djQaeMjprXHuUZW5B0l4t7gJm2jRzveNEaekQoo4xLgCuSAh4uyO1UJ81GTu14zqsWzqGgpVFoVRnb40iFUjTrH33%2BI0vTvXBM%2BWMkmGshqNjDuc2byDnWkSqNB5JGYTn1tsdGQDvQVwiM5Qt33zr72OwO86Rbe5%2BtCDmxgvZeUCbJdscY%2BMGTe2DsPRD5zZ0a7ZGFteMesO%2BkfBGsswFiEYDblg7Ztwy1hOisGjjGbQZgWmyRGXLMQCYvvHQ8JVhvHmPNQ8jmTxhWZ9AZaPcrqclwHCulDdrXdxHBgLxelIk5nzF0%2BoiMq2DVGJvFCWuOERuUQHpInDqfjwO3FmbhJzJPIxH4u9vNjXJTKSBQR8NonRILaeg69rR5RZ27itgNjdmGuaCC28b3%2F6sW%2FvTMSmgttxVUQwQS%2FFpCQEBopsCKC62ImPAuRXyhVnuq9zwMnTSxFw1%2FglPMflP3jmSWDKMXJLdK6HZF3TyN7qG4h%2FcHaiOHcE3D%2BTko7nmGiZfxnN1MPScmMsGOqUB6vyuIFqJ2A9ZyioeQW9Tmgfn1oP8MWzYE260h2Jco8LIK%2F27CkC18FusKMJ5lV2ecf5FdADDwnp302vJrl8mnnFgYB2mVbHFn%2FGDSE92HhcwkXhRkeiPVfK%2Fg1WlWl0kIq8BOkHloEm6B27pTyylZtCz6cYnSB4C%2BSGdPpjqtdH0fNScmJGDC9How6JnRAX8V2XBnvpJNw3mkp3wIBA2gOOTZB8g&X-Amz-Signature=59f56751b6763e0aab74ae3c83775ad672b3553710e477d08a69574ab08769af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLG6WJ64%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQDoSuuiowpi7Vwf%2B1XN%2FY8Gm9yYJIZt0CxqLh0rva8tsQIgAoKGuqxswKV%2FJrZvAUHdVUXiHsNPJFqNzBkG%2BVqbP1cq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDGPqcsn2eHqObv2%2B9ircA%2FeWaiSVmZ7mZ%2BCxJey6fFSMcpKMPTebIrR%2FHP8Xfi0cbNgXFMEb29KzT9h72JUHxQ%2FKVWdbiWOnMbx%2FotonM9j1tsKn%2BAvb7vogslYuRphSbTEBiSVxDX5djQaeMjprXHuUZW5B0l4t7gJm2jRzveNEaekQoo4xLgCuSAh4uyO1UJ81GTu14zqsWzqGgpVFoVRnb40iFUjTrH33%2BI0vTvXBM%2BWMkmGshqNjDuc2byDnWkSqNB5JGYTn1tsdGQDvQVwiM5Qt33zr72OwO86Rbe5%2BtCDmxgvZeUCbJdscY%2BMGTe2DsPRD5zZ0a7ZGFteMesO%2BkfBGsswFiEYDblg7Ztwy1hOisGjjGbQZgWmyRGXLMQCYvvHQ8JVhvHmPNQ8jmTxhWZ9AZaPcrqclwHCulDdrXdxHBgLxelIk5nzF0%2BoiMq2DVGJvFCWuOERuUQHpInDqfjwO3FmbhJzJPIxH4u9vNjXJTKSBQR8NonRILaeg69rR5RZ27itgNjdmGuaCC28b3%2F6sW%2FvTMSmgttxVUQwQS%2FFpCQEBopsCKC62ImPAuRXyhVnuq9zwMnTSxFw1%2FglPMflP3jmSWDKMXJLdK6HZF3TyN7qG4h%2FcHaiOHcE3D%2BTko7nmGiZfxnN1MPScmMsGOqUB6vyuIFqJ2A9ZyioeQW9Tmgfn1oP8MWzYE260h2Jco8LIK%2F27CkC18FusKMJ5lV2ecf5FdADDwnp302vJrl8mnnFgYB2mVbHFn%2FGDSE92HhcwkXhRkeiPVfK%2Fg1WlWl0kIq8BOkHloEm6B27pTyylZtCz6cYnSB4C%2BSGdPpjqtdH0fNScmJGDC9How6JnRAX8V2XBnvpJNw3mkp3wIBA2gOOTZB8g&X-Amz-Signature=59f56751b6763e0aab74ae3c83775ad672b3553710e477d08a69574ab08769af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EDCRGD6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQCiP9WSecSd%2BwZq0WWYPiHYTbNfJ71Z98y3ygAcsdkIDQIhAMrRko%2FPMgESaGlbPIHYKHTBXx8s%2FjNk3eCr46T48qnmKv8DCAIQABoMNjM3NDIzMTgzODA1Igxl21Mq8r58U7HsK18q3AOqZlJtXDRtI0qPk2EV8hE6aa04lokU9CzSdDFRfalFQcPygPLSucuMuCrBRURVqNjgTx5hZ%2FPlWdzWsHfwL3cqQaOqgDI%2B26z0QcyO3MBqxIPSIVzuoEVppy8knFjFFZLWXHuInjsEb9aUUnBAcHm79Ug39QNOa99VqegFvToH1EPYuJSFIHGO8zZewGOpwaZveerLj5DrnQrnKee3NFFqhCe1YtqtVS4nCANwuk78GDOEpnWH9Q%2Buwzsds0d7hPCefhYrBFdEFyP0ln4qLzvW88A%2BBsUDo9O5mRo274znP2XMQMasvQlhOw29ZGLi5jaREzCbyCAG4Sfn9pXA3QfJAtbXkmmtutCFzsBkGjvobh3x0goPYplUNftJivXUxc%2F5RC8HBat0WiGHjLeEe5oGdZFg4AGq57Cp16JvLnczDyDKNScSuT6DcQh8iDBLkMSZJs5dVpJUEYqRy%2BfZfQtXvugOczv3uSncVRMhVlXP03KujojaKLKW%2B%2FjOSbKilfDIOm5oVKWWU3EWrkoFiDRjGAeEA9ywigtdnSHCYToyBvhz%2Be6BEehVoa3Bk7TFWdOqOP7S2LWvzPwXamorPLWbKAtuf9p%2FlrnbTZCrwuFQoff1pWsaEQcT3l1lmTDFnJjLBjqkAdzLx5fFrFcwDkpwP5aEmFoGyXLXV9k9zhy6piIk%2BOJMY%2BwMyHJE2hkk3FJaAVwRlB0EzWftqQ%2Brx0yubA2XWSumd36ngG45Z8gZblffZGR%2BVZk0x6tpjXYhr3gnjmaZm3pZR6X9HDjycxdr0l7gFCdZhnibFJyQbdgZ2epdN7b5RvUHzxTmNPiHFth%2BaU%2FfEoUBjmNbKAZtbPN4CidO0AoWiaxy&X-Amz-Signature=de7d3731de40a7fbcedd1c5189a6c2da89c5dc6cd79681c23ec51af17ecb6dd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5CPFVMK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIFGczeRvExWXiHA3RVHVNbE7PsTQS5jZdqcBZVpXe0HeAiByWJsz4p3xmrvJ6pVmrWpMMsVx8XqMPjuFgQ5M2LEAnyr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMoWi5Zye5pzxletI%2FKtwDbDItD2t5EaqdJTMO44Xmi2B9ST7xjbnWiRzVpPN114%2B5s%2BA%2B7k%2BoYdvQk2BQvtcRBpUV5xZB67cPUJXpdy7eRgqyY%2BtDdcQ%2Bsrc1N8bwMr%2FLa3HqHtKNCIXAEYMVkZfvRb9c7XZ09WI6UNr3XxGDDaSs5xMaJEhspKYCPtASRmV4ArpdE%2BFDa7BF1DZQymPDH%2Bl3GpkbVkauIZ6iWUSC%2FvrRePpoTGaQK8NMKLKiUHdzfVHhx%2BJwiwYeCsk%2BQdVfLoMXJPimpK0NQvLrxNBKNpELgCFgXPlmPTuN2ASdtNQyDsvn7elAOOSv0L1hriM7JsUDEyffOkm64xhf11y4asoGi7llCS1528RlLbvVVcqsop3lOwff4ltWwJXOXKDjo%2BdO9KIMm7tVcFYP6CXoXe8N3%2BUQ70yGeR21RSyWawztoMsD3LYPz8rlvW71NbV5KGg%2FbEq3FEayZOHTkMNzFb6k7%2FUwHHgg6gbY2AwZUKKE%2FLid563Nk4d6Eiz0GBaczPAEKPl7fkmhdTx23SPV6Ino3SC8Aoobr0j3lGO98gz%2F9oPzJkE5PNl0HtN%2BSe9MPEhoX%2FcaS%2FeeCS0MaYe9qXhlodOBnWsGg710OpLrKMaRSVCqslUMFO3%2BizIwlJ2YywY6pgFqUu1H50k0p7vE4rZHl%2FVoTCeQL0lqDKmOT7moB%2BT572x6NySWmtuLSOMa9Pa2o%2FuxCHWr87CObDXfGPCATwm20rXXIZBwOVO6Vbuf14Zq7FCJK759WfAWXcOcDhGUPvTbH18ztqB6gvHckd9rlL9%2F1uFGax8xulL3a9qwggrV1S1ijAA42adIvv7RyzU6lgo0k0HtvzpvnfdvNcSgOIsdeg%2Fk%2Fcl%2B&X-Amz-Signature=85efbf12e06c75c850287be77cdd540abccf44c50d9e6699f5b21db6f2f69bd2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5CPFVMK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIFGczeRvExWXiHA3RVHVNbE7PsTQS5jZdqcBZVpXe0HeAiByWJsz4p3xmrvJ6pVmrWpMMsVx8XqMPjuFgQ5M2LEAnyr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMoWi5Zye5pzxletI%2FKtwDbDItD2t5EaqdJTMO44Xmi2B9ST7xjbnWiRzVpPN114%2B5s%2BA%2B7k%2BoYdvQk2BQvtcRBpUV5xZB67cPUJXpdy7eRgqyY%2BtDdcQ%2Bsrc1N8bwMr%2FLa3HqHtKNCIXAEYMVkZfvRb9c7XZ09WI6UNr3XxGDDaSs5xMaJEhspKYCPtASRmV4ArpdE%2BFDa7BF1DZQymPDH%2Bl3GpkbVkauIZ6iWUSC%2FvrRePpoTGaQK8NMKLKiUHdzfVHhx%2BJwiwYeCsk%2BQdVfLoMXJPimpK0NQvLrxNBKNpELgCFgXPlmPTuN2ASdtNQyDsvn7elAOOSv0L1hriM7JsUDEyffOkm64xhf11y4asoGi7llCS1528RlLbvVVcqsop3lOwff4ltWwJXOXKDjo%2BdO9KIMm7tVcFYP6CXoXe8N3%2BUQ70yGeR21RSyWawztoMsD3LYPz8rlvW71NbV5KGg%2FbEq3FEayZOHTkMNzFb6k7%2FUwHHgg6gbY2AwZUKKE%2FLid563Nk4d6Eiz0GBaczPAEKPl7fkmhdTx23SPV6Ino3SC8Aoobr0j3lGO98gz%2F9oPzJkE5PNl0HtN%2BSe9MPEhoX%2FcaS%2FeeCS0MaYe9qXhlodOBnWsGg710OpLrKMaRSVCqslUMFO3%2BizIwlJ2YywY6pgFqUu1H50k0p7vE4rZHl%2FVoTCeQL0lqDKmOT7moB%2BT572x6NySWmtuLSOMa9Pa2o%2FuxCHWr87CObDXfGPCATwm20rXXIZBwOVO6Vbuf14Zq7FCJK759WfAWXcOcDhGUPvTbH18ztqB6gvHckd9rlL9%2F1uFGax8xulL3a9qwggrV1S1ijAA42adIvv7RyzU6lgo0k0HtvzpvnfdvNcSgOIsdeg%2Fk%2Fcl%2B&X-Amz-Signature=b8159efd1031fc04a26f794afc4f85ad44187c5a722f4058308e454901bd28ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFUF6HFO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIFIaTQYbHh9ml1ehQYdS%2BgZJnwhWm%2FxdLJxMcCS%2B9c1qAiBY%2BayKiPEXQ4NT%2F39E6Ny6841f7upVjQa%2Byjf2nzhZfyr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMVS8xzmTIt1etAA8pKtwDosIhGI1dto4MfRMFNHKFpFiie4snvoaYtsKi6BhChJe97brc4qsFUk%2BLk77hqQv0DZz85%2B6uB4yH1kwFIXg4Tjy5hFyed2zpAwPe%2FgG8lnp5JF%2FE0MojDufcix6cRSBuGrU6XqHHeDBEa%2FSglY%2BXC1Mp0Ebr%2FJ4%2FbV4dtCvq58HaJYsYTnkPm8PWnA5sOM4ZEAlY%2FtgMNk9CQZDA%2B3TZpBdQtm0JK2PoqF6bb1%2FtNwAL0TvGtPJq5%2BvBJloK2aq2Q99ugoYxciqSgTm1mE8Xk54edGLwHQVbQue%2F5Yxa09khfANaeM6Cc8Wn8fWcJozQ1eFR5IW7Veg90XvBWSs3GRHbMeemSkUeeo0ke7FPjKtJaz9EM4moVOAq38gqSJ1BB7xtq%2BRcuicM87jFn0FMNgYTKvDACNhy0s9g%2BD6tw2YC%2BsYA949Cd4LHVzDTZ8Saz%2F4zb886rvah7zQBuBs9ie%2B6ruABegMUnMBgFiBtNlTgWFCsHy4%2FPdc1b6u0kq7dAaiOWd%2FGKkBnrE741O9MCRUS%2BZniMDHn32k8g3A%2BX3FdTAVFXWHGG9CU35Sju9WuJYAJuLzTWDeHs9WS%2BV%2FKJbeb%2BwOVd9uSaUP%2B9PoDb9VyzLVPWqoNWXlPC4Iwyp2YywY6pgHcSgkQ1S81vsYwNWXDLHFi8dR3b43WKM5ihThFN%2BeFzM%2BCHssbuFy%2BofSMubQEtGgKS%2FSM9rMimydhHXXGtPiExbLykHPVMYNjtlR9%2FO%2FqDq0Ri46cNfgL7QlrfPqJW1MyBFaOe2vgQ2i8rNKeYOAkLDym0x%2BVvBR4p7TUQZHL3XPamrRm4N4a1j0K6b%2F7btvDezyLMBdLXXvNqt2UX14DoxbNl6n1&X-Amz-Signature=a3842e6eb770981dd1307f2a071bbc2f8c3d42fd6c92b85bb58ca4e82df11bb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PA4FTO7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIE3Jg%2BFrWMzXmY0LU1FPI8lB%2BMSFbXKca2iL7tMCRR%2BCAiEAk3ekjpFoY5HjG4mqR9W7lPUFurqwQo9N95MnM2y694Aq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDIUOz5JuEvLZ0oOqACrcA8bWYDsPkpxcH4IsxHXnWfpNnmwabFDO6lershAITvsiZvsrD8z2nUgZQlpfuPiGDwUtcMLqM%2BvNJv%2FYWiZKzpUXDi2GO%2F9%2Ft8eqsE7tLXsFvi0YvRepFdUheshJPrieaSjajHkXKxVfTBre6dFcggtC6vwZ1IVmSMoSbTHYV0v4uDGE9yRUli%2BqqwoCrSKhSh%2FcFWa1f4qGMMjgqIa%2BEyHbcv9PcBhTPnbMmcBztWvFDISWHPIjcLAldRQYxlZbSG%2Ft9n5s%2FrGYN0QEBzpOQopHNV9zpcg%2FntxSuXWXnhjUjbV5AqXdPeCuYUVLxo4FG28cO%2FBQp5cW0SbCS173%2BikYzvZbF%2FbcDqhuaHJBYDKTxfOIYr4rKPFsUFG%2BDW2v749u0NuIrYMEAr1%2FSOd0cO1RIa%2BEIehvm9Ue8vnaVYgVwE22uh4mrhXhM%2BS2TYy%2FiKfeeW%2BAVrH8T93fjU%2Bk8kCRlhofRvH0S%2FslJjmTrTejJ1kMzBTPoZfkgzNh3nr59W5ewQDsEp1NSiwm87tS%2B4NHSFZAQdr%2F49EqzeHKajs1ugSjZfzAuAxHZG3HBdyboiBouWo6lj0AxeA%2Fflj0Ez734hT0igmlHezTDOMfutegSiACAidznN41fa5pMMKcmMsGOqUBq0YMt9D520RPuPHHd0%2BbIfmMnY9kjciZb2p57sNnK7%2FlHi1OLpRJ%2BslusejM9tVK5wnlj7jokNzdjk2SHtMVJ05wPfinjjX7DMReyieLurSbZ9%2B9kAS7tWHemp1whs2W5fHeRHpYIaMNVH4wahUn4DLFjvvXhR8N%2FtiR1cdPtmUjxZhfYjG%2BZo6aF6U1u7R6P%2B4pPTSF6I0R38LEus6EKs0z6I%2Bm&X-Amz-Signature=777c54eae09d43371907286b2190ba5dd23536bfcc39598641f7059e0ca8481c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OBBUH66%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQDm%2FBETwyWZNbrTHG83MRCeMSIV3KtfdLFKH7T%2FJ2xLGgIgKvK1QAuZQ0JHaWHJmDpv7I2Fzya3j3HI6nQfggETmaEq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDFXiTYvh4rOWchZLNCrcA4OpJsCbLAJ1Wgu0zgb676%2F2ENqqFg%2BOhM1VGqnNfAEvU1PDh9PfRh%2BLRJMdtg7rWHlf%2FVR6dTzQ75P9nwMpAT2zegynrF0CMZAR%2FqFtf0fhPZczPqcvklo0Z5yjFmIoxrtmz8q3hTFTj6Dt5%2FdagOqhbxl4R8oT0KgbH%2FQ86wQucBWQO32J1zlGjVBpXrqaG6qUmIERl%2BkgBt6aUeeFh3JyL%2Bk79Yj36yqGjRzdwHv0RxbThtYHytSxZC3bd7pB6kHHU%2BPHqI%2ByjSKmUWlgIImfxFDQ%2BS9JJr5FhiloJb9iKbo8aagtazNdVO1sd%2BmRk2C8VFVZu2Bifby7uDlxr%2Fbm6ePCuhiH8EuOgmFs%2BqM2pT9nFdA9cbviJAxUlhK31BzcrAwxGbfKZ%2Fx19I0G27c2OHzBzY8V%2F3cy8sIUMAjSbqHfswuP7fgGcse%2FOPVI%2ByVXo5%2BU6vZ%2BHlYCZ0vrOhUsRKbNEYYdF%2F%2F3XPLALUrrVWrKGABSptS6l8wPxsUogs9NbVdY961VxshfPgRXY7zw31TeKDnxhlo0UAwX2YaySlfvcmF%2F0rbPmh3iU7mIcO9uP5ondDp4bBy1A6UalNNDV9loMPzU9fvw7Lo1tG0cI7lkJmQ0h8j%2F4sYoMKqdmMsGOqUBShZF%2FktwxY9mCc3ekPh7D8bkTJhKOpvt90u1YBSVelT%2F28BLOvV5%2B8Ykx6KtDkSuWpLJ8nZS3rNErdWZMBgIcA3AJLH4BqC5cpfYLJ7PMWydA%2BnEDbquma13o89bo9StnDYJJ7qlrQqtV%2FRHpRLWb6PtV8Z44Z5AXMNE6dotCChXvFJ4sTEVz1y5jEcxCeP5Kr5u4J1wgseV6fRVGcU2DTYbNGbQ&X-Amz-Signature=3fdc98d9a96b4e213adab24e21ef2efb0bf0b9b753db960af42fefad675573fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCUKZX7J%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIBLnQkYjPvEUEWzqd4AHQQgrVfUwLrRTUqdXXBwzmsEjAiBy%2FJGoD%2FmPtrhCE3MdhgJnM%2BBE3Cp4%2FPZ8ZU5JGkwjJCr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMap5u9eihZnVnh7yeKtwDNTyPyLdqjA5ny%2Byc2SKltP%2BOjs0LVgcMDMarVhHZ69z1z14GVGH6dUeHTeA2FrSs7fZtA7Rjer5pWKAZ%2F%2FkK3%2BEwSQUykvujgciyM3ndkF2C%2BBi9Qpd1ZZ61aJx2%2FoR%2FJOlVEa4yJTTNDjUbAMXQWxqBH4eAO%2FUDnxY8mBHmwPjJVAcbF1uBHETp%2BlSh5iwN3ONuCRyFAKhPnIekLZwFS0CeKcDGzPgDogPU4jVlE%2FcWlDLzUQZ4X01ODhCqJFJ%2BDd6pfivo7i%2BjvJTfqc1c%2BPH1uC3mxbGcasK7tBw%2FzAGdearvqFmseKyxSacVS9lpFRkqIrMw9abi3VQi%2FKXr9frUk%2BzUxv46vdK3cNGmF27jlGJBoObCmnd2MMqpgM0dZq10MrfccBDPh35YrrKcupJsBemdUrP5YpahOBl89J12iiUd0n4PTlKk%2FKRPozDibnGQPeQYXezBZ%2BNGywX4o2ZX2BFAWjeEO5L02qqjpB%2FPtmS3s8VBRm8w%2FBJeu7NwxSkY2jKohd4I0ozb8hlmdCyHfb8XXHaa%2BzG0VMmoUUnBx0OalWHRmN7kM0AE3zJqVd%2BTePpnK7l6n2oZ1YH34sUds%2BRv4rzLWfwzWzBX5AkGpSaMYHgBKmlKBoswk52YywY6pgGZLi1CwkwNAWkQL3Jq1ftOREBQnHzXr9P%2B9QnhcsL4ztyInVAokOblS5fDmQbBHJQBEI837g%2FLrpQS75TKI%2FJPeKAPOkbMwGnVkBeqjCRTOHgSmUuXcT%2Bp%2FDpH9zBn%2BpkKPYY%2FxSN46wo0T2WmMqzQ4DaQJ00GtJgPJaLdG50MAEco%2Fbch%2BBlpLSSGx4xqZs7QMnKzb60FA1QIoTiKpr4tSxSm1%2F7J&X-Amz-Signature=eb010758759c524c147b1116937106f28689634f6209bccfcfdb9beb4a1a5e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCUKZX7J%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIBLnQkYjPvEUEWzqd4AHQQgrVfUwLrRTUqdXXBwzmsEjAiBy%2FJGoD%2FmPtrhCE3MdhgJnM%2BBE3Cp4%2FPZ8ZU5JGkwjJCr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMap5u9eihZnVnh7yeKtwDNTyPyLdqjA5ny%2Byc2SKltP%2BOjs0LVgcMDMarVhHZ69z1z14GVGH6dUeHTeA2FrSs7fZtA7Rjer5pWKAZ%2F%2FkK3%2BEwSQUykvujgciyM3ndkF2C%2BBi9Qpd1ZZ61aJx2%2FoR%2FJOlVEa4yJTTNDjUbAMXQWxqBH4eAO%2FUDnxY8mBHmwPjJVAcbF1uBHETp%2BlSh5iwN3ONuCRyFAKhPnIekLZwFS0CeKcDGzPgDogPU4jVlE%2FcWlDLzUQZ4X01ODhCqJFJ%2BDd6pfivo7i%2BjvJTfqc1c%2BPH1uC3mxbGcasK7tBw%2FzAGdearvqFmseKyxSacVS9lpFRkqIrMw9abi3VQi%2FKXr9frUk%2BzUxv46vdK3cNGmF27jlGJBoObCmnd2MMqpgM0dZq10MrfccBDPh35YrrKcupJsBemdUrP5YpahOBl89J12iiUd0n4PTlKk%2FKRPozDibnGQPeQYXezBZ%2BNGywX4o2ZX2BFAWjeEO5L02qqjpB%2FPtmS3s8VBRm8w%2FBJeu7NwxSkY2jKohd4I0ozb8hlmdCyHfb8XXHaa%2BzG0VMmoUUnBx0OalWHRmN7kM0AE3zJqVd%2BTePpnK7l6n2oZ1YH34sUds%2BRv4rzLWfwzWzBX5AkGpSaMYHgBKmlKBoswk52YywY6pgGZLi1CwkwNAWkQL3Jq1ftOREBQnHzXr9P%2B9QnhcsL4ztyInVAokOblS5fDmQbBHJQBEI837g%2FLrpQS75TKI%2FJPeKAPOkbMwGnVkBeqjCRTOHgSmUuXcT%2Bp%2FDpH9zBn%2BpkKPYY%2FxSN46wo0T2WmMqzQ4DaQJ00GtJgPJaLdG50MAEco%2Fbch%2BBlpLSSGx4xqZs7QMnKzb60FA1QIoTiKpr4tSxSm1%2F7J&X-Amz-Signature=3bac815b22640167740550087c8468778aaa8c9d9705b55f4cf7e333e039337d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQTHUOL6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQC4%2BvUdM4RLQXcTRPxl7RgbxTfYHwfmVZXwLy9clzSN0gIhAIP4LTZS7AL1%2F4YE27SYXSNZnuIjiqaJlcMDawqBZ85bKv8DCAIQABoMNjM3NDIzMTgzODA1Igxoha2ffcNUr8Deh08q3AO9j%2FoGPl%2BZym2rwlGHUU4vBZ%2FFY3178bBjKPye4zCOTLFFzuKQ0NK0B1hzzd%2BXIwxSrdr4nO5Fh15yZ2Ll39qwOQOWc4tgqwkJQaOavm%2B1fw4Gf6le8sY1EdcgP62e5VZfGsufMPPKXgaVn1dw9BtE2v0%2Feha2B5VHmHSkLTzvVJPHLNWzK%2BgTmDW8SXI2tweh0rH4fwsQokPcb%2F5fknEFUYS%2FxO%2BX2sl0uOf0bOiN23TQUO6aWMJ70hiLiwENuARgCe9UXK6Q9J2%2F9PK6aZ7rxAMfonbF1aK7D%2FOsLsSONV9rhGs135Wf3foQRbX%2B7EkpQC3nxKxiiAn%2F468CyvNvi%2BwPjHI%2BEVn3FQwPNGqIhjCzKW7WX1LFsZS%2FJe%2BsJJ7uCmr6fB9%2FYRSDvxhktpbEK31O4TbeX2SteY447DcKkyL88RdAQdiIYZ8kWS3GgD6ns6XzHrAlQvuEcaX1s2patkl0SEtn24s687GDPtxIIM2X%2FdUZsP%2FmtKbPVna%2Bhl9F%2BUCdMRKzV8Ug4IBSWGYZqhHZ%2BEeeKjxSUgrGX1Z66rvuPrfmdz%2F7ZJfd3m3doLx0qQ25OwFoAESNrfqS2%2FxkBpqGKqObk3X7lR0UPUhhc6K0zocXvaLVSgMsQTDZnZjLBjqkAUwXss5k6RjKNrgnZr%2B6rSCFIAEpcFQPWKmuXRkMTsLTANzRESOWTA0XGxBSu4NERr5h6Fv8A6qGdcKtYDwBmIMXP01bbW6F8fcUra%2FP262cjyo%2FILkOtevHeGcPtcSehjU5pv3LmWQSQ1s8EOS6RU0H0ltvFLXO%2F3Q8Wef5qiVr%2Bbl2lZ6j5u6vfw9ZB5rEcuZjYIA%2F6PsIXqrLMwk2PzCv0mWV&X-Amz-Signature=88abf61f62e60ac9be838268331968451698803683e288035ab0a75c231b59e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623HGDSOC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIAXAET%2B%2B0PqP8E9xvEnzjOSJQE67oUw0UphWOIAIuIf1AiBMceB0vGQcO8eCIAWFicKqORpLa3RlXP3D14WdKNkLJCr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMB2UZVBbH6yXaOoAbKtwDYF%2Bx4UGC9hRXmG3AME7ribZqDR1%2BmkbXTUPIgcQ8zvlDURuqqS85SePAaM9m5nBdDS1MuPIQj96esZcCqt%2BKWS7lgA9XofDYd3lvMTb4PPIy443wpB%2FCOZHBOisoc54qri%2FKPGkst%2FrtFajXlrFH49LDFYzWmMB8u71pJO4OX68wukXVRWs3dR2y%2Fr8ube%2BLm%2Fr2rF18WhG93R%2FP2nIlqH87%2BHtWlQL2moDVjE%2B5mAU6uNt9bMEhvgnjAxae4i821pA180SQN%2ByaT58UWAvFOcPFZPuG60VlcAYAhhOdkXyXZwGkCQ2B6oS87ugx%2FTsZKjD5D0KzAaXZIqOlhQ%2Bm1mOFtBlRpzLb3JqlfaaJsAF1rBcYU%2F%2BdUWLraSSuLtZOn6lx%2FBQtDiSIFWBI1kZQRdYI%2FIOPWRBoJfscu95i5OnlNaYTMD6ZSfABn4yPqq0BdqMo8peZUK7qK1Lczx8NT6IiJe8z%2FvjgCXfhMt1fyU0S2G2py3QT0UQt0Xh71Jk4PYCsGQpm%2BHxlKhR1g7DTQOBNTmpd0EcwbsOFa7lNS2m9CxZvnlmvTjpaje2WAfFObwt68EgfutTVcme7fWX%2FtPiO%2Bz4nHumfDxxh2KtuT%2BhQhJhaK2mZ%2F9wtkTkwhp2YywY6pgEFKx%2BEE7MgjLOktXaFLBo5vUiCIUkewp1OI%2BrfFQ5qBAmU2pt%2FtALqBeGtkJRhtKZqKGZvxbXKLA9eOE0CFoavyeCvj09vgYYsM37MAa6IqgGZRhnlU2bTAw2NlLeeto6ksBol%2BunuZKoUk1Vwezcn2t%2BXJTu7Q2X836jWKvKxv256vBzxXZe%2FoMjqwQ4RSnR8qJhMmP7aUWYB6CLMBalhjr3VSCLJ&X-Amz-Signature=22e08c68db2077e764c56bebe1220efb8515e5d118760fd841476842abd00887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623HGDSOC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCIAXAET%2B%2B0PqP8E9xvEnzjOSJQE67oUw0UphWOIAIuIf1AiBMceB0vGQcO8eCIAWFicKqORpLa3RlXP3D14WdKNkLJCr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMB2UZVBbH6yXaOoAbKtwDYF%2Bx4UGC9hRXmG3AME7ribZqDR1%2BmkbXTUPIgcQ8zvlDURuqqS85SePAaM9m5nBdDS1MuPIQj96esZcCqt%2BKWS7lgA9XofDYd3lvMTb4PPIy443wpB%2FCOZHBOisoc54qri%2FKPGkst%2FrtFajXlrFH49LDFYzWmMB8u71pJO4OX68wukXVRWs3dR2y%2Fr8ube%2BLm%2Fr2rF18WhG93R%2FP2nIlqH87%2BHtWlQL2moDVjE%2B5mAU6uNt9bMEhvgnjAxae4i821pA180SQN%2ByaT58UWAvFOcPFZPuG60VlcAYAhhOdkXyXZwGkCQ2B6oS87ugx%2FTsZKjD5D0KzAaXZIqOlhQ%2Bm1mOFtBlRpzLb3JqlfaaJsAF1rBcYU%2F%2BdUWLraSSuLtZOn6lx%2FBQtDiSIFWBI1kZQRdYI%2FIOPWRBoJfscu95i5OnlNaYTMD6ZSfABn4yPqq0BdqMo8peZUK7qK1Lczx8NT6IiJe8z%2FvjgCXfhMt1fyU0S2G2py3QT0UQt0Xh71Jk4PYCsGQpm%2BHxlKhR1g7DTQOBNTmpd0EcwbsOFa7lNS2m9CxZvnlmvTjpaje2WAfFObwt68EgfutTVcme7fWX%2FtPiO%2Bz4nHumfDxxh2KtuT%2BhQhJhaK2mZ%2F9wtkTkwhp2YywY6pgEFKx%2BEE7MgjLOktXaFLBo5vUiCIUkewp1OI%2BrfFQ5qBAmU2pt%2FtALqBeGtkJRhtKZqKGZvxbXKLA9eOE0CFoavyeCvj09vgYYsM37MAa6IqgGZRhnlU2bTAw2NlLeeto6ksBol%2BunuZKoUk1Vwezcn2t%2BXJTu7Q2X836jWKvKxv256vBzxXZe%2FoMjqwQ4RSnR8qJhMmP7aUWYB6CLMBalhjr3VSCLJ&X-Amz-Signature=22e08c68db2077e764c56bebe1220efb8515e5d118760fd841476842abd00887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666J2YKHPH%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T100129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIHHSBizIRmwc0myGnWPQlKwQQ8d42nz%2FxPjFkIHGBC9eAiEA771QJ3oPVlFI7WYtzFc7ejoKFW1ODy3uYy19T8Wzzpwq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDFhEE77o9ebZAZqwsCrcA4sp2pfPj6Uq%2BA1CMTIOPWthIHdwa8Do8Xr6THxvzUYhvPt8oA4KSnAWL%2BE6YQ%2B1UQb6%2F0zgQ9YYNMNp%2F0Ql%2BtHoehg6XgScNw0DnFj5Hcbqr1kNeyTHjR3EidaRtbTyoQKhGEqSPlwHVTS%2Ba%2FFAIBg0TLIRziqbyBWkFv%2FkYZBWMmuJOkl9ThV3ZA%2FAWNQz9i6b3gFGl4FuoUT4HfStFkpJtqp8fZmgkBWThXm%2FdrlHIuvaBZFrBL45sx%2BmEp9nLFnHn4uBWMQKoFTDHMpTu4%2F3zS5dU1RdXxEQolnlTv9vsZ3VT28l%2F01rYmT3Y%2Bgf41tI9jqxo1x3qtbTCvsbNAT3maZTQ%2FEhxxtE1yS4c%2FVP5SCox2Qlc2nDuGApMyKdnCFkZ7UX3Y1rSC9yQeOJUEbOOiQKh%2F3XXT6wR9yO4g3P42ikXa09c61rKH4mDzzzQ8KXzgOYk49y3XXU0Xp1DgXwiKUEjGBAJA%2BorERUEV9laDCivVDNNCO3STK4Bu0E%2Btd2eCc6JVbvXiKjsYkCIY4DDxBFC7fRvwui%2FCKjR8adtUyU1ejujr%2FEvbk%2B2MWCKxRaVCjUgRAtPSKlwmBT6wP4j8c1jFbtzz4Dy13cd1LgC135zy65gsMdaIJLMLSdmMsGOqUB3f%2FszVw1FW8MNyYPndQZosmAXnJzhhIo8irgdqbEd0oj%2FcVbjEjtc6rtkXyxgfg%2BANjVDJETEmrsn7kvV6TBPAQ6GHomdzTQHWaI4sLialdAe3b1X3fotlUDR9vVITQagfZIGOVHhOxWsBJnjVbCb2Uv%2BqVNSUpKkJLBzdhfurulZi4h%2BScvB%2B9nxgSETfqB7tXF10rvF7yQBGU56QwE5bn41g%2Bu&X-Amz-Signature=1f9add7ea62e120b3eef4849d4dca469060807f2f98369fed412a463c7d788ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

