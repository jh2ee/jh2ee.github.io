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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667PFJ7HK%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRJf0Y761l4mYMHh%2BxNY1zv2WRXDG4CYYb0usTx65bjQIhAK%2Fz3oulUKPkxiDFM2jCFtn0OdnqnKrD2qEj6GDA7a89Kv8DCHMQABoMNjM3NDIzMTgzODA1IgyJNbEOoD%2BJvg2fdvQq3AMx4icawrkQubaarR2lSOuIZyTl%2FL4Rx9Xb2RjUtMvnE2DMFGoiayHQOiR518VefaZolRL58z%2BDvsNmTpQ5BNbN2j9pjPULzkWBUwPl2oQqnlIT4yLqtKjUvZywLNaDy6QYgU2FYFldof5ERC9tm6cMBKjXaZj51r5LSJ%2FWcTy4dKr6g7cd3o8HfCVAUKuM%2F0RuI%2Bpaa%2FiEpOhd9esfqlnT6vZ9cWI7N4pXEA9FfHEaAHzZ0Jtddo72KPewdpiYlI%2Bul44E748%2Bk88P9Y2EhSg7C%2FrnufUf5L2lxI6j6D9b14Sn01upULvf8mIBdJMMfXkd%2F6h0M0EIzBg59CyokBPLLReMvJZUPwf8OCKCv6mPdNnIosod96%2BWh14dEj9ZWOoUud1iLO%2Fxyq4DAZTCNuLmvc55cSXYg5oVZ%2B3P2moAG5qZ1WwFlrmlVa7KujwewnvTkKknpBmQNszxQVgJmnu6a%2FOR9%2FUbsqgpeOvki9rnc8OObxlkiQNkZyxpMFeWC3Pd0i%2FVzm%2F1nNy5GrSHJmPSIPUJFcGd%2Fs5A%2BzFBDsqOzjkZqLxZa9IOi1%2F3b19qFShRvTNcQfkaNvQJYizah48iw57OzCXagJIBp6tOadl0gCG39SV9Fy926JcB%2FjCwpenLBjqkAdO91rwxa4ogu3Y1VK9mDvfS6mmIhq7TGUdh9S1xEtQ9w83Gch0b34FjVhMtM2roCGTQnP5K6gJ8KtVXqh1s7TqafWqawmGyTHmHkqUYnJLs%2F5rsTqQgImKRl6NAOTQOmg%2Bxw0UVJGWVC1ZS15qxGx7vA4Uyb775L3oULijWyABy29h1uJ6L%2B6mCfUU5pUumMX8YBbz5EbSdtJT5FKajE1LwtnRU&X-Amz-Signature=243347f90671d90cd950326c3d16f190105235cb6ca017b36f89f08317ee5150&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667PFJ7HK%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRJf0Y761l4mYMHh%2BxNY1zv2WRXDG4CYYb0usTx65bjQIhAK%2Fz3oulUKPkxiDFM2jCFtn0OdnqnKrD2qEj6GDA7a89Kv8DCHMQABoMNjM3NDIzMTgzODA1IgyJNbEOoD%2BJvg2fdvQq3AMx4icawrkQubaarR2lSOuIZyTl%2FL4Rx9Xb2RjUtMvnE2DMFGoiayHQOiR518VefaZolRL58z%2BDvsNmTpQ5BNbN2j9pjPULzkWBUwPl2oQqnlIT4yLqtKjUvZywLNaDy6QYgU2FYFldof5ERC9tm6cMBKjXaZj51r5LSJ%2FWcTy4dKr6g7cd3o8HfCVAUKuM%2F0RuI%2Bpaa%2FiEpOhd9esfqlnT6vZ9cWI7N4pXEA9FfHEaAHzZ0Jtddo72KPewdpiYlI%2Bul44E748%2Bk88P9Y2EhSg7C%2FrnufUf5L2lxI6j6D9b14Sn01upULvf8mIBdJMMfXkd%2F6h0M0EIzBg59CyokBPLLReMvJZUPwf8OCKCv6mPdNnIosod96%2BWh14dEj9ZWOoUud1iLO%2Fxyq4DAZTCNuLmvc55cSXYg5oVZ%2B3P2moAG5qZ1WwFlrmlVa7KujwewnvTkKknpBmQNszxQVgJmnu6a%2FOR9%2FUbsqgpeOvki9rnc8OObxlkiQNkZyxpMFeWC3Pd0i%2FVzm%2F1nNy5GrSHJmPSIPUJFcGd%2Fs5A%2BzFBDsqOzjkZqLxZa9IOi1%2F3b19qFShRvTNcQfkaNvQJYizah48iw57OzCXagJIBp6tOadl0gCG39SV9Fy926JcB%2FjCwpenLBjqkAdO91rwxa4ogu3Y1VK9mDvfS6mmIhq7TGUdh9S1xEtQ9w83Gch0b34FjVhMtM2roCGTQnP5K6gJ8KtVXqh1s7TqafWqawmGyTHmHkqUYnJLs%2F5rsTqQgImKRl6NAOTQOmg%2Bxw0UVJGWVC1ZS15qxGx7vA4Uyb775L3oULijWyABy29h1uJ6L%2B6mCfUU5pUumMX8YBbz5EbSdtJT5FKajE1LwtnRU&X-Amz-Signature=243347f90671d90cd950326c3d16f190105235cb6ca017b36f89f08317ee5150&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQS6UZMO%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCueCq%2BNAAy8XHd4tNngEQOgngvBbR8Y3BFhPk6S6K5IgIgFHNBfTgnFXVpxPfzy5ULX6jZ5F7KN72Qu0YtJR77r0gq%2FwMIcxAAGgw2Mzc0MjMxODM4MDUiDDLjQhWuPeKlg3%2FKHSrcA9k11jQ1iUajfjftxwrwKQml%2F5NSp6iNoTV%2FBqpZoqJZ3ytjWHhLLS7b6vEpwJY8cO0I4bJfpwucBu6FqXlENnPZ2zRmRh44YMcD40xUr50MSGMsbpMtLNC0QAUBSGvXPDdkmvxXvd0Fq85aBVPUrJYujp%2B9LrDA2bDvIIdLMzJpXI6ZHl5e5bObTjgNVG9A%2B3UuwGXjhM8t0axkRc6wpF6cOTJXrCL%2Bi7NGVjkQrnOoLEvm9wxfDWaBH3QaNjaVuNP0Xsm15tovRupdhEbkRvM%2F0n5JJTRkcOQCz8heoGxF3%2BOoraguWHlD6jnrk4yJmyYb%2Fhw8atGTxcGKi%2FU0KONVEB7LSg0wCBz0aWk72VtSU7m%2BpAMkRWaZMtk8S2tWZDVW8uymWwEFsmwKfz%2BbDhHod%2F62buASRKxSXHGBWdjE3oPmO0JBlec3knMe%2BsW%2FnFywwvDNKWOiVLYoB%2B%2Bl3mHI36EIFZt9fApImZel09p1Geogv2g6YdQTyFDI3AUPcjFQd%2FTO8yfu745Jx6aKF%2BkabThMLPBE%2Fg4oz3l317Zf%2BMggqMK3bnHVZclR180qmFNqnO84msLw%2FOO7klBuRyPxNfv057bXQU0EJLccbdR0aFf1g18eGyNb6NZVMP6k6csGOqUBztQjfcyUyiZIDumSLNGcdTD3cAsR1Zr02mIDRGt2jVWjNTdVMbyjVI9scqnCRlFR%2BdJi%2FdPbEcqZRF%2BP1b9DwDUKNp0mC%2FrWOK0ZNA0UtIMAmeNhiTBfSTlg6mX54d2Zd5qBayRhGomWTCZfjXd3oXWADOWYrykKnSaoUWp4TdFDjiwWSeFQjCDiROyfTZUlYAhRKdNwOqA3pF7rV4eJSUqWi0Ed&X-Amz-Signature=6554728630a46eafe3a2b564f44b956265716bf63a57b092af7fa37f19978af7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLD4VVKK%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMLcATfGm1CJtKMkLJavouf%2BkOsum3wmM1gH63zLUCBgIgdnQ1VdD0XZS8Gvhm8d0phEv31rgSKa6c51VN8rAaQD8q%2FwMIcxAAGgw2Mzc0MjMxODM4MDUiDOAxac%2F%2FETRUM35lWircA%2FSyBt4Ichh4jGxBqCJfandOro7K84WzsWedUW9pG2SCXkvggt%2FcG9Y7JMdY2%2FdJYtn0f10hhAEWput4rlS49a9%2FZWOlHCagWSJRkJO8RI42GxQ7ofRkmbCgzrO%2FXOplvaGWxSHYP3ep7xvzaXkT6ccQnFFQgB687utx8VLbBJd%2B9yfgRXIVqM5rLoxQXNmMyCe0eSCMDqgRqV43jxyaar%2FBKH7kaAFRsjx8LjijG7vDUvIznzHGU0i4jnihFcnWYeFKgmFH0K6UAR8%2Fr%2Bc4Td4iWHOU9MB%2Fw964W6IGAMC%2FuLT3I6z%2FWe9iQBBVRaqZwe%2BFowHDdXMs8B5Vc%2B1chnpOBR04GOLu%2F%2BxzAMEjK61Uikx78mUh7R9zYMrVcaOTQQd5E88RIhYpXt9NiTvmS35JXleytXzJiJk6MfxKcBPQUZ2fXARxU5f6EA7wyG7bav3Bca22Ed4W7H5lk3C694McxZiIFRlyYDF38exVskrMI86kZF%2FkVbwRjaeQFpthpSHOk9YqBc0RyesGDsNyPWK0aXDppEM8y8tLHAQT7GIXzREkV9nb0B1yo3hjV%2Be5UwFe5IRsmzmmcX7Mxxrq2IE0b6AUF3PWMs4cgc%2Fk1QH%2Fq1%2BJgzzM7eMFIdP4MNOk6csGOqUBysSRborZ5RaktVGvVDwPb8W4RE%2BWrig7syza1RKvUEg0UgVAQ0lUSmsZXo62ccsK7DRwuUA6pYOcn1XT4tAqD7SbkPIBdWW00dGQiy8luITlbosQHw3hAy5IhyW3udyleVgSEFa%2F0s02%2BF7cA8pYdrhTQc0Oj3yNj7r6irqmRdSOaWwrg1b1zDT4hAT360MiNoRceDVcAS%2BCVNGL8xhHDoVrrlmd&X-Amz-Signature=75db8fca149795e053fd98b8d28c450ca52f7a99b6520e447eddb43c3f4efd6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLD4VVKK%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMLcATfGm1CJtKMkLJavouf%2BkOsum3wmM1gH63zLUCBgIgdnQ1VdD0XZS8Gvhm8d0phEv31rgSKa6c51VN8rAaQD8q%2FwMIcxAAGgw2Mzc0MjMxODM4MDUiDOAxac%2F%2FETRUM35lWircA%2FSyBt4Ichh4jGxBqCJfandOro7K84WzsWedUW9pG2SCXkvggt%2FcG9Y7JMdY2%2FdJYtn0f10hhAEWput4rlS49a9%2FZWOlHCagWSJRkJO8RI42GxQ7ofRkmbCgzrO%2FXOplvaGWxSHYP3ep7xvzaXkT6ccQnFFQgB687utx8VLbBJd%2B9yfgRXIVqM5rLoxQXNmMyCe0eSCMDqgRqV43jxyaar%2FBKH7kaAFRsjx8LjijG7vDUvIznzHGU0i4jnihFcnWYeFKgmFH0K6UAR8%2Fr%2Bc4Td4iWHOU9MB%2Fw964W6IGAMC%2FuLT3I6z%2FWe9iQBBVRaqZwe%2BFowHDdXMs8B5Vc%2B1chnpOBR04GOLu%2F%2BxzAMEjK61Uikx78mUh7R9zYMrVcaOTQQd5E88RIhYpXt9NiTvmS35JXleytXzJiJk6MfxKcBPQUZ2fXARxU5f6EA7wyG7bav3Bca22Ed4W7H5lk3C694McxZiIFRlyYDF38exVskrMI86kZF%2FkVbwRjaeQFpthpSHOk9YqBc0RyesGDsNyPWK0aXDppEM8y8tLHAQT7GIXzREkV9nb0B1yo3hjV%2Be5UwFe5IRsmzmmcX7Mxxrq2IE0b6AUF3PWMs4cgc%2Fk1QH%2Fq1%2BJgzzM7eMFIdP4MNOk6csGOqUBysSRborZ5RaktVGvVDwPb8W4RE%2BWrig7syza1RKvUEg0UgVAQ0lUSmsZXo62ccsK7DRwuUA6pYOcn1XT4tAqD7SbkPIBdWW00dGQiy8luITlbosQHw3hAy5IhyW3udyleVgSEFa%2F0s02%2BF7cA8pYdrhTQc0Oj3yNj7r6irqmRdSOaWwrg1b1zDT4hAT360MiNoRceDVcAS%2BCVNGL8xhHDoVrrlmd&X-Amz-Signature=30949588aaaf576bcf1e9b746fd4006ffaed7bc5f21033273faa620a5ca3af07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN7JWWNV%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWl11OKVa5E8EFbA6XIx3T%2FUMp5oR7ouCUGGxwiRo0vQIhAJLbLagzs8QNIw%2BiiWkYX9DslNEa6D%2BslkxTjJMMjEb4Kv8DCHMQABoMNjM3NDIzMTgzODA1IgyJDHMHNBzYh0obE8gq3AOw9gAMZzyX2KuaZdFJhxCR9j%2BSdHNCnGGmSgVLugWmS68k2l47tV9bVraLrUYdNijMUqnxbwH3U8zcMnhz04D49EpP1h0miKEz8Bfz6Zykd6eYyp1I9rQmmcrr%2B%2BTkdxGExCwUNtll1836Se7CweVmP5w29GGpVdAPePiV6oE9Wm0kbSJfk%2B96eR3X1uPOZ2JDOpZSws8LSVCSK4j1%2BAdUKRh08emYOAv202628qoW78U7Otmv3P8VoFK4vNkoJvyq46Fl1UiIwOPotADzXHC23oCYfdJ3FP0xLxV8bHAQwH5R9MFKp4Cs6DrZvzNXXMMxipMzf41YJZSOIvAuB3BavNsE2J6Ji%2FRjOZ%2FD%2FoRIwztYPCLsrIsNLgEffmc3mWNGB9ZJnsPtgtokMtjSS%2FFtiidFMcRODG2gv4zWjqtkVndEke1%2FFVbAYyTYXfR0A1IdgmDq5KQGVL2mqjN2%2Fal9bgBAxA1IXYaIVYCLnfrid%2FAkbmXYAqPo%2FuIiu2ynRRPKxH%2BAQFtrXoaBVvBf9Nczzj8C4dlKzu6k6Dwe%2BqQV2SNIjrHfCLdaZ8Phk49B%2Fo6wsPEb9VfAqeMWoPGchNOrQeOzk7kmMCfTHZbjJ0cUFdC1ygYyiIjjq5ryCjC9pOnLBjqkATB1Dh71k69pu4uVDAva4wisP1iEAZ9%2Bn8ls45lrRMDUV2ZZTEnafP7uRLifAsNzZG7s48F6oMGD2RMN8exumfUD%2Bsl3n06SeEYHN0EpPuSiYKZA9K9CSW0GJFShDHMMQAl4w5LIFARZnh0j1MdPOqtH0g4HfpE14sT%2Baq9x%2FduLMH3eeTQ5drOz1RUC%2FYE8%2BQ89%2BUJvXyKddl9Lgkuru2buY0BW&X-Amz-Signature=4d6b721369896e95904311ec72d464bc8ba7571c4130b647eff5fe54232dd89a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXCZPOQD%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5qVC9A4wRhIN7qVvhil4wjmgVcp3A7g7Z3Mb8wCtizAiBSN9ixSM4e2ClZi1VIkyscq4L70tdF%2F3AMOUiTLeJ8JCr%2FAwhzEAAaDDYzNzQyMzE4MzgwNSIMJ7hW7T02y4gekRWiKtwDBg6R3AchRvDt3JUrdJ7XAXDQmdsMOuy8R3XjX8QPNEH7hSWGXrIPbDKlz57VPZl8RcKgeofjZlhs4tHGwexGUw1gQa1dM9vqp%2BzF9saCOJBNRlf%2BOZNdw6wnhE7w%2BJhMeTTq6F2SPdfsPB09Mk%2Fx%2FH6s5NAgDI%2BhTmn9SoVkmzG2nO%2BxnnjeZVG21Y%2FGxpdtp30rzw%2Fg2n93cF0PGbCQJpwvxnYoOlH9KQOpG%2FqJuKyDkneS75QsW4qFehfljaajRoik4sucqSSTdgZisTIKjKBPnR9Ug5oDJ7vukgTlV0oic%2FSmUjteGz9HF2w9MH6e326S8btGRUrW7kCL1QZ%2Bq9VyIPsTIhCTu3%2BbE4g0IuRL08IOqLajX4rPiCHSCrvecSrF%2F6ZtG7QrluzMW0VDNDg5%2FfseCyzlVwG3zRMRRhriauKY%2Fbs8PwPT021BidScR%2B9NbORp%2FIrZFD8ZP0rI2cBxqvILgr0Px9sAEhYrJV5LRuW66md5tMj35j0LXXEt%2BCbaPqA2XUk7cVU1edrV43UPxT4QaDHNDzcb4DXNZmWSCnh5qOCGSmU7joHJ0STdlsagfW4aZG6YD37fOC3APq7olepVUNLbopdebBpVhRuZ5H3HDCpWzKDy6ogwoaXpywY6pgHwo42t1VLDxvPm%2BpNbe%2FGCJ%2B%2BjJ4Z%2BB19fixWt77d3OyIqAdTEEogoaV61XuyUAyh68i8kZ0T5iO6nnbAc278ryWi0Lh9%2F1m2arQm8tLn9OZG1%2Bl1gJdc6Yb7o3K97SQ8ox5z3asdzl4MA%2B79jtXRCAAEfnKtGMfg95FpPKiUd3D8VDPCJQV6T8%2BVrIrgE7ru7uHoYnntBxSN4wGy1tSvw4iGv9oL3&X-Amz-Signature=f8566e9b8cf3fc1ce38f842baddd76edda369b02085ce02b0c3216eeae38233d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDYMDIFN%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICs7VvKuZjcOjqv83ss5y%2BwqIw6RWqtU0O%2FgEBv%2BP4UpAiEA2HJcH10t88eQi65JyrcNRRBXRmd7IaPfsEUNRHIEo7Yq%2FwMIcxAAGgw2Mzc0MjMxODM4MDUiDFRLiDnB2NYv8RKRJCrcA2YSBdjXjkOCWe70XOjmBcPuCJZQjuAcHivoOI4zt%2BbzS8L3ftUteR07aOEUsP5j2winqV4FwRQS8FVt5jDXY7%2BtAd9qjr0G7e6U%2FKEiXisYHLd0ApdzUcf1ZobZSGZfg4q80lRqNwXCJ19IHEQbgTEE0KAGpfG2wPKMyKsExLxbdn8kluDBhfQvmb2si%2FyCpfIQCUQIt1eIlAZCUIxndo1GnOGR9yl0W%2FF3tR3uOiQro27trZuPGrdxRoVfgaiBz1xEI5Ivf%2Bi%2F%2Fl%2BvDr2Sp8TYNa72fvN4q9darM9%2FobV3VyTFa31IjMxdfrxJ%2FJQ1zg%2FdGckw4KRUJ85qx4o7b8h%2BfJ%2BEByCwLIlYxREZ7%2FqrcRpPBOZ39lw2RmhHXrmI18o5UnkmPZKnUA%2B8%2FfmU%2FWeVUxJN6gSxFfIKxlYNlXs521K6JJ3xAqMsoPT4UhqB6DHQ3gWQ2bV7s9ny5%2BFKbYu6FqTGsL1Ee58j3Gm0YC2hdeXXF9MnFOTI%2Bk62WhgLHeDRSb7RHLWca003Xq6uESaONebJqnCs4dC%2FaJVIcGHuv5PVoJAbiqfGpvP7rkMnIqM%2BbOZ0iCf68GwEzmONEztp%2BfNwGulAB0s%2FpAamDJmgfXDZmwSyrE4leZ7UML2l6csGOqUBq6xwbeWnZ%2BiVOa5I25uuZnVIerpFrbK38pR4%2F7o9NbJPVOU9zFXiSwYQF9H3dM3NyedPp4wj0bDUPNu5qLd2NwcF6e5U3WJovXZ1gK%2FABFz99KEYliCfaA5V6rZ5zNBA051KbnF6Cybg1XKLvsOwtqgQwXdKd6Tt8rl8PGhgIoFrezxQuuQGm4dwBT01vRmPgiCrbW1YnvHQB8MKhxzHu3wbBZhs&X-Amz-Signature=4c896c539c4652d6bbeb792cf7035e6d9982a55740629f72c71ea2c2e82e3ef5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNZSXEPL%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNkwtXWvZW%2Bc%2BTDYP9XOt%2Bx7X2raeem3TlNMeZYabWkgIhAPlgT1qMGoaGefILZH0TshTDGgDuM28Y4fhuiXgMaEgaKv8DCHMQABoMNjM3NDIzMTgzODA1IgypSrHB5TQMSWDskTkq3APk%2BdPVi20lHBccCXYtjsgX8toI2TeVcGsNvulxwaRYvIHU7k%2F%2F2mx3dnkEgiC5oF2hAF9M8aN%2BgK8Hs5w85DHX9ywunCcfIB5%2BgYtIGk%2B0rr%2BMXQkif%2FnO0ydZQsu58NefiBH9%2BQWjbwDUbctfT6bC61QW1PGMGUHzUz9mzFyYLyVcE5ZQpjjfjwAap%2FPTPj1Khx7d5uwQBbhHdKW047UGm5kE9aEtlYl%2FBaFxAa5MjL74bYPkWVIuk%2B91VyNY1x3QBfS5Ps%2FiBq6KE58k%2BhsgO9F0ipF%2BxRNomIhvW511omf%2F%2BDpdPj3J%2FLVeMFx%2Bk3kspdwYAF5WE7sf%2BYG5AC25f2qPB%2Bl0pKvDw%2BMhLnsaNbwX95wGwsjRNbnhVMYm%2B7TGZFKdoNf9elDr37ZNWA8eOSnRAFUSAqT90415cTbNyRGw97ZfiXBo4ZNlC6M6s10DvBcyZZ2Kvb%2FFEOIal3KaqgHt9ENhSuyGHP4B18R91qEquIredVJDMSZT3%2F2UWW%2FYjWTYAItP3Q%2BsjITv%2F6uVxQxKY4Fe%2FBqmCRvXEDoDXuBBTXUpeGINZOjEyBIEEkME4E5svwskKD20l%2BiQuPsGc517tkP7QPkzU3Pe6F9RBp5BrtEQgueE%2FcyL3DCRpenLBjqkAa0r1mxd%2BG6IKV6s9DvZM3RU3qU6Zapf2E0Cv6jQpM0tMvbn2SKdplbDYZpemjNnzzqJ7nxF5TtqfcFrke2I8vpMx0OOhGtdywvEAhLjCnUfGG6WpLrC3f71K9vhXptEewAbRq8dtyEg6b5LZVSAJKf5d80bUhdo927cvukIbigNuuPofbnQzhoRvUMrYwB%2F%2F78AHN8J%2FV7wzwoaDOI8i4Yc8tkL&X-Amz-Signature=0d67c7470f7641ed68523a953f7a6d019e185e369a960e837df43b592bade135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNZSXEPL%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNkwtXWvZW%2Bc%2BTDYP9XOt%2Bx7X2raeem3TlNMeZYabWkgIhAPlgT1qMGoaGefILZH0TshTDGgDuM28Y4fhuiXgMaEgaKv8DCHMQABoMNjM3NDIzMTgzODA1IgypSrHB5TQMSWDskTkq3APk%2BdPVi20lHBccCXYtjsgX8toI2TeVcGsNvulxwaRYvIHU7k%2F%2F2mx3dnkEgiC5oF2hAF9M8aN%2BgK8Hs5w85DHX9ywunCcfIB5%2BgYtIGk%2B0rr%2BMXQkif%2FnO0ydZQsu58NefiBH9%2BQWjbwDUbctfT6bC61QW1PGMGUHzUz9mzFyYLyVcE5ZQpjjfjwAap%2FPTPj1Khx7d5uwQBbhHdKW047UGm5kE9aEtlYl%2FBaFxAa5MjL74bYPkWVIuk%2B91VyNY1x3QBfS5Ps%2FiBq6KE58k%2BhsgO9F0ipF%2BxRNomIhvW511omf%2F%2BDpdPj3J%2FLVeMFx%2Bk3kspdwYAF5WE7sf%2BYG5AC25f2qPB%2Bl0pKvDw%2BMhLnsaNbwX95wGwsjRNbnhVMYm%2B7TGZFKdoNf9elDr37ZNWA8eOSnRAFUSAqT90415cTbNyRGw97ZfiXBo4ZNlC6M6s10DvBcyZZ2Kvb%2FFEOIal3KaqgHt9ENhSuyGHP4B18R91qEquIredVJDMSZT3%2F2UWW%2FYjWTYAItP3Q%2BsjITv%2F6uVxQxKY4Fe%2FBqmCRvXEDoDXuBBTXUpeGINZOjEyBIEEkME4E5svwskKD20l%2BiQuPsGc517tkP7QPkzU3Pe6F9RBp5BrtEQgueE%2FcyL3DCRpenLBjqkAa0r1mxd%2BG6IKV6s9DvZM3RU3qU6Zapf2E0Cv6jQpM0tMvbn2SKdplbDYZpemjNnzzqJ7nxF5TtqfcFrke2I8vpMx0OOhGtdywvEAhLjCnUfGG6WpLrC3f71K9vhXptEewAbRq8dtyEg6b5LZVSAJKf5d80bUhdo927cvukIbigNuuPofbnQzhoRvUMrYwB%2F%2F78AHN8J%2FV7wzwoaDOI8i4Yc8tkL&X-Amz-Signature=e748e5c9715783f4e127a933ce52df2ca1f047050703322d68c877afd8733d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2FM3AWU%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE9wjOcKzm25dTixW23eeSEad8Uuv0gFYXSoE1xTu6p%2BAiBoPPQQBvqEN0rCYtgh166gyu%2BC0a74H4yLLvTGJeLjGCr%2FAwhzEAAaDDYzNzQyMzE4MzgwNSIMIbB%2BzzKjKKEnUSrrKtwDpDUUJj8nhBnjTzCSV6FG63axhPWV4DYzGn2vaVYLdLtJ39Pn9Beac1%2F1f5nhk1YKoSdLuCFXDuZ%2B1w7Off7wg4F9ub0BpldnHkNTjs0GVMCKRL5z5XarY4oSxUzQ8Bgf398RHtsFvKWielPX%2F1nkO6GpMNEao8yZBF5y7MvtGARvrAITSw6MnP62pCQZFSzx4pDfv97pMTQzbEXZZANKguMcxrHJvIAR29JGgdP2Igu5sgV%2BPZywtV%2BsdX39Yp2fg1LFL9h2APczk8e0%2FkdAAMq5ZhPPjwHc3an%2BRygPPzFjT5vz1EsCMTXxiRxJdTWS5N%2BzH1i9yUMGljXYeFUCTX1h%2B%2FL73Z4l0uSsIcuswR6p%2Bazndc9qY2UDUPHiYGuvYVreLeVRFFM5nk9cgWPH7wTnOQpIzRiQPK6UGZpP7yz9xqTJZRM9U1T2qMGZeZWlMPB6kFzF1lzAaaP1GStMed67kerCN6S1RjNdwMYtC%2FywhMOX242lNs9D0Zh7yifkevMP%2FQGUpOF8UvnhZtg%2B7QUBTcExA76eCDIPRImyKKqPplqFqm0xJLIT1f5BL9VNlJscR4xW6K6UGwicYE0vzMbIYWXL92Qu%2F51hr8sE2aL4ta52EtaBNOineUYwyKTpywY6pgFNtyhC07YOlE5L3yBH8PiPLveVVQQK%2FWoGmxHC91g2oCh%2FM5874V6dQavbRsTm2YANNBp%2FH4i3nNpv1vyLUBaAxxG%2BNhmz6qxiCYjgbuRIsUt109i8jGk1xyi5vYb62XHSd05noN7CJsCeaJWw%2BFQxlE6qhrv3TCFtCUfQZUvuOqLwfuLYOLO7v2ddhdZuL%2BnjVLopkR5QB%2FBf8cF8PYDOCYarus4v&X-Amz-Signature=3440567ca93b20dcd031d2787eab523632dd7742d49a10a512b33c641925b5a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666G5TJXUP%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG00N%2BePVK9fxYukbAvw79ANiL9AVflFWWV3JSAtU9fPAiAoe67QV3%2FuOf%2Fr1nwDOsKb6%2FEGPxWW3AgQVwaPcFQOYyr%2FAwhzEAAaDDYzNzQyMzE4MzgwNSIMycgoAo1PpKNOqwCRKtwDcSPH6HupnycYIfJ%2BiqB5Itel2sV3yX8hvb0%2Bxe6apDov5f40DLkYzcUw0laP2yYSM9XXQcZYoY3t7tOlb4OOE7O47vMxY22n0GMR6WvmRjsXLE9zUNIQKE8qsSauGETzSmFjj3LEVjCedZHCb1FvavqYLAy2%2FdsYOYFOVgzkDEv5vwfnywIAUzcFX1wu8VnWLrN0RruPBZQeLaUxn7goi013lStBwoDbDyV7zqD%2FxLAM8VS43biNNWerTkBYfDiz%2FCbL5fqOg9ytBlwM1wD%2Fpe0LJTPLwAHxMCNMyFnBRWNKore9581HltmL6HnVvUSG2EZAFEbqWtIF6MFs2F3nMuOO%2FNKmUxbpc%2B322sS3pXP2CY0SwrM%2BFMTUC76Bg%2FfkfwVbmHLDHvQeRDIxhCEs3unRTntW4d38R7y5SV7q1ByXAZs8cR3%2FIskrYap6x%2BAGCI6ue%2B7gX8RRVl0xXL%2BsiSuAIhQ0eysHPeq2MBIRcFCXBvpFfEoQoNbKPCLNnypuBShW4zT789meD8igdUF%2F3JaqGnq7jkex5P9b%2Be5IHDsOXzXQmT4oCkOe8xUl6vAcThrstycb1I%2BFfy55bDsJdJ0qCRM%2BDH%2F%2FZYP1HMXeKD8fnSMXasvlxQTZ71sw96TpywY6pgF%2B7KsHocl8ehzQvxniFd5lIbRIA4GDZBEbhMqoI8q1cOhzCmPgsSMqDKA6qz%2FKYPnYSWarXUcZGCrEQnB%2F5z2LBZ8x5I0uGbMon14nfxY2EN6Xhr2%2BvI%2FHBVdKCDTizEld1pmMjpy2XvoTLRa1h16DjZK%2FIaHEGW%2B5QUDnAbZlbT791lGB6eqKe2xqZs24Mt8Mdk13U8jE8YldnVPCopewojkFVP3f&X-Amz-Signature=78f0c91db40fa09b6840c185931dcafed5bbbcfc95cc3a61fb3779e2882ec9ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666G5TJXUP%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG00N%2BePVK9fxYukbAvw79ANiL9AVflFWWV3JSAtU9fPAiAoe67QV3%2FuOf%2Fr1nwDOsKb6%2FEGPxWW3AgQVwaPcFQOYyr%2FAwhzEAAaDDYzNzQyMzE4MzgwNSIMycgoAo1PpKNOqwCRKtwDcSPH6HupnycYIfJ%2BiqB5Itel2sV3yX8hvb0%2Bxe6apDov5f40DLkYzcUw0laP2yYSM9XXQcZYoY3t7tOlb4OOE7O47vMxY22n0GMR6WvmRjsXLE9zUNIQKE8qsSauGETzSmFjj3LEVjCedZHCb1FvavqYLAy2%2FdsYOYFOVgzkDEv5vwfnywIAUzcFX1wu8VnWLrN0RruPBZQeLaUxn7goi013lStBwoDbDyV7zqD%2FxLAM8VS43biNNWerTkBYfDiz%2FCbL5fqOg9ytBlwM1wD%2Fpe0LJTPLwAHxMCNMyFnBRWNKore9581HltmL6HnVvUSG2EZAFEbqWtIF6MFs2F3nMuOO%2FNKmUxbpc%2B322sS3pXP2CY0SwrM%2BFMTUC76Bg%2FfkfwVbmHLDHvQeRDIxhCEs3unRTntW4d38R7y5SV7q1ByXAZs8cR3%2FIskrYap6x%2BAGCI6ue%2B7gX8RRVl0xXL%2BsiSuAIhQ0eysHPeq2MBIRcFCXBvpFfEoQoNbKPCLNnypuBShW4zT789meD8igdUF%2F3JaqGnq7jkex5P9b%2Be5IHDsOXzXQmT4oCkOe8xUl6vAcThrstycb1I%2BFfy55bDsJdJ0qCRM%2BDH%2F%2FZYP1HMXeKD8fnSMXasvlxQTZ71sw96TpywY6pgF%2B7KsHocl8ehzQvxniFd5lIbRIA4GDZBEbhMqoI8q1cOhzCmPgsSMqDKA6qz%2FKYPnYSWarXUcZGCrEQnB%2F5z2LBZ8x5I0uGbMon14nfxY2EN6Xhr2%2BvI%2FHBVdKCDTizEld1pmMjpy2XvoTLRa1h16DjZK%2FIaHEGW%2B5QUDnAbZlbT791lGB6eqKe2xqZs24Mt8Mdk13U8jE8YldnVPCopewojkFVP3f&X-Amz-Signature=78f0c91db40fa09b6840c185931dcafed5bbbcfc95cc3a61fb3779e2882ec9ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW4WY7LM%2F20260128%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260128T191646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBEyU7KkDlcE2TkcN8V3x42ns3YlfJjmWEe6FJP5%2B9J8AiAUYA%2BifSO7PNvp95h6S0u5b8w3hYCQ1UzJjPIWGkvIJyr%2FAwhzEAAaDDYzNzQyMzE4MzgwNSIM%2B02NFj2HOG5N2g1oKtwDIToiC7LeG6nToI4HOnWnljXPpGIRrOQ8UmsYesLjnWgALS19sXSROhQh2qOrVmF2LOIcPUIfazQQERbHLglbUou8PRmlslk%2FgoFHMOp5LXNEAPufTAwC6nxCas01N6f5cUKxXUj34T%2BS2hT2VLgyHY%2BBGOJne1KH9jLuvfnpm0roWZqW%2FyzJ5WJdpEHXrlrAppmRXR%2BSv3Xw2o2QAoRLWF5gJJK58psedAzdEkmeyB56l8OJ83kjSca6ePdbE3mmeWQZo9b3ZzWD%2Bb3EkmDh05fjSGhcU5y4NptyT1RRg%2FmuUlHUNO1Yf5pLe0inUO8SDZU1BpAafD2qu5w6utD6%2F%2BZvTKrTVLzXH2RP99hCfX8I4g4jn0ihabuhlMDaSiEQPIip%2FAs2JF%2BpVAw5UBmuAeUbC6%2B0ehb41wXRg8UBmxtxjirodo2CxamU3EHxkjmDVpAam8yEZt9jSWLu%2Bq2GS%2B9otXxPBDM4BBx2foBY3b87TeqN1seFJB0ybkLjBwL21K%2F8WXwI5Q9J3hmr2mUpzWzuIEgAAIugN2eHAdYhI5vuBonjSKuag4sZCaFtheqncJOP9MKsjMxzoFqVOqo4h7qHiwH6Hkba7%2BvxkrejKgXiJt2VoA2%2B86BFSogwzaTpywY6pgGQsY0b4Hvxl6TyjVPo1iiJPSBw4Kv1JFTY21q%2BZOG1diC7JhmzQpXzCGWYaPAR8ODwYXS1VEQcIdcyu8oc1cst4a0Pq3aUCgt385Pqwfo0hkIce7mMXgL8B9RcUNzFWgSBKFek8kkMVCeEzqxEgte881ZcES0ElNVQsM%2FfIXv1fe5qPNYFaf%2BiDn0PYNpFvStBeS5x%2FQ74OcA49ky9AKgBbVRNOWUC&X-Amz-Signature=25690c579bd7ad58e4596e5fd5f165958f6c8c00c3cd0165e436c95afef66903&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

