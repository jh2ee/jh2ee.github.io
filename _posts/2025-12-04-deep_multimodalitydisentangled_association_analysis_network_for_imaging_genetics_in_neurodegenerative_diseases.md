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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666INK24RK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIBU6Iw2O7HAWozX%2FpDvzzk9fGDL5CVsHtUHV6E2Tp%2B9WAiEAmQNWwUP%2BakKqTt1p7Z0CQO53YwPCkATbar2OIRvEzvAqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLWfWWbZzyrM4HfVxSrcAzvjeIVP%2F0CvnMi4JcP8Pk9A%2BqDPk%2BpG00iY5civjecgKN%2FBpnHUgfbZjfWYErpP0gTE2w3H%2F2rWyNg2n9KWeyuNyKCxHx50OQotJHKlB2VP78frIA9AMsborN%2FkrxS21m1zaotEpgEvTy1yMlQzuPUkcXNiVkKAG47Snz5mTUPup0Qobs35Vk6cb5P3x0gcBFcrEkfKmzxf20PWdO0Ej35OoCzD3x1wEP6oZSygZ%2Fb7QFNRyw0%2FwOw0IUXxYQrNEjDyhCaNxYcT2Dng4nqsG5nHLzhtObydSq2F80TGVkcagDqTRiWDrzRqSxi9cE69ce14DWYHqDS4wKOTvl9cpIgEx84olAIR4VhjU%2F7neZ6DXvngOIBOKyLBX1dhIgk2qHbkFBjPl2z1UcDS8Qnl1R3alOwtdFFxl3AyM0eElvkRbhyBBZRUPT8F1QnHHmvS7Z5UxYICds%2Fn1jxz1dNQhuj9aFn4OJfPuqJ5qTm60zUYQH2uXV9zdN%2FW%2FsoLpAgDKb5r%2B87qaLK25TRdf6umqybfKUETxJEmG%2BdngoaK65ZFLbSBzycvDSPq%2BWG6CW9gDKUatre0n3fna63NQIwkfYk%2BqDuLwzEMip1drfl9ro%2BAVGwfkT0h4a%2BgAUY2MP%2Bqis8GOqUBadMXuOUu0lP6ubh3mDf%2F1LqaWlIC8KsqaZul%2F3zrpXWreuvYlBaTZ1vdAc9fgwwVHo3VEio0gMoRJH2Q5XsIbjJxHlPrQUCqYUFdqYJHb8PGFwdwFO9MM9cDraFsooa531UzKhh8z6EMxBCk3RVrzcF7YT4MYcxM0cSdEXuLmXXzXAhY94lD2l4wzeyZiAvINC11FiTfsxb2H2VQ7SHH6V1Fm4ex&X-Amz-Signature=15c31d87d152b98ed71cece84fc9398de71d3fc6cfeae3339012f4ecaec27ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666INK24RK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIBU6Iw2O7HAWozX%2FpDvzzk9fGDL5CVsHtUHV6E2Tp%2B9WAiEAmQNWwUP%2BakKqTt1p7Z0CQO53YwPCkATbar2OIRvEzvAqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLWfWWbZzyrM4HfVxSrcAzvjeIVP%2F0CvnMi4JcP8Pk9A%2BqDPk%2BpG00iY5civjecgKN%2FBpnHUgfbZjfWYErpP0gTE2w3H%2F2rWyNg2n9KWeyuNyKCxHx50OQotJHKlB2VP78frIA9AMsborN%2FkrxS21m1zaotEpgEvTy1yMlQzuPUkcXNiVkKAG47Snz5mTUPup0Qobs35Vk6cb5P3x0gcBFcrEkfKmzxf20PWdO0Ej35OoCzD3x1wEP6oZSygZ%2Fb7QFNRyw0%2FwOw0IUXxYQrNEjDyhCaNxYcT2Dng4nqsG5nHLzhtObydSq2F80TGVkcagDqTRiWDrzRqSxi9cE69ce14DWYHqDS4wKOTvl9cpIgEx84olAIR4VhjU%2F7neZ6DXvngOIBOKyLBX1dhIgk2qHbkFBjPl2z1UcDS8Qnl1R3alOwtdFFxl3AyM0eElvkRbhyBBZRUPT8F1QnHHmvS7Z5UxYICds%2Fn1jxz1dNQhuj9aFn4OJfPuqJ5qTm60zUYQH2uXV9zdN%2FW%2FsoLpAgDKb5r%2B87qaLK25TRdf6umqybfKUETxJEmG%2BdngoaK65ZFLbSBzycvDSPq%2BWG6CW9gDKUatre0n3fna63NQIwkfYk%2BqDuLwzEMip1drfl9ro%2BAVGwfkT0h4a%2BgAUY2MP%2Bqis8GOqUBadMXuOUu0lP6ubh3mDf%2F1LqaWlIC8KsqaZul%2F3zrpXWreuvYlBaTZ1vdAc9fgwwVHo3VEio0gMoRJH2Q5XsIbjJxHlPrQUCqYUFdqYJHb8PGFwdwFO9MM9cDraFsooa531UzKhh8z6EMxBCk3RVrzcF7YT4MYcxM0cSdEXuLmXXzXAhY94lD2l4wzeyZiAvINC11FiTfsxb2H2VQ7SHH6V1Fm4ex&X-Amz-Signature=15c31d87d152b98ed71cece84fc9398de71d3fc6cfeae3339012f4ecaec27ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2VB2CEF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIGilYNYsp4gB2KZP8J2zmQRWXXuu9Z2nvX%2BDS0s4DPXrAiEAqms%2B6o4PSkEu1t9diYZ%2F7Se%2FPxzZOzOsUVb4SLkPspIqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCsn2%2F1Ear65ATybJyrcA8fWZ0EVX0Pi2mbcibUDLIcHgfGJA1KPEaFXjZcSohwCJbH2wmAQZns8AG0X1l8uF74RMQjDUalyPOTyv7ccRSz%2Fi8hOIePgofGxb04CEcHVX7mDOWYEkuHnuKNRqpBdjjhgAbygS%2FkW0Rydl%2BCYzTiWKupqeVrRtf1%2F3FJOY55D17PTpBs00bxjh5HbXh1ZDDwx4E741SkdiJJ%2FseAcMgz9gpwqB1DYzBsfpsJZoZTLdD4T%2BwTAbC2gxtdnK1idAn4rsnmfBSyWe%2Bed57JBtptAd1yGyRlc11UXhxtqE5aIcwdRrIoKSX4NSa2wGttPV%2BYpUiOfGeT98NHHxWmek2cuBi73DVpM2V92ljJgdWhbZL%2FdVDsTuR%2FE7f2w8AwNJQv9LegucUiK5wnoEv%2Bu5orsat6nGcON0iJPqSbcgjVVXpOGRVjrqaAToTGbm26r8qrtXy%2BCO9OxHw1JlQoS7%2BIvBnyz0W%2Fxw1BExYHA5uqFF3c4LZ2sAlNjnbCbVekyjifJlMHwGPNUnQX8bKG1Jp%2BqGfc8Y9FSn2bxrxpJZHWDXdPhCIbG8%2B9VFnvCWSXXj0y6RLpleNKDp0JpQAFhaC1XeYKh2N3lqSW68TOLRsOlZ5yalkfWsUw6PiKvMI2qis8GOqUBcbLxuRhL1yjDf5jJ487VlwVblMY%2B%2Fd4cDkTjZZinj7pEbgaojPzPmm%2B7vjLtFe5Z1fVFMf3CsSHycstIL2Xk6vRt0QD9bTCe%2FpJ9QbvtXRLThPgF1j63Teu0%2BEt57O4sdYPOiN8NC%2FKkSsJNY5Zh05wfFW6LqCPj8JKTLnk2%2Fj5QXCBJHkfdgqw4nYSrHYCfxQpx4ZhMZe7Lhx89OEeNdOd3kunP&X-Amz-Signature=a1717bb15b10acdcc176b78ed935be143a49e08be86532b55ac346367e457312&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCFAGTHW%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIQDJBj78qGqyqTVrSbLWDB2CFEqRymM3QNetfQ3SyseAgQIgYgOxtJt66Dbkpjl1WFbQZ0QcxN%2FM4poVs2COIwP%2BT%2F8qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHFCvGsUk2AGowR0zCrcA%2FgK4hbeHWwz21XG396CSKpAw6zb3yZv5L%2FtbmduhTugcbeTKYeR0v%2BUUbbku%2F%2B2wem%2Ftgi%2FP2gJDsz8arRgut0pbWNMDSqAFuTM7LieR5n9SddR2lb1L5UPmEwq2F9a8oSZuc9wOObI0gqO9felY1Zw0Fht4LDNB3GcTEBg6r3BAW0c5LQRKPSmBnJmNMXowxhNHrSf8UQsDHrSnRaZzkwg5ewYLh1g1MI%2BWjpYrxlan6JAeMrZf9clNxuISk9OojaR4ezK4rSkDbglEJ86lu%2FAtCi8yNmpiI9TYk%2BrzQKvqhprzhSL7ZrocGpwftfU05zaJqHivR3ALHEbwZJXTietMysL%2FD8cJz9ywCX9MBk3sPknKZoxKoc479B9T4yMszdnRcJ3kXGu9N95r%2BMsuA5AjAU8zGsTey0Lcma7zOaH7BMsSS7d7DBWM35Wt6wI8MXPXKSpMaUTDnG51805ryu9rhO7wF0QE%2Ffrf90uI%2FTyj3iDhO%2F3gP3JH9j4Mu6hy1qjNUK2clmvN0rY5XZxDBOtS4m3RcVRX0UF1k%2FnJVotnaClHZA34wRnXp2ytv7y3a7sYUoRt0tbGm8qPtBnVApwWHfJjlCiU3DKQ9BWliKDPjrp71oFKU3XqF2gMP2qis8GOqUBpLkSh11h4wfazBCSTfQ5en8bHzgecpLonSr7ncV%2Fq2PToEk2WUvOV8AD9PmtdVyRYnSMQK0C%2FvLf6xGTMT5hiu3mz01owBptKihA06lknEkUy9lE45DOqGH%2B2oFHwzMcJRdU%2FW6p8UYf0B5kqgDssgwRgQYd1PRCiciq0fpOfNBaDC1Niq%2BxH0iz6UEdNvLLkRYkC9XdNxGLE%2F%2B3%2Fe9hBHFc1CnV&X-Amz-Signature=0d3a58c9c82e1bcc158ac7d220e7b13ac3cdd0b24cc54b76c6aee4853f283f29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCFAGTHW%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJHMEUCIQDJBj78qGqyqTVrSbLWDB2CFEqRymM3QNetfQ3SyseAgQIgYgOxtJt66Dbkpjl1WFbQZ0QcxN%2FM4poVs2COIwP%2BT%2F8qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHFCvGsUk2AGowR0zCrcA%2FgK4hbeHWwz21XG396CSKpAw6zb3yZv5L%2FtbmduhTugcbeTKYeR0v%2BUUbbku%2F%2B2wem%2Ftgi%2FP2gJDsz8arRgut0pbWNMDSqAFuTM7LieR5n9SddR2lb1L5UPmEwq2F9a8oSZuc9wOObI0gqO9felY1Zw0Fht4LDNB3GcTEBg6r3BAW0c5LQRKPSmBnJmNMXowxhNHrSf8UQsDHrSnRaZzkwg5ewYLh1g1MI%2BWjpYrxlan6JAeMrZf9clNxuISk9OojaR4ezK4rSkDbglEJ86lu%2FAtCi8yNmpiI9TYk%2BrzQKvqhprzhSL7ZrocGpwftfU05zaJqHivR3ALHEbwZJXTietMysL%2FD8cJz9ywCX9MBk3sPknKZoxKoc479B9T4yMszdnRcJ3kXGu9N95r%2BMsuA5AjAU8zGsTey0Lcma7zOaH7BMsSS7d7DBWM35Wt6wI8MXPXKSpMaUTDnG51805ryu9rhO7wF0QE%2Ffrf90uI%2FTyj3iDhO%2F3gP3JH9j4Mu6hy1qjNUK2clmvN0rY5XZxDBOtS4m3RcVRX0UF1k%2FnJVotnaClHZA34wRnXp2ytv7y3a7sYUoRt0tbGm8qPtBnVApwWHfJjlCiU3DKQ9BWliKDPjrp71oFKU3XqF2gMP2qis8GOqUBpLkSh11h4wfazBCSTfQ5en8bHzgecpLonSr7ncV%2Fq2PToEk2WUvOV8AD9PmtdVyRYnSMQK0C%2FvLf6xGTMT5hiu3mz01owBptKihA06lknEkUy9lE45DOqGH%2B2oFHwzMcJRdU%2FW6p8UYf0B5kqgDssgwRgQYd1PRCiciq0fpOfNBaDC1Niq%2BxH0iz6UEdNvLLkRYkC9XdNxGLE%2F%2B3%2Fe9hBHFc1CnV&X-Amz-Signature=3611211174fc572c2a582707eeff4241065c90fbcd1b83c6ca54c6d46816da18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAXQY75I%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIGFoYdP1XmRPzvGZlLsfgHlHJjrzj9F0XAhhiq9kkAa3AiEAye2S5xycnxbpnMJcSmUH1DppTzdVLVDCzjSp21Vb%2FZIqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEj6saDlVakbunUJrSrcA2h5%2B%2F2xae%2Fi%2Bbd0q4ISLWYUDQyoUziPHfQ7Uzc6FVw4q6xhHbPMp8nkLyMIIvzHJ%2BnDUe9FTbgfR%2BY4CT7oBhLj7F6vMBMUHiJZkG1e4jxnCnbvo6cmrMkXog5J9pr%2BTgyZP%2F1UVRqVdVWXG4ggPqC7pEwdP0IIajm8X2GYP6Xf3ueuBbZoZMPp24U967BVHZd7YXF4N145OTlNOVPEI2eUzTgXEwi2WmWXPrBY5KpA4jcZy22j%2BQpzuDnveCj4fOHYdE85GKApMYmbOVYB8XNSiknPoceuE1PwFniNYGvjyF0bUtbP2do8Vv%2FvMXWWv08SkPEyLsrslrocUq%2Bl%2FJk3Bxf69UcbOaQwwKuvkI4wnVaqZasf%2FesQwF3%2FIdw2uIz%2F2ruPlXEjauHqA4l2NWTv9kCUBJWKLgNZ3A95Pn17TbXbGqCaGvi%2Bz7L25EHhC3%2F8fEFcigDZiK4FiviSz5m%2FzM5kd5C6CxROUnMpm%2FTO1WMynVsIVU1F93wugF%2BeKIwpE22FeQz0rnhj%2FgoGTFbxzfPS5loDf%2FHwbEK%2BDvlUcpCrxxyjbIGH29HntsX85O6x8C7Umey24B%2FxMZcvRPS80Lz9OWdjCkW8GeGGqj%2F1ukvhd6nh7lSWGM0CMMCois8GOqUBMe1td7EvjZ8eTEC%2Boohwg2ZC%2FgLyJFiXnFaVD3y9Tr0byP0MkZZSd95sgjmCmIxeXqrGgshaYaHqkZxPe41HRWV41WvKl%2FleKL8lBhCEA8SWT7t6XMQW8F%2BYChi21F5vTzYtnXivxlmqPDlvAVomryTE4pG7rS49dlR85kPzxF72C2MkRyN2hyOKwFc7EaoXfs7tsLX%2Ff5BH1N7U9jGFx%2FpBRy2q&X-Amz-Signature=540fb74d37d3724fe73c18b139a74848e74731a3e44ec7491f89f6e46745ce83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PZ3LRA7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIFWl5fVB%2B5BWJKK5Z8hUlSK%2FrgIDMUSmgeUiVjJgFGFLAiEAx4fvHT940%2BEMYnIWb7d9p%2F%2FCDXw%2BBS0UiS5NYiTgYv4qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGnwW7YkrHmkr6nsxyrcA9aD8ZJLV%2F0uASjsK%2FvIOjdeteTGzPw0Eduk62YF3vWss8bqPHT%2FPQ0f8RyMtsMkUpsVeMYSxvcsyGZPAyZ4VEFlOnKNuVWkBFNQ36Q%2B2jyg1sElBP0rR4HbW5iYbaILp2IsCzJ%2F4rnj%2BWma%2FNChu7UuqFDqsmo36Y7BkKvMNO0ipiFhOVroTWZJ728P665kbztfIvhI727cXI5YJBoLUeYzowaOfaxBQChvVFUi6cbZaoh0p%2FnbKoOEzK4rVK3%2FtT1BunGPi4GWjIWVGHU21uYJGS8yYVEZPolhlHUCDxk26QhyuvnOsh1zZUPJF309Vvgf4K6NbkYwbZBQVzARH6cCe2k1Fuow2zEaPcdlNMuWudokml6EHIElySHcbFe58lA%2FW825XS5B7%2FdSYKk3xa6auhgQqbKiftdWS3wt1G9UVkEQbnhZfKriqol1JdF%2FpQmUyJbRgp9pKagoxoMiuuyLIRv%2BglT%2FzEF9l%2FX6WGHpRsw4ujoEWvb69TDh0fXw%2FbcHzcwuryY%2BKXpQUVWWQ3qJh2TtdLL7YtZqq5PStio84eWgVQtdu3gJCXKxG1UqlXzAWY%2Bpt61HZlMBQiNRyiTccW8H6nvWjscLa8SN7ihGLSH1SdHFR%2Bj0huCkMLKpis8GOqUB9sgheCAgY02e9g0TlTWB4MOrq6Nb3O1RQugHtiZvS1k2%2FnjCwvHyKSYstIx3ANwNxQupAnvV%2Ffg9mOgDvhiWLcVxjqQAmR6VO8uQcmhtXlWmWhHjXwsG6ly%2FzOATE1hXG%2Fcdk%2BUfcr%2BEdUM9MJv21pawSnw7eraBBJYI36SvCx8OJbIoJSB2cmd3n8XpDuxwZP3oFwtvff73PIIywA21UiwZtjgx&X-Amz-Signature=7fe91674be1f9a138019c405bced5666e327e60c05ced3f62bfd47f51ae854b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIQU7KDG%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIF%2Ft0lIO42ApmZH66akMT2IeOboaMaCUiJQOtzFM8cWmAiB9vG1H2LNITdDUoGa5%2FNY91tFhNg5PZhZLEIV0AeBglSqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG2RHXH2qvpex%2FGlbKtwDrZsgIA9C5UoGbwEKhPhN4rAwnMmIRzRN8U5Q97W%2Bl%2FoCSDkBG1B9vsdG9pMJJg%2BjEpM%2FH1%2Fr0VQxrmfIGrz3gMYjSe9u%2FVU73o6pPTJNxSJsY7vAvY%2BHcbu7jEKeTxluHznW6r6%2F13Or%2Fmw7c4UG5ytVXN0O2X02Xc%2Fz70ZJ2vdoQJUpevMW48z6Yz06BRCFRrmr9O2Seo7a9tf8b%2Fx697xFTpuUuFoGy%2FsftXboVFttnQ9kaApPhN2fLIaFBqoJf0n3Q6ugAZekhlChNFpx4sc2x0q0E5R1oeaWVEZu9zuvl3TPGiedQZ%2BpxQA9tbcqnpfwrT0FAqfaThPoeG34%2Fvs2mR1ajv7bFYIsiHLMu5C1cyYHx9gsWS5H7G282wN0EXy%2F5iGsfXXEZprAYuaWoyp2sEMowiXHq8JTHAAM7pThUqBVHY94re%2Bq9eeeEVUII4Ljz5xJIq32FTfgcDcoX6wQKLddxbZCqFmibGsUYj01ECXe6JzwkPnJBz6o1HOpxPvYUnEufensZg0F%2FmuBSpk51LNW987s%2Bg%2BDtGj9lwz9gvsnsU1nmK%2BSha9hjDLYN46wzFv%2BpM3fgGrzdQDC0f7KoG6tEpnOVlkzuR6LVAlXEWXdP3QProYhTeUwvaqKzwY6pgG19FckxASBJSWBVS5qmphZaqenOolc4jfjoOiyQICBAAIBozcaH%2BLwen2%2B0iRNjU67rZlAgNw4pLQaqDv1G%2F1fTSb5Ii7fbc6BQ3if19sonJAXyChikUdvXpwWBwq6OhjBhusrRFzrcw%2B70kZRD9cbSqvkxPFulIX2iVSlk5jAS6cuxMomIMK2aK0543minaIrU8AUqNMPMFJ%2B2IuUfyT%2FBon6ny6X&X-Amz-Signature=f476f86d5ad1622322ffdf8f37186cd6afe48ffaf0386dd82ba0567f4d83a548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3AUIGEK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJIMEYCIQCH0p2X%2BVn6eV03RC1J%2BDRyldTHTFO8GUnxC4pltzz7dgIhAO3OE%2BdWd3fScOV0TrrWXSL%2BVsydUaxN7nRx4c2kw6lxKogECN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUiVwuqh8iu5munDIq3APSRl1MkkhHQcVv2mjGJuJl6qe7%2FCCE7%2BdDWC1kK4hGzqMBeXGIqYHguelk%2Fmm5vKSmjMkiHVMBPiiRTpED92NJRxVzWqenSDFQILHIDgjT%2FqOgHTtNFmWsP5mW679nCtDCp7m2OtBLOuST8NCWy%2FGNETtvcPzeOHsIO6yvni0eI1nnsdtDlJxib0fVbLqKkjFFK7kxCvM31hDdRJ4LTFe%2Bayjsp%2BrFWTn0G4Lp0VyCvURlAYwlb4CzXEN17Z0QSnoL7EBnBWiT0lQSwom3zdQQ6367PielQki%2F41URB8xLX301MQuH%2FEpJIjWCJ8Ez3Rb0xryhySvVf3CqU2yk4NHmWtr10x68%2F%2FUdjvyNTzHIA9cbHz47OoH0hpAtDyMnGBazj%2Fcno5O7trwD5QVddCVlhzPkPDqxdD4%2FWIYUwaBslYYnIlrRJQ9X8YOuKvDxggQ0QeKGN%2B1q3Tq1EV1bmODtkfIo2y6UiUcGx4Uvfd19ehkoPuSsxpxffNCvs%2BKJ4dx5kTB2QYpUQ039jW22P4YgeHW3Mwi0uWMkZBep1eM9UHn%2FKR%2F%2BbV6mI%2FfkbsDPMi9R7Gov32ndd7FboowI7YC221GJs0XMNKXUeX3TUPB16bvweQF8hPR6UimTVjCEvorPBjqkAWPHF3SeNUg7%2BL%2FyQAffCCViaYtQ1fZCp7Qmwr1OMWfW%2Bq5z0zd0XreUBeVdQmNH%2Bj1ZKgARAt3xOEEZrS7n%2BD9JhQ%2BM0DiJqseON2AT8f7QboWYCSToduZGA11agDL6mKnA3PixMSzRw%2BVzqco8xKCKxZywG9syfsAiWo%2BFpQIaCUGlTTS5xWsNbam4xlFo885hCO%2BdO3ULCHdHTClbfcVK0pvG&X-Amz-Signature=d824f7093b0772461a1866eea4b955eb287340952d333cf7cbe4cd691d75c92f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3AUIGEK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaCXVzLXdlc3QtMiJIMEYCIQCH0p2X%2BVn6eV03RC1J%2BDRyldTHTFO8GUnxC4pltzz7dgIhAO3OE%2BdWd3fScOV0TrrWXSL%2BVsydUaxN7nRx4c2kw6lxKogECN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUiVwuqh8iu5munDIq3APSRl1MkkhHQcVv2mjGJuJl6qe7%2FCCE7%2BdDWC1kK4hGzqMBeXGIqYHguelk%2Fmm5vKSmjMkiHVMBPiiRTpED92NJRxVzWqenSDFQILHIDgjT%2FqOgHTtNFmWsP5mW679nCtDCp7m2OtBLOuST8NCWy%2FGNETtvcPzeOHsIO6yvni0eI1nnsdtDlJxib0fVbLqKkjFFK7kxCvM31hDdRJ4LTFe%2Bayjsp%2BrFWTn0G4Lp0VyCvURlAYwlb4CzXEN17Z0QSnoL7EBnBWiT0lQSwom3zdQQ6367PielQki%2F41URB8xLX301MQuH%2FEpJIjWCJ8Ez3Rb0xryhySvVf3CqU2yk4NHmWtr10x68%2F%2FUdjvyNTzHIA9cbHz47OoH0hpAtDyMnGBazj%2Fcno5O7trwD5QVddCVlhzPkPDqxdD4%2FWIYUwaBslYYnIlrRJQ9X8YOuKvDxggQ0QeKGN%2B1q3Tq1EV1bmODtkfIo2y6UiUcGx4Uvfd19ehkoPuSsxpxffNCvs%2BKJ4dx5kTB2QYpUQ039jW22P4YgeHW3Mwi0uWMkZBep1eM9UHn%2FKR%2F%2BbV6mI%2FfkbsDPMi9R7Gov32ndd7FboowI7YC221GJs0XMNKXUeX3TUPB16bvweQF8hPR6UimTVjCEvorPBjqkAWPHF3SeNUg7%2BL%2FyQAffCCViaYtQ1fZCp7Qmwr1OMWfW%2Bq5z0zd0XreUBeVdQmNH%2Bj1ZKgARAt3xOEEZrS7n%2BD9JhQ%2BM0DiJqseON2AT8f7QboWYCSToduZGA11agDL6mKnA3PixMSzRw%2BVzqco8xKCKxZywG9syfsAiWo%2BFpQIaCUGlTTS5xWsNbam4xlFo885hCO%2BdO3ULCHdHTClbfcVK0pvG&X-Amz-Signature=6e9d0724255035836550b8caa29badd4dc8727df75461c0fdda7fb6f41a919cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAOMPCT6%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIBQNuSvh2wN0fkS7u1f%2FWkoqWDpcKyYoOC1A1m96osrwAiAwRwIEzT1QYTsC1mwtVN7fE5XhFear%2FYPIrTCT6Fe3OCqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWa4yoaFFIVGOFLDmKtwDiQKVTplQ5%2BVFTl08l%2Bb2VgBxtLXVw6I4hvzD2sl6d3VIbvTbJL3FxxKLrLRcByim7EYQYqctNcC0%2BBRWCTn6F09XN%2F8YJmQgxft9Em50zU13xdNRJk3T6C2nVvVZOvm%2FlyZz7YoB9vHlvYVhyvGbyCv00YtcDq4wXDHaDBsncGwZHZOUfZBNy87MBbTv9bNOxJwTmS1wQSiM%2BGflFZO%2FNNWGsI4ceWBRcpJLfc8EW8PwDHxjc%2B0exhmeeSgJ2XnlWpURjk3f5LuXUipisJ4wOeH6r2mAUFWsJixdADBO2Oo0ML2r0wErZcCtf4OOkDhwNbpG3UYwpLnimP3GnSTbXAMemAfyNB8ZesDH7wcetAsZykqOpCx%2BR7OPnguiBEXne5bX30L6GGU9P%2BleBRuplbB037DSC7TNstka1XWtmmv1ZX4UURhEl%2FyhI5KJ7Ydj9O2Qrs%2FvpJnmZ5uVtQA2UqEHHBAxPvBtRtDrlXfflKBhnfHnrUxOvs59%2BJK5JvGGxPxI%2BbNTAxP9RXZmDqupi1q8OFjxxZLcDxP6Nl21oUar3P5doVey9vzcOVEfJk5RgXBel6PxIvPYMr2TyB9Z72G9kS7XOaPEL19Stzg%2Bn6Xcy9gGmNUNCKaZLkwwvKqKzwY6pgGNTEJpiV%2B46TrnS4TlLv3dFLBqbAnotMrzI3X9619BMUuULGkSwyzHRjqRHV87PATSis2bV4Mr3CnIDkFz4Yl7jOMXeM%2FXEjslpJ35ozNJ5lI7LPyUwovTl9Z5VblduRyc9DdlFBvZGVQCq%2BZTWMzJxxmHUf%2FBCalucYIW08q8vHy%2BfCqK5V%2FmTvNhrt0uhtWETgmteQ8aJPWfKPvhUMUDMUM0H5s9&X-Amz-Signature=097ffadd88a755e71042f4be9bb8b3ed9118674a0bac7be36dec064424a8e9fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHM6PZZ5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIH%2F2CnY%2B5TjI%2BYvSFCs9IXVaFLBnJ1HkYUZtogIyHXEvAiAhnMiPfelmxtVLZYKL1zSvq53qoT3ZTJq3%2FSHkhnDMDSqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZrpA7loZfUHPSMDcKtwDItbbQxivICFzKR04Uvufvo0wGycTVIuHBnAX%2FN3d1RTKYOh2PhqL8RAxJOdny1rXXhPGRk49BHT5jaG71OSMFYSl2FwKTUc07im4qitobf8V%2BKfpdRNZbp%2Fkn7o1ruwSqxjnxrgd3ffl4Md0eDizfAY32BmVO0zh95U8p%2FdGpaWKpPjridsU5Zo9voXehfClTo4QCiHHuc1VHpG%2FO60ONa9KC%2FlwaiXAwfzcB%2FOjvVRjltyXv7RQkjKrujsKF9sQr4wXqxknKiJn2ANiSX5oVo%2BLHhCYNkLeoZwwvgyAvWLg%2F3a%2Fhf05kBYx%2B8LY7yo2gZjhKPSmPrTkh89KxJ8V3H7EIT3mfvyRQwggx5qx16KtrRkZ%2BU2CFTsbH8okjPxjzunsATOZ3pmzYO191Li3QcthoWQvmhAKFuvsVK1I9JPUA78qS8rh%2B05FhUQAFqjt4PQh2J%2FSvcITYZZlqNq72BVCq4fOuVMr0RUDXokvG1KKY6%2FSY24G4yLkXQ1d0HVf%2BHXRndBfb68K2MzRQ9a2ULkpN1qnA8bS7xTOfafGxWjyAAhmRAdrm8GZXg%2B7pwYYZjElDMrNnef0JHoea%2FVnvFhIJ9XrulMUQD74Hcb1tefZQl4WXA%2Bq083tzLsw36iKzwY6pgFH9vb0a%2FVEVo5vWUSrLmEpdLVScS1dE9JUaVR9ukZQjQfhDfRaXhCS%2BDy71WgH9SgIKhbqMibzoJru3uuPEXJ%2Fu4c8SN2X5MraCohUxHn7Sz6rFnHLiYU%2FlZmj8pBqGxrev5Hos4Y8kiBawvJn4vubVUQSc7Nd%2FcLjxS5nVAoBQjUiOOu6GG4C9qiKXwZbko%2Bx9BIJy9cXQGKGCz47nR%2FGwWNPgorM&X-Amz-Signature=0a07a31e6cc619a0781248138ab0abf05558189e66a7af13fbcda3ba577ec4b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHM6PZZ5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIH%2F2CnY%2B5TjI%2BYvSFCs9IXVaFLBnJ1HkYUZtogIyHXEvAiAhnMiPfelmxtVLZYKL1zSvq53qoT3ZTJq3%2FSHkhnDMDSqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZrpA7loZfUHPSMDcKtwDItbbQxivICFzKR04Uvufvo0wGycTVIuHBnAX%2FN3d1RTKYOh2PhqL8RAxJOdny1rXXhPGRk49BHT5jaG71OSMFYSl2FwKTUc07im4qitobf8V%2BKfpdRNZbp%2Fkn7o1ruwSqxjnxrgd3ffl4Md0eDizfAY32BmVO0zh95U8p%2FdGpaWKpPjridsU5Zo9voXehfClTo4QCiHHuc1VHpG%2FO60ONa9KC%2FlwaiXAwfzcB%2FOjvVRjltyXv7RQkjKrujsKF9sQr4wXqxknKiJn2ANiSX5oVo%2BLHhCYNkLeoZwwvgyAvWLg%2F3a%2Fhf05kBYx%2B8LY7yo2gZjhKPSmPrTkh89KxJ8V3H7EIT3mfvyRQwggx5qx16KtrRkZ%2BU2CFTsbH8okjPxjzunsATOZ3pmzYO191Li3QcthoWQvmhAKFuvsVK1I9JPUA78qS8rh%2B05FhUQAFqjt4PQh2J%2FSvcITYZZlqNq72BVCq4fOuVMr0RUDXokvG1KKY6%2FSY24G4yLkXQ1d0HVf%2BHXRndBfb68K2MzRQ9a2ULkpN1qnA8bS7xTOfafGxWjyAAhmRAdrm8GZXg%2B7pwYYZjElDMrNnef0JHoea%2FVnvFhIJ9XrulMUQD74Hcb1tefZQl4WXA%2Bq083tzLsw36iKzwY6pgFH9vb0a%2FVEVo5vWUSrLmEpdLVScS1dE9JUaVR9ukZQjQfhDfRaXhCS%2BDy71WgH9SgIKhbqMibzoJru3uuPEXJ%2Fu4c8SN2X5MraCohUxHn7Sz6rFnHLiYU%2FlZmj8pBqGxrev5Hos4Y8kiBawvJn4vubVUQSc7Nd%2FcLjxS5nVAoBQjUiOOu6GG4C9qiKXwZbko%2Bx9BIJy9cXQGKGCz47nR%2FGwWNPgorM&X-Amz-Signature=0a07a31e6cc619a0781248138ab0abf05558189e66a7af13fbcda3ba577ec4b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFS7FHQT%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T212948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCJ1xkhNLTfEZC%2BTL0KFF6CIjXFhHSFGVfMkPFjV81NdQIhAOaiqu6Z87vJt1fwDEZcVX9rzD5e2%2BaSoSvzQX3zWhnnKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPbyscCROtj0bcmKcq3ANfyDdTeN%2Bw%2FgSgGCUKrYEWF9aupDmPMxy1P8qsIaX2dFP7%2Boj55Zul%2Fy0qGlXSqiQ0L2q1CPY0Fokgp781viTxxskQiAdhszICjh593uzHBoLjDB89aLAT6YVWjMD%2ByGAxYGQU1L8xQPWKwlC5jTI5i71WuI62P10ZSIaJJ%2FxTISsKPgNtjd7YIujbkR9bk68nv%2BMysqF1X%2BxJNXlgIIbPRXXeiHwsjeBi95OpKF5YjX%2FdZcy%2FrC4I3cU2vpkvQTFFyelu4hhYL2nJqLLPSJSI%2BZVON%2BkNPkOCoWvKM5gGZNf2KJRGDOinodvV61th%2B%2BShNDUJ2vADU6yH9PswUzyaIqKwZWYpVXOJkStXV4ePFuLzjKr8CazpEWrNDbewwoytlFuLQDBpRiZEZq6hil2KHXR2v%2Fgz5astDFilDBRm3KlBJ%2Bo3832%2FGT%2BAsWyGoRht2lVFVUwzs9FMqNZqtO49FNTeri40XlwyVY2JZoxHHxEpvtnk5t%2B6TUhOUg6pk9EI6a%2FEQFMJV7qgV7QxENWFqizskji3I7N%2BYsOUXqwgEFL63ZG1UY6lIOJu2QKrBTRHqIyIvhH%2FX1MXhf8kREkjXYE1zGvMKwyOiEac0X4NEIC9fo8MzGbmiiQKjzDHqYrPBjqkAXpcZbTGPB3FljXvPJ5CqlxIb06BhPZIyvYtzGwaNdeLrUDM2LosITbcBD81rOo4exfNf6Sf8wUrA%2FMEmJiiIWYe9wOUQ0mDttQr%2BZonc7UnINWvkRbUhZ6wbogLDPsIbw7%2BMsdrKy5lnorAmslQQj9WG4C7JvOtX949Nk%2FbOkWFQrT9U6MR3hb0hYOi42TAtyWAjfpWjqOjr9LK2L5qHDWMDxnt&X-Amz-Signature=d9ed644c35891ffec284d995f2eedaa410bc61c24a9b38b5f648f9e5ad7c7275&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

