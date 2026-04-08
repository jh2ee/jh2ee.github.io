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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OWKTE5M%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIBed4%2FPqRi6S3tgvP5Y1gd%2F%2BKsqFGoaXD5W5DGYL1H41AiEA10opqMsvv1I6%2FAM1sbS2POSuIJEJEePc5HW8gyslKmgq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOPuo77wc1FGh6lq%2BSrcA79BDVXM52UKYbmvbQS5JbTvR%2F9St3EBG8e%2Bf6Pb8x20ZobeYmFNRv1hXO2ZXYtJ8B0WJdYc%2BoEDejbYr6yrkub7FeWt2XnsnRaQd0puaqaNRz0haAi%2Bpke4n%2B1zVSERXfPuoX4%2FXWAOxOTrFVw%2ByxWzErzRB%2BxNWz1NRLqf0mCXTfPpH4nVNac5zzc4ZVx7G3bGQvnWv%2Fv8%2BVWh9ad8xM7AI8Q7%2F1T%2FAbiL4CxJmVAZTGdagJm5zGSvc6N6Ee5ChoOor5zhr7AQEk41brM6Jit1wTfu03SrMZ9QgZErPyMHVZCExhl4XzNFC40GI10OWMQIRLD2RdBpDNXuaC1WoxXipcmKcdoScXHH0xVcCe7jIZTrIhwtFqjKCPgu6D0Ek5JvvfpobITE%2FxJUNvWeYZqLQrFB88VwTjmMVnItABPpKvxUO26GhlmatnMzcoA6xkQkyr1dnI2ESw5lt1TUMh14kchZsuvLLH%2BdEiuXGGoLAL8yW9w3ZRe%2FCOx6lXH6FkyFevVSxXPq2c2NU6Vhpvz9bsk%2BAUw8OGyOWALGAqOv1UAlIhK84x%2F%2BGqzsvvQxN%2Bu%2F1JQR46YNh%2FlsvergIE1serMgydwhymyvejjwq72dqhxDIyZrB6bJOhhiMJmj284GOqUBtWHR2%2FrYICbDUkF7BwrT3Yr29kcKa9ttl6J5cM7kBFySJpdRSil%2BcUY%2Fdm9sfQj0l2Ofg1jGkcszEYqX%2FteXNqHSZDPp1fnqFR1%2FJPkuQqOghLjC83UgJIdk%2BHNA4SDRwOb5KutfeyrfAlROQntnt%2BEpgbKJDuBx%2F63tGxlGEvYd%2BZn2groFiS8NFV%2FaIf7HSazdfg%2FQ1S0j2Q3CTJU%2FTXMCPm5J&X-Amz-Signature=004377aad134a5decf288ae216028fe2e23478c4d3af00a372e5a05cf5fe9f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OWKTE5M%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIBed4%2FPqRi6S3tgvP5Y1gd%2F%2BKsqFGoaXD5W5DGYL1H41AiEA10opqMsvv1I6%2FAM1sbS2POSuIJEJEePc5HW8gyslKmgq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOPuo77wc1FGh6lq%2BSrcA79BDVXM52UKYbmvbQS5JbTvR%2F9St3EBG8e%2Bf6Pb8x20ZobeYmFNRv1hXO2ZXYtJ8B0WJdYc%2BoEDejbYr6yrkub7FeWt2XnsnRaQd0puaqaNRz0haAi%2Bpke4n%2B1zVSERXfPuoX4%2FXWAOxOTrFVw%2ByxWzErzRB%2BxNWz1NRLqf0mCXTfPpH4nVNac5zzc4ZVx7G3bGQvnWv%2Fv8%2BVWh9ad8xM7AI8Q7%2F1T%2FAbiL4CxJmVAZTGdagJm5zGSvc6N6Ee5ChoOor5zhr7AQEk41brM6Jit1wTfu03SrMZ9QgZErPyMHVZCExhl4XzNFC40GI10OWMQIRLD2RdBpDNXuaC1WoxXipcmKcdoScXHH0xVcCe7jIZTrIhwtFqjKCPgu6D0Ek5JvvfpobITE%2FxJUNvWeYZqLQrFB88VwTjmMVnItABPpKvxUO26GhlmatnMzcoA6xkQkyr1dnI2ESw5lt1TUMh14kchZsuvLLH%2BdEiuXGGoLAL8yW9w3ZRe%2FCOx6lXH6FkyFevVSxXPq2c2NU6Vhpvz9bsk%2BAUw8OGyOWALGAqOv1UAlIhK84x%2F%2BGqzsvvQxN%2Bu%2F1JQR46YNh%2FlsvergIE1serMgydwhymyvejjwq72dqhxDIyZrB6bJOhhiMJmj284GOqUBtWHR2%2FrYICbDUkF7BwrT3Yr29kcKa9ttl6J5cM7kBFySJpdRSil%2BcUY%2Fdm9sfQj0l2Ofg1jGkcszEYqX%2FteXNqHSZDPp1fnqFR1%2FJPkuQqOghLjC83UgJIdk%2BHNA4SDRwOb5KutfeyrfAlROQntnt%2BEpgbKJDuBx%2F63tGxlGEvYd%2BZn2groFiS8NFV%2FaIf7HSazdfg%2FQ1S0j2Q3CTJU%2FTXMCPm5J&X-Amz-Signature=004377aad134a5decf288ae216028fe2e23478c4d3af00a372e5a05cf5fe9f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFBWST36%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCa79s32QfWckFcofHO9FAmbNpHe%2BO%2FE2VOVxScUlGteAIhAJuOIrDOqVw%2B60XI%2FayGE8EbW6qIkCc4UT2I%2BdwJ0L0AKv8DCAcQABoMNjM3NDIzMTgzODA1IgwldRKF0N9o2vHlvv8q3AOXeMSKYCcO7ngDEvXVPUaUohZEIk6Vd8BbfMmjRkvi88ntUoZnpihCqeH1r4zMJTdf9GsKAbzIxGLm8UJcFl5XZ706aMIJZOmBzLMZF62EMvuToByvC0b2jW0NcCPulsapYrNEJ8j9BSJz2rCHnlBgmmhYEcUfoDHkygxI14ndYvAIO3L9LxRtqbd7PAyKmraApQEq9kWze0b5Bl5%2BDsYTJbpAUiorspB04iA79hq1W6PfWcn7Q7iNzrAOY0zhcpXgOTtUYUDaAWAko%2BlfKVksKxeY4KXahMqKxrl953bWm0VTKofZu5SY0yOdmA1Ihe4kLQwSGx7bNpvhc4qLIi1u1hOrbMA5j4rnYbtDGT3tlo3%2Fn90LJPGMF8mpnQs1lrh%2BoY0c6QCzVm%2BKtBhGAhiWe4Ow%2BGizD5hOvfXGr5sABaKYzP8idPMMRK2lTivuocDzS%2B%2ByVFYZbFuBh6titnwP1jDwVCw%2Bb%2Fps1rvi1tdyketIGec6nFKyoKpUNgHwmFeHfzxrWXN7XiHkotRmzc%2F6sASacDJmhCsv%2BjAdZJdPUItT%2FRKdy%2FVzpLCRxK7R178XR6EfJhOqj8btMQZi1XABbQHBqpt%2Fnn0gFfAlLcfdApU16NHA2n9g7i9aADCWodvOBjqkAdKMAZaEDTclW492zhC6MP6kKWLLI92gfQwH6ieOYy%2FVJxBzKBC7hxqX3fxY6J6mWyHf20n5Lg4dYq8nOU9PqBzN2PF58B2K%2Byq7CRHXqaZjCiUEE1kt7qEtzIHm0%2BzaWLS%2FvCFzTI%2BMRFvtsM3arc7o0UvcABboTxo%2FjB%2BhwWEJMPvvicokV9l2o6%2BjW3LgwYmARAo3GdGlMbRmZ0wR3oksqMHc&X-Amz-Signature=935fb5e28b11c39deca70598b0e131b6cec71a0ef271a2521cf04d091f333750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLW3HE35%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGA%2BHxgI440ghWZz4bewe7NDiVypeQTB39FBH28JLWY0AiBh727lUcp6C1%2BTLl3chCkXhY4kY%2BSeq41lutl%2BBinbdSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMLdcRbPohQo%2BiAAHGKtwDMZphX%2BlbVyZDwwxDLZlAIO2B%2B4J1m3rJItwI%2Fv3Ue7t%2BN%2FQC9jPweHxT82xQqiF15zZZLiQ79HtOcOx9jU8MKE%2BlNK9l8Cl2dry3N4Z2fXtdJ4ZkKFzpW78BeETQSJ3jCCS2OaAGqClOnkdrmTCG0ZlCRDIe2Q0Mc5klk8ehpKGT2UhzYsNkQI00Nuj1MaUq%2BUsCQG%2BmKNJRLDghxICJLhZVSultQsMWqepGcfKmc8dGcFnenEgkbEDtSGmvYX%2BQsQvw9GhNu4EimlVoRpfo8kFEEp8pB5b40DJdabff1WN9Q7gU5%2B08z%2Frw3P93dMch2ZzjL%2FEeqLnKnu44pMIG627on0s78XA%2BiefkKVCk3RmlO1bxn0I6WRAOmUm1JnNJJKsHLOwqH585iwGCbz0809TE24lubEM2CN%2FKn3hkNal4poUJiP%2FIyl7qdpB16jFNEe6Q32pT1jCblr%2FXZjNyUY0XlCEZxzjYyCkW3IIfOwXDRPRPhrXvm5JjNfNVEW3tf4rcQL6k28s1Mxympkn67vGfqtbaMDTTgk%2BX1HA81Xc9f0FUqe4sp71IWW8Fr0SMMb4olKy1FpqSIRinCAk1BCxTDFhkhY43biax20dKSjt5BMRazs3FIXHLTVAwgaHbzgY6pgEjZhUFYG8FVXkZpFEutRQuLzZ8SybzjBJig%2FMU0WpuByj%2BOTOwWh%2FlCsy3oae0ScRqt0DY5rpmpUp3tBpeXWeXPwpqN2yaw3Ywzu%2BBRAWTPgcS2undB02mNeT2%2BQzPlsWYAaVWAmygUO2tOGOvtX955Ics8CEL4fyMTy8%2Fy%2Flo%2Fmo9GE1D%2FV9o116TEFKNCfCWHBx5XXPU1fl96TWW1dLv%2FmEfSNZR&X-Amz-Signature=9468558660c3de0b3667fba32f285431b30a2362fcc5a8a43dbdf91b8f191d31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLW3HE35%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGA%2BHxgI440ghWZz4bewe7NDiVypeQTB39FBH28JLWY0AiBh727lUcp6C1%2BTLl3chCkXhY4kY%2BSeq41lutl%2BBinbdSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMLdcRbPohQo%2BiAAHGKtwDMZphX%2BlbVyZDwwxDLZlAIO2B%2B4J1m3rJItwI%2Fv3Ue7t%2BN%2FQC9jPweHxT82xQqiF15zZZLiQ79HtOcOx9jU8MKE%2BlNK9l8Cl2dry3N4Z2fXtdJ4ZkKFzpW78BeETQSJ3jCCS2OaAGqClOnkdrmTCG0ZlCRDIe2Q0Mc5klk8ehpKGT2UhzYsNkQI00Nuj1MaUq%2BUsCQG%2BmKNJRLDghxICJLhZVSultQsMWqepGcfKmc8dGcFnenEgkbEDtSGmvYX%2BQsQvw9GhNu4EimlVoRpfo8kFEEp8pB5b40DJdabff1WN9Q7gU5%2B08z%2Frw3P93dMch2ZzjL%2FEeqLnKnu44pMIG627on0s78XA%2BiefkKVCk3RmlO1bxn0I6WRAOmUm1JnNJJKsHLOwqH585iwGCbz0809TE24lubEM2CN%2FKn3hkNal4poUJiP%2FIyl7qdpB16jFNEe6Q32pT1jCblr%2FXZjNyUY0XlCEZxzjYyCkW3IIfOwXDRPRPhrXvm5JjNfNVEW3tf4rcQL6k28s1Mxympkn67vGfqtbaMDTTgk%2BX1HA81Xc9f0FUqe4sp71IWW8Fr0SMMb4olKy1FpqSIRinCAk1BCxTDFhkhY43biax20dKSjt5BMRazs3FIXHLTVAwgaHbzgY6pgEjZhUFYG8FVXkZpFEutRQuLzZ8SybzjBJig%2FMU0WpuByj%2BOTOwWh%2FlCsy3oae0ScRqt0DY5rpmpUp3tBpeXWeXPwpqN2yaw3Ywzu%2BBRAWTPgcS2undB02mNeT2%2BQzPlsWYAaVWAmygUO2tOGOvtX955Ics8CEL4fyMTy8%2Fy%2Flo%2Fmo9GE1D%2FV9o116TEFKNCfCWHBx5XXPU1fl96TWW1dLv%2FmEfSNZR&X-Amz-Signature=42432c792da25e114de871cc3ae495e083021f4ecdeeb838fffafd5874ec920b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653BR27CB%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIBuwj8hkEcfB4mSkwq%2FYtotex%2B9QACf9YG6T345FBFpeAiAKRUJ%2BirW2s4Zg5p71bMuRFHN7QAe6XEs7jGUj%2F7mapCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMxkYjfVDa4k7aBX26KtwDrXQowQlK4jrbqpSgsuuJkscYKb7eYg6kCpp%2F%2BlXSP%2BHKbgyUyRjZ7kVOb570aH8PvVf2IeS4bQDLUliAGh4b3RS%2Bwis%2BF1ZNb9rWyPTum366MDdjLQYpvujiR2IpHtYhP9l%2FbB2EqiTXJvHqOmC%2BftY55K%2BdhglzZYdTQdc%2FENUVKw6ltc843YwAmb29bzLcJvremu3xBp%2BvhjNgFdPe9cza15xMJYCvNPzppkJswAVCL3nAYXy2ylYLaRW5akUNjP4oLoSs%2BTxidFz59nGjWJhV1wZf%2FfL6yLbCJ%2BsGYcEDy%2Fj8u0at8aWkrmgZ9sTolUqyPN%2BYv0pUTjY5MKpq9TXZ5al3t0miPAvQ9S3z7O5IcL3GQAPvofMaWnfJaaXEUCl2xN90cd5xXwq7JMZUyMJNifgvAUY1wTmP1Mf9wOxN4LPJzquyT39jR2YrrHuN8P%2Fbg9KaHSHu3PvnUjGZgn0DrnJT5VC1NHYeqiks0KlnwIBibNKGkQMQv8G201A80G%2FHpzAemwisuY%2BdorDS9ANtsUgLYK1XnBYg6YPen7FfGr1tyeGSYXryfqYkEhoh%2BeQUsPyYeW39mlzSGXzJ9AW7h9tP063kXa%2BRrL390T5Ar2NbzjTSA1VVMs4wm6PbzgY6pgHG57uTRMzVE5Id5OpjrU9whvRGjXztTcdeyrK6Tx%2BwiTRaq1zVzzn%2FuBy1iQ2qVqq3PxjFsb71Ub4Cr5yZvBmwMgX4J8bhoruLtsTzIw%2BlJkNUIRzwjCjUcdKz4X5jLFLQt9yUFHOxw9iIM6ez3hP5cmvaEpDU19B%2FA5C%2B1RqftzNxy4Y9EIqmtVg1RK0%2FChkloBQDMql8VWkmBRZhRKYf0MTc1PRC&X-Amz-Signature=5a29ca9af8e67132d4a1473f73aeceb488d8ebc1b14ed464a1ce2551352fc40b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KZC2JMH%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCID4nQS9uMcufkO8vWHI5KuYiVCRkyKTSs8JKZOuhykqhAiAp%2FLu%2Falt7N4oHLLES1mP1YTv3Lzd5HfEyPfHfbY%2B23yr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIME6AA%2Fo2SQXWRzkh1KtwDbGl10JieBiL1QN1L%2FRz6CWMAusZ8FV2JHM0syo5ax%2FO%2FI%2Bo6UWDVnYFp6KVaBpNjIZdW28t%2F0avsi2CKLYr9cICt4rn0vZhxo83c3WpwR5Kb5KhSYeJksqPGWMZeiVzbrSlhXVTvtO3EYjYbDRDNWFIc9tq3skOjbl2snjnKNCJtnEM1c2zvqJhGvgT06P6%2BNPdTTqdsa1%2FQ3SKHEpEQB6OAmt3gXp7LiR%2BvFYl4SjU98nuKEM5h58Mqkr1n0HSfpWjuKWorgEe%2F7RjXJsIdSFj5Z0Fibrjs6SXPWfEsGOZxqn8vXsjPVxebF9W9etThPtFYJ9QSH6ZMhw7chcon0rNp4lqr2xn8NN9uFGsRA0c4lCfxTMm4KSA3AVS2fJyWFK8022iM%2F4BLaMjlifXUQ80n5QrmrhuV2YhoiR2TziqvOlhN9x3v5pAuzkzZ4KsnNZLe8JkxIKiToXIZHCO44zIuAVj8VgU1VDx2e1lj%2B9Ao39IPW5sehAf0lzKDkDg%2FpDbUOG4DrAK3OG%2Bj8CxHKfjmmTCPChcm2v6EjgdT4qaTw2qdgH6y3eEM%2FexXKAxh6PxvFoPrjmJEPgpsvnqMyCLKyUXf7OD1gxp%2BEvD%2FIIQuNGQiueSCwDZKatswhKPbzgY6pgEI4rlYZig8i1ZzIK6nvVW91WnOZuML%2Fv0SVmcOXIWiXq61f8t9P7e2QUxPBiYdK%2BZR1fSumY0lAn08W6BOBqo%2Fk1b5m3vyXTM0eN%2BDxe6ngN%2BRGxr6uCWSqJ%2BdIToAw24nilZT99xyJlmeVdzCcqp8ZwjOh%2FYtH7dUl6ohs4kAq6ET7pRpTmHatqcvVrAsrHEL%2FsSafsC0Gbd0kolcyhrGfu4tsRaG&X-Amz-Signature=85c82c1eef8c40ec285c39cff65732eb58dd52062b34f1989e215ef8c74dace5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQDXJDXJ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQC9ZXnrbmTVWK08A8n1Y3wMKkC6LeGOyACxqH5SM2ObjQIhAI5WvJcdTEtLrP6buTpUrk4WWT0eUExkfrAa6XkAzpf2Kv8DCAcQABoMNjM3NDIzMTgzODA1IgxSCYd7ZVOVSId4OTMq3AM3viKjFreP1fuqdncWFJ9MCv2AyH83tVBvMlOyEtLYdDRrEFST4zO%2FOU91WTE3cAr5zB1nb6qO5GwMlT1ObBAEWg6d9Qs54x7ekJNt0O3uPAJVL0AMvaW40dku8LEAJcd6RUd54mdni7Ts%2BoX%2Bd9B4YOvmHJZL0%2BOWaw8yO2gEEUM%2FRbuVNNZ53MPy3uCP6RDCLcTsqp4yreVCJtLeFAKxDoLgLqSjcIZ19WmdsHU4WIfHqXamp6JlaWkpTpnHU4G7wltl%2FXxfEWfGXbh7auf6bPLrrYfsDo7UNLGhU4V8SU0KvWb6qOnYA5QwaVydkPuytvjvtKYGJKnNjrcCHTQJUQ%2Ba89sRHT8l5HLH%2FHymRIXToyFZVfozqBluIoPd9gYmL8g2ZAfkAlwqN3t1yB7V37v%2FIkSrk85Vlv9sFB77R2DXQq5pMRthJUh%2FtoL%2Fzqxf4XU7elwm7yNi3Hy6p0P0af%2BkDUXnIdcTzeHabK3EvDMJm24MKGobtvyhBhGzoobrQKu2jcbkBVy5kSWmXNF%2FZImd0WBnv736SIZ9M%2FPJGE8DGa%2Fuhq5ZZJmLWKbgm4POayO8Rp9cIlrhudYYx28g2lCASeImqoEF%2BMA%2FTNwmBtnqa6jBx6AAqdQrxDCmotvOBjqkAUkF8ldn9mZ3VOxivIdaFrDVZIKyHFhPO%2BPkYBaTT7yFJ03fflqdbQN3Vwydk0%2FNbZxfyEFo9Mqf%2BNK31eF0iF%2Fu%2BX77DLr2appVvBcK38OVd%2Bg2Et9dNCAf73ZHSSSzpNiAFGtPThu6pvEiyrO861G%2BeaKPns36OVykEL%2FyeG8ffJNfmZNAMIb40AhfBX5%2BNGS4jcelCMjDdvsl8r%2B0b1jyoWge&X-Amz-Signature=17c9bd2ab0d250fa4368ad6eac3486b16463c7f3f5481f81823ed4f9a4694dc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626JLLIJ3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCICCO6gpz5pqPu6KoxtoA2ACePrn21cbqGceVnLvV%2F9xJAiAfrcROOwHql2Ogm54FENpbq33prlodq9WtNeq7kDW7Air%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM5oFklYw%2BuIdTT3Z7KtwDnFishdlR5QlI2u0GoxVYx9nMqhyGWqVsDFi3SWFDwYA9MzVVqCc%2FOyrqPmaNMKkAszI7jHw807PW5P0EngNpsqmS3lTabbuvzmwQDJfqIPGkKyWKIeUeJ2nrb%2BXxc8vNoTJlPOV%2BwFcYRDvgwv2d5JSKM%2Flw07t7y3gaJ8O5GbQ8aLWdw9lNiCfFSR1mzCHtyNU4QJ%2BCLcCa0xZrGtDvyuCvkeqnTgI6G2Zwk6zUVvi3Qrigs1AF6LCRJD8xgAekAmypFoRRuAdupqICUYPgZhcPPvMv29siBl21PC0TX6Wv9uwRCCY%2BD1HLh2fsf9HIZC%2FMtHnsaEq2q824YOWEgpm0ZAZNSRTR402Uz8Fi%2FHySrb2Eb%2FB3sDT13cZtCPKGVrUyyUfUYV8EkBRFfo6OnTufEeGHTseqXx%2BitLqycFptAh3yM1D0Kk95b7UWFdNFgizMcuszI%2B4ja8BO4MKnnFtjdfYa72qRkQnxkIPyd8kWBhklKtAu5s87VSyY23Ed4IzCGCLt1i%2BcfFb%2B6Lh70ccRkvZCe%2B33bSNt6ttDWRLgDBT2ym%2F%2FEeRvIbgPtm%2FBQ%2F69HM9a8IHN3ZxH77eCFVCVK8gKiras6h5IfLrj1U9jz4%2FiHfRB%2BMtkT0owsaHbzgY6pgGAfjbE4iErCqn7JeL10AEEc2031kUJODyHaFiTRE5usBtNeDUbMcCoIf0cl5H7zAdZ1YOQa0FmJ3GocImzCwGJE3iffEts7LL7qoez0KFzbUd%2FU4SNUr2XaURti8eoY4evVjTFpSfNOp0NKvCeiIR1lEREU6wD8wanchcKasUHfAjecZNgbg5z%2B6bsbrLLP4ptpQxvd7kvgGiHcuVdM5MK0SQh9iTd&X-Amz-Signature=0e0cdc251ea3a21eca15d3f4f7d227b1107ed7b92a4980f9fe111394f126bb21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626JLLIJ3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCICCO6gpz5pqPu6KoxtoA2ACePrn21cbqGceVnLvV%2F9xJAiAfrcROOwHql2Ogm54FENpbq33prlodq9WtNeq7kDW7Air%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM5oFklYw%2BuIdTT3Z7KtwDnFishdlR5QlI2u0GoxVYx9nMqhyGWqVsDFi3SWFDwYA9MzVVqCc%2FOyrqPmaNMKkAszI7jHw807PW5P0EngNpsqmS3lTabbuvzmwQDJfqIPGkKyWKIeUeJ2nrb%2BXxc8vNoTJlPOV%2BwFcYRDvgwv2d5JSKM%2Flw07t7y3gaJ8O5GbQ8aLWdw9lNiCfFSR1mzCHtyNU4QJ%2BCLcCa0xZrGtDvyuCvkeqnTgI6G2Zwk6zUVvi3Qrigs1AF6LCRJD8xgAekAmypFoRRuAdupqICUYPgZhcPPvMv29siBl21PC0TX6Wv9uwRCCY%2BD1HLh2fsf9HIZC%2FMtHnsaEq2q824YOWEgpm0ZAZNSRTR402Uz8Fi%2FHySrb2Eb%2FB3sDT13cZtCPKGVrUyyUfUYV8EkBRFfo6OnTufEeGHTseqXx%2BitLqycFptAh3yM1D0Kk95b7UWFdNFgizMcuszI%2B4ja8BO4MKnnFtjdfYa72qRkQnxkIPyd8kWBhklKtAu5s87VSyY23Ed4IzCGCLt1i%2BcfFb%2B6Lh70ccRkvZCe%2B33bSNt6ttDWRLgDBT2ym%2F%2FEeRvIbgPtm%2FBQ%2F69HM9a8IHN3ZxH77eCFVCVK8gKiras6h5IfLrj1U9jz4%2FiHfRB%2BMtkT0owsaHbzgY6pgGAfjbE4iErCqn7JeL10AEEc2031kUJODyHaFiTRE5usBtNeDUbMcCoIf0cl5H7zAdZ1YOQa0FmJ3GocImzCwGJE3iffEts7LL7qoez0KFzbUd%2FU4SNUr2XaURti8eoY4evVjTFpSfNOp0NKvCeiIR1lEREU6wD8wanchcKasUHfAjecZNgbg5z%2B6bsbrLLP4ptpQxvd7kvgGiHcuVdM5MK0SQh9iTd&X-Amz-Signature=4852a394a8e0f706dfd03df82cb089ac9e53af3541639698d9bfb19e742ef7b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PKFJCEK%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHp7tuUhHy959W%2FzGSNEJN%2FSRfxHX7sJFCdPQYMZdbeRAiBT6R9TiJDIBhh4%2FgCMCzkdi%2BOeHACaK%2BmR24JAtHvwaSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMxJwdCD3dlZig5%2BoHKtwDUZj061A4A9OeQuGvEhjxnasCVhunLX2%2BYlU79Yjclq0B35TIIYCt8lF458ictZfDQPg1xOixVirrsNYoGHaJHoGS28FzAcNKSs4t4G1rLdfvPp4yhzQ4ltc3yepS6FBmF20NeUGNwdn9ghwP%2B5nfyKyGTrzDtgIyhoXiRGCfTnKnTHpLsG1phWJ8aq2koCh%2BySD%2FLVcYghq2QI73DVtM0BO9PVlGy%2BXNIHxcByCARK%2B%2FJha9Xmk2Lb0B95nCWl4jorPyfIoexynDzCk0qEzJbjEG6yfiDE6SgM65hUOS%2B0v85LvIQjHJiwAd0%2B1lq8fp2BEKnZFqM5OazrEfEXybtkWEb2gVZvXulekrI97cWtt2UvNOv%2BoNvX4PaZtzmKKNJ7Meqj2fFieSpMc%2FKo3LhtE10f9duqug0Saa6paaMi9CfbeWThk31EwMmZ873yqPPGfg7Qur4s0AqHnum8T8yP2NjHsVe%2BiAii9XdYuqA6Hp3kUWpxwdPMLFIwQmO7XiDdHJzdqB3CjNl4ktRBfiCQCGbAeIcJ3yFHvw9loWcWDVvbHrnyA%2Brgaq2KraeG3EiawJkVi2VKh9s%2BbgQI8UDiC4ENhpbijx00OwQ1QrWEbZ9GkQatsGz3luGr8w36HbzgY6pgEof5W49Njt0TOp6t3%2BhCDZVyRtxMYtz8AkbZpA5RuH7b%2BOlpFHxta%2BBuikbiB12uugZOF2oFQBYPl1ys7Jtc6n4h4MGQzzKmOlAsfJJDk6RVH0DNdGZFR3I5rMVrfhUY2sHKnIJZA4joXgOWut2Fi3ahjws6BLhmF6SBb19qNguphZ%2BrArKeD%2FiZKxguYoCgCr5fNA8GDCy6Vkrc86Z3OJ1k9RU25v&X-Amz-Signature=e5a05b5346f593561be9c8c5a22615263ab0ab2af3235294a86750ebcd8a050e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDXLCB7P%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIAXQDAq1Arzv8GVqnedWgb0zYyTt69XVSExTEGINaxAoAiAyNfb4S1JgMBhkHCwsPizYSd92VGb7yfw0wIRSpI6KwCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMCDahw%2F0rwPUeXGISKtwDAy4yA2qTNVuaCzxVMC0g%2BuRFH5oPdNUTXiMyu%2Beog7gT7c%2FxLMHWlE6G3B7dfjBQxyh9vd6KKkPKVH8clCKN94FwLzPBqWQj%2Bn2zs18m5vUboCGVbriOcnoeeKoWG5g6Bs73VnjdAAHumiU5zpxM38nWRkKuEmqIRFfuzcekZKNUwm7dyp9sHZiZot8dqMkW9sFmWywy8mqjkVaKc0rEO%2Fn7fzgKjj6zozB0gqexuD0zWAusVLLqohJ91d5bdtpINhf8rGB0KhcFVi28JKWEbwne0Rlmu%2FdxPpz1WtzR5fTwtd7R5pMexEgNdNL8CyauY%2F%2FEAY5E576wMcA596XQdwWIZ0UZcO51nd7nzuh2yGkdMF%2BPFNOhcPAgSTYSIqIX7Vji3RKudW%2F7LNeZVEdS9chWMLUfjcjbS9uOHZwqgijIZzGXbN9k%2BXn3c%2FJc2lfQIYxUa%2BnIGjveZIAc4aed%2Bi%2BM8c2FW%2FMgC5ktslRsWKyr%2FoMRX548QHgF1wPkDy8W%2FcKtY05HmG8oWt6tmQzmQogWK8mvDlsUs4I6J08fsY%2Bxob74VNP%2F9DaUnEz1skHrgIxvQULzv%2FQiaoDQdnPGgNd9pH0ktnQ4QvqBinvbwrdoi1AEn%2B21iAgW2EcwlaHbzgY6pgENLKK4v97u6hunPdSqC%2BTsZrU3OFajBOOqwC0POTCV%2FSGemxCDHyrLViJjVg%2BHkFPz1Q29gN7TsG39nH37iYiOdTg2Rdoz2NGTl5tD3r3tcAUAsBwUpDMO68%2ByYOpPYhVLrAfIgdSqcDhuukTWV3woYzYNWfmBThkGhob92h2j3dwZiocYB%2FqTtYA74KnPg4RRoWFlJxJk3%2BymKUYLxSctAPK%2FyCL6&X-Amz-Signature=05717c88e9e0b2142ab70d93b50b367709194f5ad18d11ecca860837c0067c89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDXLCB7P%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIAXQDAq1Arzv8GVqnedWgb0zYyTt69XVSExTEGINaxAoAiAyNfb4S1JgMBhkHCwsPizYSd92VGb7yfw0wIRSpI6KwCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMCDahw%2F0rwPUeXGISKtwDAy4yA2qTNVuaCzxVMC0g%2BuRFH5oPdNUTXiMyu%2Beog7gT7c%2FxLMHWlE6G3B7dfjBQxyh9vd6KKkPKVH8clCKN94FwLzPBqWQj%2Bn2zs18m5vUboCGVbriOcnoeeKoWG5g6Bs73VnjdAAHumiU5zpxM38nWRkKuEmqIRFfuzcekZKNUwm7dyp9sHZiZot8dqMkW9sFmWywy8mqjkVaKc0rEO%2Fn7fzgKjj6zozB0gqexuD0zWAusVLLqohJ91d5bdtpINhf8rGB0KhcFVi28JKWEbwne0Rlmu%2FdxPpz1WtzR5fTwtd7R5pMexEgNdNL8CyauY%2F%2FEAY5E576wMcA596XQdwWIZ0UZcO51nd7nzuh2yGkdMF%2BPFNOhcPAgSTYSIqIX7Vji3RKudW%2F7LNeZVEdS9chWMLUfjcjbS9uOHZwqgijIZzGXbN9k%2BXn3c%2FJc2lfQIYxUa%2BnIGjveZIAc4aed%2Bi%2BM8c2FW%2FMgC5ktslRsWKyr%2FoMRX548QHgF1wPkDy8W%2FcKtY05HmG8oWt6tmQzmQogWK8mvDlsUs4I6J08fsY%2Bxob74VNP%2F9DaUnEz1skHrgIxvQULzv%2FQiaoDQdnPGgNd9pH0ktnQ4QvqBinvbwrdoi1AEn%2B21iAgW2EcwlaHbzgY6pgENLKK4v97u6hunPdSqC%2BTsZrU3OFajBOOqwC0POTCV%2FSGemxCDHyrLViJjVg%2BHkFPz1Q29gN7TsG39nH37iYiOdTg2Rdoz2NGTl5tD3r3tcAUAsBwUpDMO68%2ByYOpPYhVLrAfIgdSqcDhuukTWV3woYzYNWfmBThkGhob92h2j3dwZiocYB%2FqTtYA74KnPg4RRoWFlJxJk3%2BymKUYLxSctAPK%2FyCL6&X-Amz-Signature=05717c88e9e0b2142ab70d93b50b367709194f5ad18d11ecca860837c0067c89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TU72GHE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T222644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCkfJwXjAZXt5PKsKGoc2ZfIHHVgJr5nXXV5x1AYuDe5QIhAJxN1Nk6UDp07s9dpEFgSZUn7Bl27%2BQnIHTOsiuelSXzKv8DCAcQABoMNjM3NDIzMTgzODA1Igy8J6qUrIuiEIc6JR8q3AMqEXSocR89OKSjUdQAxTsvr4oG1tUPZgNhJ1%2BNM74FWyYQx%2B3w1hhQy6VmPB8oPcjSnK23RNP2F5KUv6tNyYTnwgj4XmMnHl8LZ%2FajEr0drjuUO%2BNamTFvM4jHbLwq5zaNaIv6%2Bah95MsP88BTGsXAw%2F%2BdMUDlTKemMS%2FtV0D7erq%2F25K0IRPkQE570Q5p7lbP6wFxxoXiTvyvFrHW9FXjYskL4SS8TDHagV9I9kWbGx53YOaoDu4MibEwXkZ3LN9eC1If43nXqArV4peIp72QwBLOrAJam1dhBjzJwFL0xsEM%2FFOKl3PuCWNNExkrzrN3kb8hnAElgQTJM9YL9Ht4sfRiDG5h8qYGWIK1Sg9%2BTS%2F4HKa1divySkxu1mY0F43syRqnKKj0hSmG1AOmScblEHi04J7dlB%2FFKSFDYMssNTQHVBWlPR0X269U4NUr8cIIbjbilmhuLl%2FEP6d6R4t3hezi0qJIYULv4zhxzUJwnmhg4%2F%2F8itPtSBnMHiMtvRVhyZbXWI%2Bn7rJ1lsQ2%2BbPIE0r9BgcpZGPFPJoC75y3DyEYGER2bcGhfR%2BhNc5rz4zp117fBVej8bRyWlWVR1zcGSeFH%2BYGisI4FLTJWiUeE1y%2F9a9J1IMKlQOf1zDFodvOBjqkAQ7%2BPFXSSIRNPxlQKM4bX9oIzkdYGlIh%2FyrWGdOR3P8mXYQDi3Bb53k%2FBpJHD%2FgDjCtEVbf6FUxH9qk3OeUD3QFaBnnxO%2BDD3xezhrOU2fAwuftdoEAYpSRy00eKcegdABzKgzstBe6tSt508mSS2k5lVPYubq6cSVOXP6zjHwtg9p7hLoNY3pOMMdKTiShjPQVnDXaE3HlIPQBl1d3dOq2KlyUo&X-Amz-Signature=af8b12c5f717025b81260c12105249eeecee8758c9a1964874989c0412c26541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

