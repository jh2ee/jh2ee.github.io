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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YEEOYB3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIHlpFEQMlnegtw84v4osSepcLZGIn8m6Q3N3ekjrnxnIAiEAns16hgoaWgvtQrlmiz475t147nEEkTpsPQn6NqiGQBQq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDK%2Bcxy26g%2FEjBQm1WCrcAyoujFUA2HVKRhBG6Q3RrNNjRjMgfMM7qq0ghRZ7g6E%2F8WoGi9Wt9PkAF0lm94Cx9vlFtnLo0YTP8m%2FWcDaN8rrb0ol%2BxbCUdJooWPki2AskOSj85rEAGwiPgYu14VQIq4ojrVcbyiqLHy6XW4EwoLtzSnlMxtNGdG89lQLhhJZoFdlVx0xVdBrZs5yGh1EZP0VtG8H7NAKyuzqjuW06NEb3wUSbigVDooyKATCW6s9ML4r17UIef%2FjQJgEvQHywKy1R7i2tmrjfXZrZ%2FPKNMcyUT0SqwO9LmkGiS4NgpgImOjdPtwPVREF%2B%2F7Ecc34e7rt2Axr69B3Hx3fuGxw5eXDP7otBQv5J%2BxiltjanmaEyf5Hs2AIhzDYdLYdwL1NQP0H3KjWGonf0XMXwifeER%2Fc7wy%2FI%2Bv2n2lFV%2F6c915qyKmScmB3cH%2FchC3kF16phhB%2Bw36adHiUrHCsxs8vxVD0iKy%2Bgn%2FHfW7kc8PkfZ8ftFBqZRn4isWca4j5lHFdmH%2BFqpKoO2hOtPQaQZZFl95k06%2BxS0XFCKtEgz1py3l4ZdEUZYdTWYXbD%2F9%2Fqk%2FV9hHanspJy8eWwovQ4yh0bsVfZ%2FET6jl7NrK4alTGabqxOnfUvuEGu2AtnoqimMPGI7s0GOqUBh00CznTk5A2zkdEDVmyRdIGn3zC5p%2B8MIYdh9cYNfQmYzFnesb2DCwrl%2B6syWu1HfIldsIjf5gz0NQQD3S2o4pKNprh%2F%2BmBNfnAXmyKzhI3YwRDVsijH3zdatEJlvXbCa1J7da2AqP%2FRvHrlgo7HI02l1sIQXzWACe7hehA1I%2FkmSG0Auxhz7iTz0%2F64JBmNBKlKoJwTpbAiit%2FRtpa8oyt4UUKr&X-Amz-Signature=b8f7a8a448f0652b5f2b8b4a56e48f1b773a7396cd780090db0953eca4196b2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YEEOYB3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIHlpFEQMlnegtw84v4osSepcLZGIn8m6Q3N3ekjrnxnIAiEAns16hgoaWgvtQrlmiz475t147nEEkTpsPQn6NqiGQBQq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDK%2Bcxy26g%2FEjBQm1WCrcAyoujFUA2HVKRhBG6Q3RrNNjRjMgfMM7qq0ghRZ7g6E%2F8WoGi9Wt9PkAF0lm94Cx9vlFtnLo0YTP8m%2FWcDaN8rrb0ol%2BxbCUdJooWPki2AskOSj85rEAGwiPgYu14VQIq4ojrVcbyiqLHy6XW4EwoLtzSnlMxtNGdG89lQLhhJZoFdlVx0xVdBrZs5yGh1EZP0VtG8H7NAKyuzqjuW06NEb3wUSbigVDooyKATCW6s9ML4r17UIef%2FjQJgEvQHywKy1R7i2tmrjfXZrZ%2FPKNMcyUT0SqwO9LmkGiS4NgpgImOjdPtwPVREF%2B%2F7Ecc34e7rt2Axr69B3Hx3fuGxw5eXDP7otBQv5J%2BxiltjanmaEyf5Hs2AIhzDYdLYdwL1NQP0H3KjWGonf0XMXwifeER%2Fc7wy%2FI%2Bv2n2lFV%2F6c915qyKmScmB3cH%2FchC3kF16phhB%2Bw36adHiUrHCsxs8vxVD0iKy%2Bgn%2FHfW7kc8PkfZ8ftFBqZRn4isWca4j5lHFdmH%2BFqpKoO2hOtPQaQZZFl95k06%2BxS0XFCKtEgz1py3l4ZdEUZYdTWYXbD%2F9%2Fqk%2FV9hHanspJy8eWwovQ4yh0bsVfZ%2FET6jl7NrK4alTGabqxOnfUvuEGu2AtnoqimMPGI7s0GOqUBh00CznTk5A2zkdEDVmyRdIGn3zC5p%2B8MIYdh9cYNfQmYzFnesb2DCwrl%2B6syWu1HfIldsIjf5gz0NQQD3S2o4pKNprh%2F%2BmBNfnAXmyKzhI3YwRDVsijH3zdatEJlvXbCa1J7da2AqP%2FRvHrlgo7HI02l1sIQXzWACe7hehA1I%2FkmSG0Auxhz7iTz0%2F64JBmNBKlKoJwTpbAiit%2FRtpa8oyt4UUKr&X-Amz-Signature=b8f7a8a448f0652b5f2b8b4a56e48f1b773a7396cd780090db0953eca4196b2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URMS23BH%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC2jFrgiDiSjLoEpV2h18xV%2FVD%2Bp2BysfjJ%2F5BcOXRd8QIgBErjvEctjmCnq60BOxJ54Il2ZB8kflA%2B0eMwo4P6sRQq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDPrAenns0KePIDCtUyrcA8rTVmYeI6gkOp1nuLSd6tkfeue2Y9u9HPhris3UDa6QX0IXddRH5RzmLDnBDYaiuGsvtkEsn9CHegCIu%2FHLCrZDb1Ie9qVNlwYP29qTuJBRisqsEE1t7plveLfPb2vwSilq0WZJknxUxwoCJDRl8EVlPnesDZhxuZRRu3aJQe%2F%2B3%2B9o8mkK9nBH9lF1F3ublg27R13tWIkVE3Jl8IIrEhlvCHp2SNCUeooRIBbBWwdZptI97ZjARc%2FtNQN4%2BhqrGw%2FHwTFkpbOtRRcqoiKV21YjXQRi6FHH0eliSFto9SXXdMAeZz%2F6CFGw326uk%2Bff4iHETJ3E%2BiKHD9YTHlbVGfafy9gi38dvuGRHUBEkHOT0qX%2FW8lO0fTQSycyqv75VXuhTbfltQeb3tbnkDx1QsKGlhlx1hbBEXg0TgNhbwms5MJvoENof1GpOpozEfBecgcataMT87di%2FrfQkuwfvdAOYgaAKD978Xay788n8%2FPBcVUkmFPCLt8I8ABm8Icrsp6Ufm%2FkUJeUcJHfLPbIyIpKxxnw%2FSXeXs9RGpRESkh0LFEfkP%2BxHSe7TEBoe7TEU7NrYdKIv9%2FploZvkZe94hE5yy1%2FCRV6MJS8aSXeEIbHB2ckWxR2%2BnIR5ImtOMOyI7s0GOqUBA4p9Z%2FlLRjmAgwZvWBe%2F%2BRyhFd3WDnB9VVwo6cgw%2FjET5F2eSnS6YfuKqHoGTwvyO2HWa%2FYAtr9bIAHu0GZA5McvTVcS8xNQDXMSvquLLZOar55facVnX23Ejn2M%2BldQ2DtPC%2BNZ%2FibIFLEcPeV9kvxazUML%2FOFlQ7KaLbpEleop7JX%2FR8dMTlJp4j%2BYBfFgT%2BNPpzdhS%2BzV6Ql6MIJOsJKNuyi4&X-Amz-Signature=b5d7131f213cf6c0662e2bec328d4a4e83dfbd52958cc875c1c09a8bcc6501a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCGDGZPR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCnDLkYOv6qGGJblD9mNxmMRJiqan9PkG3WB8qg9th1EAIhALJOj2SfB9NSWiMVmKxkjlK0arzHaTfEIsW2y%2BaxxnwXKv8DCBYQABoMNjM3NDIzMTgzODA1Igzp4Yev%2BNz2dslFHh4q3ANd5FsDqNjgHA%2BVjirKBDW4ZbMDtg89SwgBlI%2FMnhIqyZDPOoB1Zuo3wySjWBQ1KQjuTWphYPdn49lw8ZJ1BxOI3iCW033hfH%2FYonKOgeyz0vHAwffUUjJnjj0S0aHlkCIGQZoXIHxI7GwYXJLErQQpTVP7DECU2Hhzd2f9JRvfEn5%2FJiAYebi%2FysiNI%2Byximd4xwyPrqEbhRARw1ugUO%2FCDho1CG31mU%2Bb%2BtMtfeBk8Mfc6KyeY5cBA89C2ZimHlUHp1i2sym0aKV1WeyjIUoX0cy%2FPHoWrQlFXzRXqMkZ6NXk7dnIQOeABRsSj5Q%2Bj7CfWWbrGZpt3xO6i4lsqMLN9CrUv9E3ZEgQL%2FgEE3a63MNAi3LJxuMxkBX2yof2Hd5%2FlP%2B6YtrqryXlk4M%2Fb8KMLU5AgjHuheAr%2B6SE6rqv1qDf7lFCwRFJe1vUIQCGzr%2BQSlWvDkviLE%2BAfJ%2BzKGmxI593XWEy4ikJP5sOWCVCPkx2wIyR8ptzfqj9%2FrWbYKrm7hNuK8gkSRIr%2BFmqe%2FgvvA%2F%2FpeAdTB5JC6ros1vPDOHXmji%2BzlRKgnDrEzfOFU7L3HBWylRpGyItZQ0li5WlvXkTfPYtWlDVBgUBu1L8Lrb%2BY%2Fk2FiUfFWzBazC2ie7NBjqkATKE1hVGqn4g6PAVa0vCzwmtQnblMkEXs6g9K4RUMP%2Bl5BWNoQQLcC1DFIwnAPSo3c9FTwKj5cA0ajZCPlLYgBRmdERO%2FovVbT6PxRqczfZxCWiP88%2FFkI5EvgXFqo9tnn0e7hE6F1Qr5fIhVQG%2BEaryt6X9cGxG6vgFfMY1EVTrToN0lmXAFJXRRTdqAiqK5R%2FqIyBRoDYFvvSRIDTWPvIRuY2f&X-Amz-Signature=40c7fbb70b476c7a8304b983453d0c988903b6fbc9faed8543421e79c7a714a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCGDGZPR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCnDLkYOv6qGGJblD9mNxmMRJiqan9PkG3WB8qg9th1EAIhALJOj2SfB9NSWiMVmKxkjlK0arzHaTfEIsW2y%2BaxxnwXKv8DCBYQABoMNjM3NDIzMTgzODA1Igzp4Yev%2BNz2dslFHh4q3ANd5FsDqNjgHA%2BVjirKBDW4ZbMDtg89SwgBlI%2FMnhIqyZDPOoB1Zuo3wySjWBQ1KQjuTWphYPdn49lw8ZJ1BxOI3iCW033hfH%2FYonKOgeyz0vHAwffUUjJnjj0S0aHlkCIGQZoXIHxI7GwYXJLErQQpTVP7DECU2Hhzd2f9JRvfEn5%2FJiAYebi%2FysiNI%2Byximd4xwyPrqEbhRARw1ugUO%2FCDho1CG31mU%2Bb%2BtMtfeBk8Mfc6KyeY5cBA89C2ZimHlUHp1i2sym0aKV1WeyjIUoX0cy%2FPHoWrQlFXzRXqMkZ6NXk7dnIQOeABRsSj5Q%2Bj7CfWWbrGZpt3xO6i4lsqMLN9CrUv9E3ZEgQL%2FgEE3a63MNAi3LJxuMxkBX2yof2Hd5%2FlP%2B6YtrqryXlk4M%2Fb8KMLU5AgjHuheAr%2B6SE6rqv1qDf7lFCwRFJe1vUIQCGzr%2BQSlWvDkviLE%2BAfJ%2BzKGmxI593XWEy4ikJP5sOWCVCPkx2wIyR8ptzfqj9%2FrWbYKrm7hNuK8gkSRIr%2BFmqe%2FgvvA%2F%2FpeAdTB5JC6ros1vPDOHXmji%2BzlRKgnDrEzfOFU7L3HBWylRpGyItZQ0li5WlvXkTfPYtWlDVBgUBu1L8Lrb%2BY%2Fk2FiUfFWzBazC2ie7NBjqkATKE1hVGqn4g6PAVa0vCzwmtQnblMkEXs6g9K4RUMP%2Bl5BWNoQQLcC1DFIwnAPSo3c9FTwKj5cA0ajZCPlLYgBRmdERO%2FovVbT6PxRqczfZxCWiP88%2FFkI5EvgXFqo9tnn0e7hE6F1Qr5fIhVQG%2BEaryt6X9cGxG6vgFfMY1EVTrToN0lmXAFJXRRTdqAiqK5R%2FqIyBRoDYFvvSRIDTWPvIRuY2f&X-Amz-Signature=89cefa3aa407005cbd25b07df926c6f21b2fc7f4c6b6c944bd5b5f0cea1ecf9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSS7O4VE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCrdcTA3yJ2EFM1pediRdVwjyefe2uiW7HXgorYwqU4PgIgLr%2FOrEm%2FMphdPxOpsO6FTe8RRZsBkdQN8WsxhRQ9soIq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDAT1Xuyde2UXKho3ZyrcA2Hz9lzDvn50sGnt27rhlwfMcmKTX3slG2ayES4N1qUtyzKIdfbw2iCeVMEQUANeh3blWfFEmnz7s5aqH1RePBwwC1TMRm1eGwsVNjPMa4iQkytu%2Fb312sDSzncParlbH7gzY9%2B9w%2BW29VnxFyxA4OR3nDASeuMiugWlp%2BVZIVy5hBxA%2FYtSYOV5IFnEeR0Evf4%2FrTjpILCks8HDr4EOL0vO7Z9Vm6RjJkEw1cwsvy1D2PMi8d5C1zdSvPv2AIIixyW93POqKJ4m3uQfbk3Pv2tal5qL1Y6SajrvL0lejE4%2FIDT5yn%2FWNjMaNLHQ3t17LF0KuZUy90rggsXLd1US1F%2B5tRoUNleLh2CJgebRMkxLMEmwxu%2FDN30fsqsZmxbu3uGlkGCvRAiQ%2Fyl5MXgohxiRK0WJXooSbc2Avnk7E3uSqdeI42rDvHWmsP6U8MkBc9BWOy40XgjOw2dCrqCoY6NXJcmNeroRwdThRnRAnVHdu3FGIpcVvivCaYL1KdfkRg0BqevBepO68zMExGMmNX2IRwuPDvEx4%2FBtksJeVvmAmAPHffe8q24Mo95vTAuvuD6b1YNkBcTNHaZadIcr2OpuOTOg8N7wLDjWF%2FqNcRhmoAxuOeVB66%2Bo5PVcMN2H7s0GOqUBT7Ho6RHjQTsBk1NG7D6R2%2FsTLFo%2FHb2bt8U%2FBS3j7ehxXl5sU8J%2Bn9KX5gr7JpoKTPqMTVuvQ4aXVJm2fsiMmS6bY4C8O1CudyyO%2BcaMwrJIbXZAr4zUxFamhac%2BdT6Tvo32vZbO822EAAcOhcbJfUSqjla%2F2P0GFh%2B%2F3umEG0l%2FIRd3%2FskscSXkfpcn7DbhME0e2SF0Z%2BP0PjsbF5%2BOhitIlN%2Bt&X-Amz-Signature=df587439ce5d1f5a490426fa9fc67b41b11f46d43fd27491b797fdee13bab520&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3A7U2E6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCncY9tRuRVOCFmvXWklenObt7Lj2%2B72dv60jJNx6aUogIgIzx%2BHtPCi%2B%2BAbAOBzQExoui8BkKr8wNb62ML5t%2FgBKMq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDNJwY5r4FI1%2BnRLCoircA7lNwh7FAZG9X%2Bx72Kn2R95DNFgxH6%2FIWsgPCQVyEuM%2B8gOKWFbTbkhy5ic7NPxJD3H0QtdXbc8wNg%2FxwiZk4bNoN7E9PswbLwpTlP3peM5dWOE9vrrxFd51aPHeA5GeOeuJzXvcRvK15r5dSbmhSdcssMYAJpYgj7eTU%2BkWhOE6JE36QCLLsD0O3GGqhItjl%2FAE1jVx0162%2BMqXAjOEeSpD8gQQR4FHy%2FGUI6Cm5qgXmqAlZiuNuyWKaX4MsryjTdEoJbBuFF8s502uKpHXEwzz5nDSn6ZkOm5gmCMVugtoiMvPSzDy9IYd3w19XMZJDs%2BiTlMqx9R4%2F%2BxkYguKX5aT%2Fiac5LJSndRYGh1vSzbeDek02jtsNIiAzo%2FQFtn8oSeAsfn3b6cffJDZ8Xnooq0HnTT5q9AlR4Y7DQCovv5lXnRBUC0gqrl3Td8MheIT8DXEK1qARHBEfPFMODsz0lYu6%2FhJp87wUYi6fEknckIQUbOkhW7lGcpRAXUWDWx3CEkcHNovRbRlARgel4npOLewQnKXmCR8MApHYn8Mw9jG4Z%2FAM1tG%2BzlUr0bXw2rLNz8z61j8B1ivDLrF6s59ctR220akxc3jAkoGl8nvaSuzCh1gUlVnBOOP6dJYMJqI7s0GOqUB84ESeK3gpTGMbIVb35EmxbNxG6SpdvWNMSsdi0JFkb9YudVP0z4PXb0z%2FATDVaY3sJE6GlEwmnoThndp1MX%2BHDV%2FpJ%2By0iH8LnBPcsX%2F0O2%2BxtoORqPJZVQL16iNGOXawojEf8agO6%2BzqczQTYCzcfXYgRMqUkmAF3g%2B9Gi6vnJvGZUrhqsbabztSI4k0Oj4YQaDe7339wSRkXxPSCawrK0561c%2B&X-Amz-Signature=983632205a7615221737f2b08ddeec1f4069e06285911b2a1573ca25b3748245&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBGIR7DJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAQF3dtRP89Jmyh01Q0AlkXvuNdvFpARUf%2Fkp1TspAOhAiBXPzN9XBivJXxuhzy1RAGjzospwKsferjEKHLDL3JhHir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIM44h0%2FHfMXUAPlnzPKtwDUQo568HdODu8JMXCo9azRxA826pWGXA68vuvCUVExhBJ8D%2F4bPd6rmpw0tLYGeM%2FMDZ95EITXOqF2sHQ1HoaL0h4B9lqnkddSfHi%2FcvtCJqWJ2cAREaUziD%2FY4Zz0s2Z%2FKIG2gZJG%2Fix4cRaO%2BCM9%2B7GpM4M%2BiTAUBmRGp8xxuWdt7TJ1w2ygHtEsWCuWmDpVmZm5W5PcID%2Bf19%2FYq2U2SqacHJn0FIzJMeR7bfKpT1%2FRpX3lQL12NVm4RgQ%2FKKPX6TIP8NXHxv314r3w0Z7kQORt%2FMCCrs%2F0n9IH4HMbJZp9S6iNar0VtPXoyIEN5CeErWJAo045q%2Fo3J8XGtI5xbsPQ0699ETjCoFVyZsLumvABJGsK0TB4J0Ff99iBSTIypSr%2BLsOGP7BXUfdHUv9ejWIOmtNmC5quAwTpAxIGhos3hvnB%2BYWYxka9SwjLEF9GRRwBnYIOUZx6iyNbQg%2FwGqH8fdLD%2FtvI4q1SDILjdbaebkQ%2FcfBS2xFGfVm6z2mwCTNPSZhO0O%2B2m4eG4JfpFT%2FxF%2BVxxqIxnkDTOHEkV%2BwlwSZjWhXlOUBhxPVYEe9QONHgpB39nEatFdARelEpqgtC8NoBwoItcAOBJ8sYt%2BihUAbXlqoG48TirQw%2F4fuzQY6pgENVLLdfT8bl%2BD0aIh8pg4YNJ7e%2FagUqkdotuY0JEBtZ6LSwSTSPj6qaBLzUwGpYtpSsKW7R3LBF9E5HpRAlsBNNoNwD7HqWfaK2cWlznmcRRoCpvvTfXv4PqjlBrT3H8vU9dIp%2BlLH99EZDd8EsWTXWyByUKM%2Fwnlecc4mtE%2FVzJPwz2pjYGoj%2FbNVw1x%2FDdS623QzlyZjFu6ps5m%2BW1Cp4FH%2Flx6h&X-Amz-Signature=0beffcd4b2d0c696ff1967aca32575fa7c198893d37e0cc2c015f23b80882548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHPB3EMA%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIERqaHh0DYK5G0qDx9Jm%2FUlDXT4%2Bll7uMcmiFPLl8ZbRAiAWnw1j%2Bb%2BmFJjB9nAvWeBhGoJzCk0idvNAzuE28JQzbir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMd8pilLtlIng5A0ESKtwDuLd2qI01XF6DusPv4X3eFB5Dyq6uZN22qCY%2FJ7edLiD4%2B4cFuCsqLE55rXHrVfJlRWDvR8T90ZtuxEjo2CUhviKuuQqwAi1vfuiZssJfeHd5LJKLm%2F9u%2FajfR8jy1%2Bwv6XTTHF97Fi%2BRVVO9KJVEtdhEZPnWf8g9mlaB3R6HUSB9hqd%2FsxOGDgqRy51woGP8c%2Fe5cSQN8jPaDJKOvCWB5r9DtNAwlbGY7aJ1KuniFVNnZ6imET7pjLy1fTOFCPmitijIEHCYlxA8erfnZwfzaoljqfkX0hvtNgw3jTBHQ0qXPTGv1idAoXblcfjYQ9I8fCec5j0YMxmpFtnMGg6%2FKyu5FsJnX4NDTFUFgKaqJ1IZxJJ3RBJ5uyK3j3yRNYXkTcOpBtGZw0rh7ODiYuujKraxoHVPTH94%2BVHyNaH59GdCgk%2B5E%2BpkdnH9MOCDhxs2ppgPILFlH3cFzlCBiYICY31eXml26rl6usXhMF%2B4RTGB9INgtAMV7oZ%2BGu%2FxnpwIHL49LEPvaihPfzcJxkoNqrUmPaJP9zjYUMvLBJ2Jos7kXSUeGyUEwmBQtKLcQ7aQNL%2BXJeEK%2FS8KbFe3Y7nuKss4DCJZAXly25G8doutm0pbdAdn1n0r5JOo03ww8IjuzQY6pgGjTWCoOpYyBCRSk2dLDtP5w7Clk8IkZ%2FdlC3%2BuEAkXfjDNcjRfYjd9XydY9gyBTXGo4rNkZRwzKevbA5zt4i6HL%2FLqcPz0FxiiyxnZdiEL0w1v0K7BjNZBRZVrjOhd5MIxHferF1J5xYpKyjgolUkeYMNt1pG0XVDv5oF7vzFsjeb%2BGqeQltyF5uCUYGHr5%2BjYOnShdGIlv9Zi%2BzZ1Llchr2QEggiK&X-Amz-Signature=a2b104094a84d2d690ca5fd8d085977c7add953fa8915404ccfb95e34b4dc3d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHPB3EMA%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIERqaHh0DYK5G0qDx9Jm%2FUlDXT4%2Bll7uMcmiFPLl8ZbRAiAWnw1j%2Bb%2BmFJjB9nAvWeBhGoJzCk0idvNAzuE28JQzbir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMd8pilLtlIng5A0ESKtwDuLd2qI01XF6DusPv4X3eFB5Dyq6uZN22qCY%2FJ7edLiD4%2B4cFuCsqLE55rXHrVfJlRWDvR8T90ZtuxEjo2CUhviKuuQqwAi1vfuiZssJfeHd5LJKLm%2F9u%2FajfR8jy1%2Bwv6XTTHF97Fi%2BRVVO9KJVEtdhEZPnWf8g9mlaB3R6HUSB9hqd%2FsxOGDgqRy51woGP8c%2Fe5cSQN8jPaDJKOvCWB5r9DtNAwlbGY7aJ1KuniFVNnZ6imET7pjLy1fTOFCPmitijIEHCYlxA8erfnZwfzaoljqfkX0hvtNgw3jTBHQ0qXPTGv1idAoXblcfjYQ9I8fCec5j0YMxmpFtnMGg6%2FKyu5FsJnX4NDTFUFgKaqJ1IZxJJ3RBJ5uyK3j3yRNYXkTcOpBtGZw0rh7ODiYuujKraxoHVPTH94%2BVHyNaH59GdCgk%2B5E%2BpkdnH9MOCDhxs2ppgPILFlH3cFzlCBiYICY31eXml26rl6usXhMF%2B4RTGB9INgtAMV7oZ%2BGu%2FxnpwIHL49LEPvaihPfzcJxkoNqrUmPaJP9zjYUMvLBJ2Jos7kXSUeGyUEwmBQtKLcQ7aQNL%2BXJeEK%2FS8KbFe3Y7nuKss4DCJZAXly25G8doutm0pbdAdn1n0r5JOo03ww8IjuzQY6pgGjTWCoOpYyBCRSk2dLDtP5w7Clk8IkZ%2FdlC3%2BuEAkXfjDNcjRfYjd9XydY9gyBTXGo4rNkZRwzKevbA5zt4i6HL%2FLqcPz0FxiiyxnZdiEL0w1v0K7BjNZBRZVrjOhd5MIxHferF1J5xYpKyjgolUkeYMNt1pG0XVDv5oF7vzFsjeb%2BGqeQltyF5uCUYGHr5%2BjYOnShdGIlv9Zi%2BzZ1Llchr2QEggiK&X-Amz-Signature=2aa61a53ea5e5177e5d3b43e1b0e34244b417430c06d9cf161449fa073afe9f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ES2Z4PN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDkV0%2FFeCSGcuwCNyh4mwXGKssyPbYS5O5LzNmRVIzDMAIgDGH1EM9pj897y3Xs0pcesKGFMBfDJ00cXYBbyNvLASQq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDDKp8Vf5xONxjBP7TircA7Qqyh%2BWQx%2BC1Aw%2Bh3T%2BOvYYSLX4BMTZRYtFd%2BJSuwwfY1wvMdFEuBw0REmWjYE3DQVIw%2FEE90O7gd%2BM%2FVc0V2%2FFjkLmI7Y0ntx8CA%2BEBAdHbhfGSxOKvizQfw31z1PnYtjFe9oWrni%2By4ONQx88lbTTcDlKxIOy%2B%2BoomGzdCnAOSA2k364NcvfgnChn86nur9B6wBI3BvymZTOt6ijrPV17CQDbpHfCf9Tu43xsrEribmR2bKs1LhkmKrmhSbEvLgZK6VAYOkr1J4ixxHFChfEPXSEeVAv%2B0zcFG98w3%2FRRU5TZ5jv3SV%2FTbm9oMq1j4DDHEeQamCkeqSP%2FGPPUbWnTXD6ECTs9hiKZaumofDyAtxKkMb1fwbHHRGfQLQWWCI%2Fv0dexHP2tlR4fzXnIrCpJS4Ul%2Bofpf6FX9NvECMYErktutbaBQZRlQGPlYFX2Qdxb%2BlJYC2OiAdlm0DJeq7tVBfwjQRMjxZ7SdERCfZMx%2Bs29iopeu7SCN66TveZLdQ8sHB3mWgZTEAZ%2BGnksxDvGlMWu28HvYFVcQ46840LHh18Z1dAFM8CN4zcyORJzCKElq5t74WW6NeuXED3sq8rfkXHfueQrjABCep6sJTCV9XkVrBbuYteUdRi%2BMLaJ7s0GOqUB0aD6gSoyEk%2BB9wBLUalsFG1EXCwxh%2BvP3pLxoiN8r0DTMELPSnq9%2FmFtEiszKAGlyZxn6%2BxJ1syj%2B1cVhfuh7YYYdx%2FxoxcAixBdUUpWySXNms2j3Gu3rFsbKlPqwM5frCr1g04iVmQMzZ6FxOJnRb%2BmytL%2F4qfdCp%2FTaiAdOiUQ5pw8yib3tE2C7bivpFin0CnAYPDlaP3ytaOadXlNn5wVCKWl&X-Amz-Signature=b1175f3fdfcf8aa471631244c6bcb0ee5e1937301ad5d44fc928254573b1a14d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVYBNSRO%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC6QzvNamKqaRqne99gYGYEiQ4nst9spE0Okov3Wd63DgIgDDdRlZaF%2Bwejb2X%2FKonXaYY5SgY1Wy3uOZr9%2F5mpIh8q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDOMNs9PkJ39E10FmpSrcA8EeHJOSlR096HywkRzQMbiiUM9iQpWchXnTwh0NmhHkl8wIz3F27nhxjHEDtdzjdLoYjhtj9HdpA%2FXT67F9LZSSal%2BZZu0TK196xmsAxxOg9HA9FjHOoB%2FMeMonf4jTdvL8bTRz7e7l6VPGxNoPl3UfxtxkOyevQzJcqBURfYtolskq%2BK0igqPehRK4l1EaY8A9ayD4IYG1anQ%2Bm3nkJ1A0bLn%2FGsI2rgOFoozU22l3%2BcQ54KQcpLVFYm0%2BQ70FCjA%2B0nFws1co1Sdkkm09y8dIkp%2BTkUvphcnIvL3zboO%2FgeKjyNvIrWeFIKgmgSL%2BwNRocc4yG6xmz7GSO6B%2FydZcSXnbfOc6VFjz6pEY%2BjuOJEdUmyV5H9Nqy2Kc6d1OTfN75MRR2F7VuK3CHLB0mnaOemzanRi%2FAuhD179rEHlxw%2F3ZElOyhpwE8HxoZPJXraQcREWAYM0srZ4XEEQ3hvf%2BmyTXTP4SPzWsTGGcqkI4deA%2B%2FzwoBL5zqkSUlBsWB8njaXLwLjFPfXnyUjL8xtptxiWqqSvpHMjts5xyW3mYtOqHgrTVFhinfzASUWsXzp%2FGfGoWd3NgqoJhnYyv5q5JkfKUTvv1AInjgj3jMucj6iofHU7pJgx%2Bp454MPKI7s0GOqUBjLOi3%2BLD%2B3ibN9fvoKrzaRq0t88Moqt9xJ4nC5dqMfDyxwKKCZgbc99XwliRwfUwvybwvw7zbS1C58o7wNVtG4Ejz%2BJmdBmYSJw4doWUP2Pz4Ot%2FrkClqejfV7XoYXxm6aBBajW%2BdFmqOS9I9ly1ufZNXYuBWHXTIo6BNAsbwGikn5VaPdrZRkW1d1RL4c0vfuIB9l3sgBk1qqR4X9wpzjrUKiG%2B&X-Amz-Signature=4080c93d720860780bf083d1f74a617a1d6068e4fc7624ade1e37b218b26f0c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVYBNSRO%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC6QzvNamKqaRqne99gYGYEiQ4nst9spE0Okov3Wd63DgIgDDdRlZaF%2Bwejb2X%2FKonXaYY5SgY1Wy3uOZr9%2F5mpIh8q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDOMNs9PkJ39E10FmpSrcA8EeHJOSlR096HywkRzQMbiiUM9iQpWchXnTwh0NmhHkl8wIz3F27nhxjHEDtdzjdLoYjhtj9HdpA%2FXT67F9LZSSal%2BZZu0TK196xmsAxxOg9HA9FjHOoB%2FMeMonf4jTdvL8bTRz7e7l6VPGxNoPl3UfxtxkOyevQzJcqBURfYtolskq%2BK0igqPehRK4l1EaY8A9ayD4IYG1anQ%2Bm3nkJ1A0bLn%2FGsI2rgOFoozU22l3%2BcQ54KQcpLVFYm0%2BQ70FCjA%2B0nFws1co1Sdkkm09y8dIkp%2BTkUvphcnIvL3zboO%2FgeKjyNvIrWeFIKgmgSL%2BwNRocc4yG6xmz7GSO6B%2FydZcSXnbfOc6VFjz6pEY%2BjuOJEdUmyV5H9Nqy2Kc6d1OTfN75MRR2F7VuK3CHLB0mnaOemzanRi%2FAuhD179rEHlxw%2F3ZElOyhpwE8HxoZPJXraQcREWAYM0srZ4XEEQ3hvf%2BmyTXTP4SPzWsTGGcqkI4deA%2B%2FzwoBL5zqkSUlBsWB8njaXLwLjFPfXnyUjL8xtptxiWqqSvpHMjts5xyW3mYtOqHgrTVFhinfzASUWsXzp%2FGfGoWd3NgqoJhnYyv5q5JkfKUTvv1AInjgj3jMucj6iofHU7pJgx%2Bp454MPKI7s0GOqUBjLOi3%2BLD%2B3ibN9fvoKrzaRq0t88Moqt9xJ4nC5dqMfDyxwKKCZgbc99XwliRwfUwvybwvw7zbS1C58o7wNVtG4Ejz%2BJmdBmYSJw4doWUP2Pz4Ot%2FrkClqejfV7XoYXxm6aBBajW%2BdFmqOS9I9ly1ufZNXYuBWHXTIo6BNAsbwGikn5VaPdrZRkW1d1RL4c0vfuIB9l3sgBk1qqR4X9wpzjrUKiG%2B&X-Amz-Signature=4080c93d720860780bf083d1f74a617a1d6068e4fc7624ade1e37b218b26f0c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646MVW4MT%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T051727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIDcteJ0XlMGwjFVycjFq5GMLU5M8LOUPZyNyiOBkqi7TAiEA5mql00mppFy9x5b0ZXxP0Z8nNT%2BgL1XWrg2e1nVnIQsq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDI7UfGFupDs04qJqVSrcA%2BXPhTBUIVHFRUde6uexez%2Fdo%2BPapUJGJzaedq%2B86HnTV8jDHSzQMkaHNtSeZnkfjqZ8iyRyP4utQCggxxZpEIYXUdID5fuBUASljwzH8fHji4dfqhLthaB8tkQMVt5SHh1FX91%2FTXGpSnySxNG3kEdlxSmtHp3AoEpuumth8JGtPC4fJzCXUWRltpJgPugz11WlUppTNXVdtMk66XV6ZDuZ%2Bm3%2F8%2FyTYEdbtcuZqYagcpLDDo8KMUdW7FuRayysxHe6RmnRNzs0U5CyYlTsiwZFKT8pMeffeYM%2BG%2B7qdqNHv5twDjT7vTxRXlkzm90iblnSLaoo0J3T4Meu8Aj%2Bd8AMGEuZ%2Fl28hBCvTFkHX%2Bfy4T0D4EsQ0p6G4I49BQKa%2FMFuUmGc7v545qw%2FRTICgaiEGuK%2BDN44YY3FKge8HOVvwt6YME%2FE2YesN9sIzZhd1akTApDJUCz8F%2Fk0ZtE5jhAF3OTPDxLEzzMvTqVTaXYi3X4dv9Y9MNDDcotn88fwR6yqmD2D2dRpSYEzBze74M%2BACzfU8aRWxUhREx0xk5vDNvfF51iLHV4RvyDu0rWeB62SdJZr4Bx1B1ADN5k3aQU2AGfNgGxukDTbYdOmAehFfuu8uOnfeUBddnIIMO%2BI7s0GOqUBUAihYvo3h8Yc%2Bo%2BmA1gtOuKWHexAuob53lIoT0yiZlG7epU4WlzXburtqpCICwtszxXvOzHVE6a%2FIDCmL2fSCvEquLrdkP01ApurJVd945S5ThazowlUFyl7Y3vq8V3opFDlCxmrKumrfoTywfPeHWMDsYyTnL224qzSsLP62U9SiSSpBxZHiMI3Qpz%2BJmWBz%2FMF897GJAH0rEiGLNLDpn7FHxP4&X-Amz-Signature=0c2a7d189ccd1e8282da22f78059fafee1b46bdc219fee5544ca8217cf773901&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

