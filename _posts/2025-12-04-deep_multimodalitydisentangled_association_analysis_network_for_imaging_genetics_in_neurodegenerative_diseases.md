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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3C54X7M%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIAElzmHdd7QNE9aHNGVg8Yvn1ySKSuyz0NO9ex0IRt3yAiEA6uXyGvWFw2cbWzEahiav5lKBiaLBr8%2F4qB4peEktt3cq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNa10Z%2BaffneLkebTyrcA7Ws%2FVqjAc7NukoyBPTGx9QVuTYXhKsjP9uMJUKI4hjjo96TUYTgAwlg34Uk0rHpMWnOooHylQmF36n2M4UB8OSzAw6t8S7zJrpzGUpa5%2BIkxY%2F0pGOoc%2B7v9BpIpS7fCd9b%2FaSlLl23CnjErSGk%2FxEcu1J%2BtNilJHodPz46wM5A9jeGKEzpjtNDX1D%2Fl8MLEwGJlJ34LdmX%2B%2FLSgFDFX7W%2Fc1aLhoODD0j%2B9dZahC5a4ez3NZZD6T32kpQhBBqty9aRArrQSWEK9SbwEjMErfmBgUPq0CMFr6j%2Bqn%2F2QE7UmcS76u%2FuA2a7E%2BN3v%2BnVoEeiyE7Xu%2BNkXNCA2ou9A0bKvKRX3yDRCLNKavP2bPNYFmo26LlYQDy5qKneZwX%2Fo9Y3KgjnmILab7JKHBdpipDNj%2BzLPaPcdyfNEHs98DXIo6qQa8RBzI9k3xjr1CQZVB9xd0WirYOy3BNxj%2FZTbxeOCsNVm%2BO5MWYq7hC43U4ks0xEWmaF%2B3CQPaI1qZpdZfLEeJqPdbwXXkjLgZfQn4GYgtDBALGWjEYfLNHmtfUxyPULMefrOvu1DB6XHe151JBYIQ1sa676wjsuQmZPWA%2B3NmbkO%2B8T2BEmLU1SfZ235UhtgfH25naRp4svMLv%2B9M0GOqUBCpaLJfvoOWXJnLepW249Sp%2Byk6o8Ps1iBgHVcH%2BJRG7CNPLNt%2BUaAqBMVlmEjWylWs2f8Ss8ndiepWwqaMpzJZbLeTHJxb6X%2BuzU3Ur6Xy8jhaqS4Rxxx0xrGdquvQTXE6o9FYZ3mY5zLnWdH4WKuY98HeDzPGH4HBAgWCOMP%2FNOIW1lmS8vwbCXhYWHBNZFJQVF%2FfYOIl3xBcyDgD8YGDHvWnfl&X-Amz-Signature=05206eb2f9b29ff5cbc3f781a0f428e7a0e3a880bbee095b3df68e87e61d4cf9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3C54X7M%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIAElzmHdd7QNE9aHNGVg8Yvn1ySKSuyz0NO9ex0IRt3yAiEA6uXyGvWFw2cbWzEahiav5lKBiaLBr8%2F4qB4peEktt3cq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNa10Z%2BaffneLkebTyrcA7Ws%2FVqjAc7NukoyBPTGx9QVuTYXhKsjP9uMJUKI4hjjo96TUYTgAwlg34Uk0rHpMWnOooHylQmF36n2M4UB8OSzAw6t8S7zJrpzGUpa5%2BIkxY%2F0pGOoc%2B7v9BpIpS7fCd9b%2FaSlLl23CnjErSGk%2FxEcu1J%2BtNilJHodPz46wM5A9jeGKEzpjtNDX1D%2Fl8MLEwGJlJ34LdmX%2B%2FLSgFDFX7W%2Fc1aLhoODD0j%2B9dZahC5a4ez3NZZD6T32kpQhBBqty9aRArrQSWEK9SbwEjMErfmBgUPq0CMFr6j%2Bqn%2F2QE7UmcS76u%2FuA2a7E%2BN3v%2BnVoEeiyE7Xu%2BNkXNCA2ou9A0bKvKRX3yDRCLNKavP2bPNYFmo26LlYQDy5qKneZwX%2Fo9Y3KgjnmILab7JKHBdpipDNj%2BzLPaPcdyfNEHs98DXIo6qQa8RBzI9k3xjr1CQZVB9xd0WirYOy3BNxj%2FZTbxeOCsNVm%2BO5MWYq7hC43U4ks0xEWmaF%2B3CQPaI1qZpdZfLEeJqPdbwXXkjLgZfQn4GYgtDBALGWjEYfLNHmtfUxyPULMefrOvu1DB6XHe151JBYIQ1sa676wjsuQmZPWA%2B3NmbkO%2B8T2BEmLU1SfZ235UhtgfH25naRp4svMLv%2B9M0GOqUBCpaLJfvoOWXJnLepW249Sp%2Byk6o8Ps1iBgHVcH%2BJRG7CNPLNt%2BUaAqBMVlmEjWylWs2f8Ss8ndiepWwqaMpzJZbLeTHJxb6X%2BuzU3Ur6Xy8jhaqS4Rxxx0xrGdquvQTXE6o9FYZ3mY5zLnWdH4WKuY98HeDzPGH4HBAgWCOMP%2FNOIW1lmS8vwbCXhYWHBNZFJQVF%2FfYOIl3xBcyDgD8YGDHvWnfl&X-Amz-Signature=05206eb2f9b29ff5cbc3f781a0f428e7a0e3a880bbee095b3df68e87e61d4cf9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6VGO7XZ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGGCQc3MBk9eLW1ukuDyG33Ep%2BGrW%2BAdADdUngCejXb2AiEA45CG91kl4gZ70fnq5%2B2JcfOWaIZQpe9WuCSfTQhannsq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDOVobzz2ARaI7dsJ3ircA%2B697VruA4YDfAo9CCjiDIayACtN72JXeQHc50lvY7985Tk8g3Ar7chl%2F7O4lSIQRQJuLBNxeypOWy7lASE4LLZ7YbK6z5H%2FFzbKhBAhRxFaBBKcd0QUO3U9BJRE3TszgbWNwmUqGRi7HhjJNr2SJIOo%2F0VuhHpiNZiiWam%2Bc9qrETh0L6hp20OiqrURh5tUdCwmNsmK%2F48U8LbKnq0USc0jD9yhXZFJssXNNIPuIUSkVm9H3%2FFvoVOO8DzQX5BQ3fhL44WeslIp%2B6WEb1IJ3FWZ6zkkoxMH7Dbx%2FiaiUJzl220uq5mWGRJQJ%2FEq1%2FkpzS3SVfpV5kRWQMrX7HjzXwFP%2FCLzr6g1cr3ILXtAuzvO5jRZAhy93K%2F7GsqugrwHP%2FQXF5X3n2xqCZhOkDKn1Q%2BcXthxluND%2BXHHF%2FI3SxtX5IhuV9cA34jpV%2FolyDFNo%2Bv3TGPbq7Wbgp4l1KL6Dsm%2FfEo81TzA8jJmXjPxgmrTIvSrnvoHFQ3AJsQ2LL4QHS3COstJ3z2Oah2hUKiuq9wBasZnJNpgm5OmIIfhW9qMEiVnBzjd%2BXYg%2BMX4mG4H%2Fck65B9ul4JRMtSzSTAHQKHDpwQduzS4WRYA%2B8Uoj6GyWQpVPqV7EGNS%2BBz5MPb%2F9M0GOqUBOoJh406Xc8glLROLeNzRitVWOUYN6LhUOgMHOWPXB2T7tEFuAGQ%2BHXAkBgpopRXUjskTPCmu%2FmDR24TB2lXykxjNCj7RHPB61rpYwz1arF4onD242etnzn%2BFM3sR4qimJwu8kZpf4vRw5ui13V2QZitsKoTGd37zf160j9TbAZRHmD6UPhViCYHGZ7PEfjMbX0sDlzTL13qNE0UfgBUXWi%2FHpXFf&X-Amz-Signature=b31fd752bc4afb85b2645949ea81f51d9737f7ee7690a3637618c05ad56dd64a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KWVNBQR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFVV9mAPtwyH65SOw0er33MzkaMWdXifsmqvM3oB%2BNgYAiAJmqkBwtcHDKNXLMv2TgmkUM8pOkzHlELh%2BajbWPtlXCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMeAbmItFBup3yhDdhKtwDCctKLvyd9uy7cyQCwjyLBVWlN5H9oAmfI%2Fv7yGfSyvJQ%2FIWbIv6nlRbvg2F1MoODt105Bv%2F28zvwJoiLvBIoCHGHt4gjFK3fwJ21FW2YmBFLv%2Ftnr284aTzmBIfztItqEJ5G4OjZUFy8lR99cA3nqqwMzq8fTiSSLKOgp54BSSOK7rbDsKoF7kRQ4pM6nXMBz413mMD4WA2Hx7xqPzrkhWb0aDq8IWkWI8E0BTx%2F1eWAeUuMaevAxehzvhwgj5RyZFw4pV9NkQIXOe%2FgRqMLfILLDrTpndtlqggZ2ds76%2Bq5EsFpJr%2BXXCBRHoA7JI3ZwreQXoYG1b2hmYUwVxRpGoATzgB%2FK6vSAYB8ntFks74zyIcSimMsGf0W5qnol2iNcdpAMWuih6ollZfEA80NFipcyp5jhYH6KB8dODOn1Dq%2FXhKhtWozSSQtfLYDOTk%2Fj1F4V4Fg67lpd%2BdHAFJqTxC2pURUVbI6SL%2B1%2F3AWvgc6hmFmss%2BmTL2Ow4I%2B3HBZVNc7UslLZ%2BCtCfmFZ2M1fH%2F6zMgQ8z5GLy65cKstSHTKX4H9Cj%2FR43PjOyI1S5I1RhIOGQVY2mnf78WXS2zqVgPLNOisXruP%2B4HuPLOZ8MKZ0te4VVz8cVkla6Ywz4D1zQY6pgG%2FdFsHMm4ukM6uh2jiQWtPrDdfBCtwAlkmV2ygp6nslxksEpm%2BwQZ716mQJi4553stqWLLp1lUTQ5QaEgEg40Wy3QX756uSCTuDs%2B8EY%2Fa2UapwV3L36jl3TQkCMsfSVhfWWWcUVOCwEqqT9FdsewCcfkGld0ujMzIK%2BKdmuyDchbs8j4QrzFBDu2nUraiVjhmIYxMsM9cV%2B4Agf8K9xfKTuxl0lsN&X-Amz-Signature=245b20377cebb78854a1cba29f3244ad9424ea4cf8da943717ba3d101f7a02ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KWVNBQR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFVV9mAPtwyH65SOw0er33MzkaMWdXifsmqvM3oB%2BNgYAiAJmqkBwtcHDKNXLMv2TgmkUM8pOkzHlELh%2BajbWPtlXCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMeAbmItFBup3yhDdhKtwDCctKLvyd9uy7cyQCwjyLBVWlN5H9oAmfI%2Fv7yGfSyvJQ%2FIWbIv6nlRbvg2F1MoODt105Bv%2F28zvwJoiLvBIoCHGHt4gjFK3fwJ21FW2YmBFLv%2Ftnr284aTzmBIfztItqEJ5G4OjZUFy8lR99cA3nqqwMzq8fTiSSLKOgp54BSSOK7rbDsKoF7kRQ4pM6nXMBz413mMD4WA2Hx7xqPzrkhWb0aDq8IWkWI8E0BTx%2F1eWAeUuMaevAxehzvhwgj5RyZFw4pV9NkQIXOe%2FgRqMLfILLDrTpndtlqggZ2ds76%2Bq5EsFpJr%2BXXCBRHoA7JI3ZwreQXoYG1b2hmYUwVxRpGoATzgB%2FK6vSAYB8ntFks74zyIcSimMsGf0W5qnol2iNcdpAMWuih6ollZfEA80NFipcyp5jhYH6KB8dODOn1Dq%2FXhKhtWozSSQtfLYDOTk%2Fj1F4V4Fg67lpd%2BdHAFJqTxC2pURUVbI6SL%2B1%2F3AWvgc6hmFmss%2BmTL2Ow4I%2B3HBZVNc7UslLZ%2BCtCfmFZ2M1fH%2F6zMgQ8z5GLy65cKstSHTKX4H9Cj%2FR43PjOyI1S5I1RhIOGQVY2mnf78WXS2zqVgPLNOisXruP%2B4HuPLOZ8MKZ0te4VVz8cVkla6Ywz4D1zQY6pgG%2FdFsHMm4ukM6uh2jiQWtPrDdfBCtwAlkmV2ygp6nslxksEpm%2BwQZ716mQJi4553stqWLLp1lUTQ5QaEgEg40Wy3QX756uSCTuDs%2B8EY%2Fa2UapwV3L36jl3TQkCMsfSVhfWWWcUVOCwEqqT9FdsewCcfkGld0ujMzIK%2BKdmuyDchbs8j4QrzFBDu2nUraiVjhmIYxMsM9cV%2B4Agf8K9xfKTuxl0lsN&X-Amz-Signature=def22cee822ec787594d52790670f38597190e407e240cb7fbc61e196d9ed90a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZV7WKJZ7%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIHmG0LBkxqdPX8UhNLWtHLNODu1EPOtWu3mdakMsm1XtAiACgBGg93gR83Aq%2FDCPgStoi64XQgUdER1zmD%2Ba13RwZir%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMUcik24gwdBLu9kfUKtwD4HpTwir%2BH0wf6Eovb0rvXIHLLNoQYzwZs%2FoyktqCf3y5vkJMAwU4q0q18lJhoZmptsOjnf0c%2B%2Bwajr0SlBM9TkckDbMQbmeNWfLWj%2FgfSm%2FulKj31iXglNdWIJi0doBejFmUqBYWSgDN9ydLqU78Tq%2F7i%2BxRFmSuEE%2B4X7jXCsrR2vbPWdnh6bG4fVBlEJ6H%2BCbcRS2Oiu%2F04fxdFk6OCW8FBXRqKYlhGDKsRqkoCtVFUb8YXXD5xNdzIn3x6ZMZtv%2FSNUtuILa72hmjeFf81xfuWYTalLFghTrngaerCMmJgQiCP9zx81JRcHBtse1a2RvMTORmLzj2zBt9P8s3eDUZSUsB2DlfHvI0vcPV12xErpVnrxCfI3r%2FM81h4wQgTuMrc0cGpupPH%2FsBG0eIZShwXXV2gFKuf9o6WCdYGorhtLJ3NcepI8hFNSF36bA7yrU0KkP0t59VWdNK13iNdrZUxHYU08BrA7A6%2Bj3zGcNgMQz4xU9EBvypL8jQqqikg6phbrykhjZ%2BRRvX884yZTxZHU6IvffesOajyKs6I3UESZ9cT8e0cDAdq6UKmvEAA%2FY70fSynjEkxOFgNX5uE2sUvqSjgxM0%2BNZgfDmGHij%2BnbO7F8qrUNv4yHgwu%2F70zQY6pgExIMVLX0SEF%2F1XQW9ODezCrL4p2khel4XI1AD75u9E3llCLbNk%2BkxI9yL1j%2BrKRLLUYZyCfkxUFa12UvPpbje4TlobFLni6h62eeUhmChPuLGfnDqSGF37cb%2BbKn2Ttv63hDUfHW%2FXzAuGKiyiFE%2BjiVX%2BcY2MB5gh8z12g6%2FKJaX1i3unVMNfna5CGYDV0fNPj9rLhY%2BemZ3a2wP5OKVkeyVBAhD2&X-Amz-Signature=888047ae02079308ec08c15378d3635599bb215f5cbd66b4a723eded58fe04d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UV43YYBY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDVOlxUEXI2ftRHe9T13ghsZHdYM%2FllYEhqzIXNVJNdXAIhAJwvJCXh%2BAR3JgFgx5visnmK%2FK7yby436Lp05esddGsqKv8DCDYQABoMNjM3NDIzMTgzODA1IgzeXAVZfLctp1jVR7Iq3AMFw9HPX4ynrPwfbc2pMEN0YHufzT443TNp743VDPBEaxoS6M9%2B%2FwvpuA8aRnqhzDw6VLXrBYu3EC7e1VE%2BIpc39l6c9R9qdE8W83F2xxAPAiUhXNi9g3DK2HhthXaGfCE6U95ctqHUDbC7bsLDk9vKP0Uai3QHl45nt3G%2FC6mIOGXPwOZ0elLKHUqThi11%2FkVoZgVgiMOO1st9Gh%2B5Vk937AZbVIOmMvaqMmFcvWz5rG3KJ05GNG0bN2ksJeCRiswCYcKAOwxIWfQ42pTGKAf%2BHJ2J5uNn6sSbxoj9%2BMTZb9%2F7qL1OwiRcyZ0OU2z%2F6dndKCW%2FrjPlKgfjJk1pULxcLheyjlNTJNJHwXR0UJPvGZBws%2Bnvfbpu3TxO1oeperFdrP%2Bl1wOMGEEQFF%2FZYeoi3xAbelc3w0KlwJwWsmdsq3MDQf7NHRu04iV%2FeELVH83UYctT9wzxkty9Kf9Fxa8QlnTGSLMU76jV4cdv0LF1EAm5BCTgmHCueb2eX80mVmK6f0iL4BlZkb%2FlgXaH5TvIef%2Fn3W1PUlv8y0GMrVto%2Btt7CaKws7w2SGJgAruAxwoy%2FKuFbk4trMu%2FlUDe8j8QRnKducBCc8qEtOmsdEDkiWPYAc7DQ12YZcgNazDX%2FvTNBjqkAadN3Mg%2Fq3CKKi3c9pfOtfnqwV5uhHMUIpHQJ%2B3ZZZr4t6u9aJ2WZmhE44CK1rpRKN7zRjrWrHoXmaVEfweaU6JGGbKmtlqLE6Zo2GfGOFhO1XQybmTCXZj583wXOvMfimAUAuug9LKzllTsSrRLjo4EFlrUbcbtK5BVzC%2BtuIYRQfh%2Fb4nW0HK%2FDUYbReI6cg4ItgD9uFCBArb6UzwcuMTJi3Fb&X-Amz-Signature=4b6542e7a95e5db31d2869162b4b5cd7067cae3ee41e966442004b01d676d7e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GRDKHTF%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIEk4XQeDPqBsk5CPCc7tOyKdPtvxh1RXmfCzfhKR%2BoTRAiAdEU6qmfx%2BAjDdQCXvmMSv3LitM%2FSgnQxneeS6GkWv0Sr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMqz7ywcZXwWkRg1JvKtwDlTSTR1lIpI4s%2F23mcywV1NOlyJC4pQJKPZcmX5dTIt07SF5qkEnxPrbJlsxHNttyl7akOxl%2BSt%2BZgSiq9dPxVw20EKPmPGOp1vSv19KOVtwLHx3hsdya4Da5xE0OY8WO09Lv1U6%2FQzC9V76oizr8Ebe30Oexx3ZZRFW5f93hk0Tvds68F%2BruZGxjtpqGMy7mJ8aOFJlqYUzuu%2By7WVcVRPVUpsGK7Q3rcykLTGdIQML2yyHO0Bds8yla6enAAQMv1zgfLUcPjLFMVG%2Fv8vYmC%2BH931kTMZB2ifIUe6UuvSvf58WMAinysgqa7JwYxyURWQobSFBDUXdTtFjw6ZT7HQWzCz9qufkYylQaBeF382hGCXv1GGN6KkStyUCeYLxjURj%2FXzI%2F5CwKMtLTFJO2fCTpbDn30AYhQEEej75e%2FGPHLbWww8E%2FpmUXzQJZNNvu25cHAJ3YB54WUk5wgg%2Bh33M16pxabDTB%2FFAL7vkhYN8vtYku%2FLn11w9otGiEut7X%2FboFXhqy0KT8XURHlbMbfS8YATIRxmC4ew3t5DC%2Fjt%2FgZ1CiBKE8ZWZ98Xot8MypkDVbop6J%2B4weKmrK8BTjT2L5wLcy6UcQw1XmGnYCFXyrpQBlz2q6Ve6YhI0wo%2F%2F0zQY6pgGrbZUPmBJES6CQtVuO95C6OwmKIU1oXM58HSrc3aoVMhmvoS2XYIr9zcvqy%2BgbAoqGOVDgbj09sUZ3%2FZpLJpaJuCR%2FSzA2N18RJtx94E48u3qqvRahqpqXA97ZwHJy5R3WphSidyj9ZO6qhCyregvMoAbfvYd9JTFH4dEKTxOlVYvTVSoSXc9EWQ%2BeFeT%2Fu5qK%2FcolLRQuen3AapGdmoJXRV%2Fx55Jo&X-Amz-Signature=c110451baf342eebdfcc4d5faaef7a48cd0137e086c627c25c88c53cb183ca39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FANHK6H%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDWL4aYXR93qzic7vrk7CP3WooYJIBr2ECM1MBwpTfu2wIhAO0FBcB65PMaiJCQSfg0jQvEj3woUQED07R8BycWF1hoKv8DCDYQABoMNjM3NDIzMTgzODA1IgxPfcDCbxvckU5c%2Bacq3AO20yFqarr%2BU1kEmpkmyzzHls3neVF%2BZAYwKEZ%2B%2Fa9SYJMuaT%2FaLus8njbubf6wMQ1Wiirtt9GUu0BNjsR%2F0CPE74nxbMyJC69s8LA%2BOYQ0%2FcSv1LYiX4aZjRIQgmN00Y7VQ6KPxRn1kCQNoyzdxESaM9BgO8z2daoHGzQwo3F6gjrHA%2FziCc6HtR%2BplGYoAgkXlbla7pIexFzwIMMLiDH0FiUnvCuAciXZF5TMQegK8fOj869YCFhR1CrgchDXqlqLpZB4O0EJ4lPBss7wWJWiOd8TvFnh89sqxpr6F0q625Fr7XTLP7%2F8UlBvlDoTbH7gg0F7ClgDpY07gDAyoxdULA1QvGwE9OEm%2FaVo%2B8oXQhM9FYaXZ8qUhwbB%2FgS9pdk24ONkJ9e0cwG4w7hBD04pS3QrS3xJLB0I%2FWymeq8zSgydffmtEWNR7BngeaiTpA6w4GMwyJm5NtNE%2BqzwyCNMHLZYud94atjEr7BjeoB7ReUe5E3gge9BrbvL3r1EPpbWZgqWoZcOdwdcEMg3nc2biDq9pzJlT%2ByZoJmHwlbvuDr33XweJ27eiWLkHZ7htxYHIWAiq9taCEP7YUYc616WKnMYJtgAJokjziq%2BGsYrJdqhp4ZsfHkIXjffHjDl%2FvTNBjqkAZeV%2Fr8xXHmZZ932Q6OanDV02sBA95HSkdGGm5iDOQnUWHU6hA8CD8nm7m5pQ3%2B4KBXGUtSJ1GgePBS%2F8ObSN%2B0whvYvM6lynf60p3RW6sl841o8gFtSYiIeVJt%2FGoAe2zXd2%2Fzvkf2P%2BTKPZ3lJD9sNAQcSN1GfkRvBEh7g3gLa66oEPMLJqaaSyWfY1hxMOudmktyv4nB1yyePqTPrdycfTtG9&X-Amz-Signature=5d99411786ef779af5684dcebc0e7b8df7c07d7fe7ff4550a602b5df4e68d984&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FANHK6H%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDWL4aYXR93qzic7vrk7CP3WooYJIBr2ECM1MBwpTfu2wIhAO0FBcB65PMaiJCQSfg0jQvEj3woUQED07R8BycWF1hoKv8DCDYQABoMNjM3NDIzMTgzODA1IgxPfcDCbxvckU5c%2Bacq3AO20yFqarr%2BU1kEmpkmyzzHls3neVF%2BZAYwKEZ%2B%2Fa9SYJMuaT%2FaLus8njbubf6wMQ1Wiirtt9GUu0BNjsR%2F0CPE74nxbMyJC69s8LA%2BOYQ0%2FcSv1LYiX4aZjRIQgmN00Y7VQ6KPxRn1kCQNoyzdxESaM9BgO8z2daoHGzQwo3F6gjrHA%2FziCc6HtR%2BplGYoAgkXlbla7pIexFzwIMMLiDH0FiUnvCuAciXZF5TMQegK8fOj869YCFhR1CrgchDXqlqLpZB4O0EJ4lPBss7wWJWiOd8TvFnh89sqxpr6F0q625Fr7XTLP7%2F8UlBvlDoTbH7gg0F7ClgDpY07gDAyoxdULA1QvGwE9OEm%2FaVo%2B8oXQhM9FYaXZ8qUhwbB%2FgS9pdk24ONkJ9e0cwG4w7hBD04pS3QrS3xJLB0I%2FWymeq8zSgydffmtEWNR7BngeaiTpA6w4GMwyJm5NtNE%2BqzwyCNMHLZYud94atjEr7BjeoB7ReUe5E3gge9BrbvL3r1EPpbWZgqWoZcOdwdcEMg3nc2biDq9pzJlT%2ByZoJmHwlbvuDr33XweJ27eiWLkHZ7htxYHIWAiq9taCEP7YUYc616WKnMYJtgAJokjziq%2BGsYrJdqhp4ZsfHkIXjffHjDl%2FvTNBjqkAZeV%2Fr8xXHmZZ932Q6OanDV02sBA95HSkdGGm5iDOQnUWHU6hA8CD8nm7m5pQ3%2B4KBXGUtSJ1GgePBS%2F8ObSN%2B0whvYvM6lynf60p3RW6sl841o8gFtSYiIeVJt%2FGoAe2zXd2%2Fzvkf2P%2BTKPZ3lJD9sNAQcSN1GfkRvBEh7g3gLa66oEPMLJqaaSyWfY1hxMOudmktyv4nB1yyePqTPrdycfTtG9&X-Amz-Signature=8fd357b09eb6b7823160c514f4c9988e7d5dada9fa6bbcea4690078abfaafd01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDYIRU3F%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCRmL1dToIoYlz2%2Fp1LoMImnY5lzWB%2F8fc6NKPQcVelhwIhAIMwempqJ%2BRdrBPlYfJ2J7ABobhAej%2FfvAw8ng0Pcz7wKv8DCDYQABoMNjM3NDIzMTgzODA1IgyUN67VDv8J%2B%2B6LsSkq3APACfTClg52PpbIgJC3f4VQCb%2FZBFeFUi%2FvD1p%2FJPgxIL45Kklbu9dOk7265x0sLvVuzNFSLg2xkE2WBNfX%2FF4ntFji8zDlP2ZXy5HT5SMGhKSKPHEYMvZC69vUGJHDufG1FyU4wf%2FdQJ4%2BwPNgF79hNJjQRV1pgFUy4%2FJMqOPKRtvgBUfU17O29PcFTIZT%2Fw%2BPYli4LscZHl8b1IXSshQwEPmDtr7mFWOBMuCmyhdKC6Xi4arREM3MFno8yzc%2BGX8nHRVVJezBv%2F1pimgt%2FG%2FC7e2oY901eF1VYS%2BUr%2FqOV4WrRwUIKaqNxFly8BxZgDX37XCh659Zh2m5EDog0R9ZTpXh7jPdYc71ewziGucH8q7KkpnHu3U5akewAgux3dKmB4uIlZzXzdUvgOWfa4sVBijIfq988fbasc%2B8Vn2XU%2BHk2ROD7WBO09mk7oArWxusXMydtHD1SxyTSZ2drQauFL7poXb9trLaUEwdQP96RMUb7WQCdbvffZRH%2BBJmscl2d542udtYFe2GzVC1%2FYYYM8zCJ8z%2Fi5wnoVwNTbHYvvchQecbgHtaIuaRfzkkkSAKCMT5yU01hbrhGErdYotCCmH6EG6gEcfPQZcBhoheh8JUb%2Frb59QhdliXTDC%2BgPXNBjqkAYyTGlj1UQZNorPnvPfOUlcJhYl%2BJunPedjPcK4TMo%2Fh5ZhJuj66R4WOf6Wudgrc%2BITxI4%2BWFoMYUoTPu8vYztDK9cKUU6XgFHi%2FKAe%2Flx%2FVrnXRta%2BCWPDVkBHgWNjWooRbkWVPWmo3bmm19NOw%2BBWwa00h%2F%2F4MprgvIGcMAT3wiMDrUsUtcnK%2BoAG%2B99ehXm4wZPcN7cK88iWVZrjf%2F2RkBxtZ&X-Amz-Signature=2dfbe1e361c73779da507518f60223d136596270766f69c8d395562f1abff541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYM5OMJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIG%2FNhn51hdNrznTm%2FDz5EFn%2FNjpCEzCP0AFN5OhH%2Fk7GAiEAxn8ZJomCLc2DunYV7kr1QtCXFqzKAGic3SsjVNqyChoq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPiccyvWgPCJYTMAHCrcA08I%2F3WbXRcBpGpkZhZAwPfMQNeFuyrZQSttvAYS3Z%2BXLjPB7chtsRX6crC2mnNkmWyw2Sx%2B8Iui5P%2Fc13EpG3CXD%2FuvU3DkFysASU5ePnp1boUBBpZAzSY74b0UeERo8css%2Bcs36OnUjNEFQIBkizU%2Bhq8j352%2Byt3MeeWoOK1yxq5QRhjU7WkCJHLUVQ22H419eWn4EcShVHIdM9ttsGqxxSkVug1wpLyrZIM736lIeP9Reqk25TDbPDfA75LK0EbJHFwZm1lckoChzHffcrj8Uua3n%2BDzJVfbhIWFyowublHMQ7AiMZkx6HkPr5sDXHJ14VpD3EeglPmesRrKY50lVV1lbgEvP0zW4GeeBUSwfkSlcJee7%2FTbbAghKsODm4g6UH8TgyRBvB%2BjgpjjkBW8DzYQwOcCJp8K%2F%2FsXpwjk14XttsdObUijIIGqrdy9bfiu55cKSo7ZfNGQybFZCEAO0Py3SmQVswgDKYcIukBwyFEP1OXbDxfYRPmKSEsK66TJYhfeVhAb2eyJJbNtndqCgmMf1j2n0rW7qVa78ECQnY6qdXEI6sBaHnE8KtSdhjh%2FljT8GRm6hbOszGem5h%2FiAXwUTEpLEzORdPRrAN1hYaGHLBCkk9ct%2BlVMMNv%2F9M0GOqUBE62h0P2HHvHh40ofB8HEwh%2BRtljY6ennmA1EPWfnQ46XWPhVLCy%2BFu6cLb9QTEFuALixum4cU%2BSGs7t4LPbnR1mc5uj8rN9wC%2F2Wjly4RayZ%2BTIckT1TOZ8DhWvgllFuW9yygdjWLbstwic8kbPmTrZZ9F%2FSCbhRGD0hfDssqKcZElx8Ysjaf9%2B6qC%2FgYnxoPt9JyvYMM8sixPjgcar4e%2BtRtd2h&X-Amz-Signature=7a7d2abe5543dd377f87b68b7ed01cff85ef509dc09a40c7d9acb57f188b053f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYM5OMJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIG%2FNhn51hdNrznTm%2FDz5EFn%2FNjpCEzCP0AFN5OhH%2Fk7GAiEAxn8ZJomCLc2DunYV7kr1QtCXFqzKAGic3SsjVNqyChoq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPiccyvWgPCJYTMAHCrcA08I%2F3WbXRcBpGpkZhZAwPfMQNeFuyrZQSttvAYS3Z%2BXLjPB7chtsRX6crC2mnNkmWyw2Sx%2B8Iui5P%2Fc13EpG3CXD%2FuvU3DkFysASU5ePnp1boUBBpZAzSY74b0UeERo8css%2Bcs36OnUjNEFQIBkizU%2Bhq8j352%2Byt3MeeWoOK1yxq5QRhjU7WkCJHLUVQ22H419eWn4EcShVHIdM9ttsGqxxSkVug1wpLyrZIM736lIeP9Reqk25TDbPDfA75LK0EbJHFwZm1lckoChzHffcrj8Uua3n%2BDzJVfbhIWFyowublHMQ7AiMZkx6HkPr5sDXHJ14VpD3EeglPmesRrKY50lVV1lbgEvP0zW4GeeBUSwfkSlcJee7%2FTbbAghKsODm4g6UH8TgyRBvB%2BjgpjjkBW8DzYQwOcCJp8K%2F%2FsXpwjk14XttsdObUijIIGqrdy9bfiu55cKSo7ZfNGQybFZCEAO0Py3SmQVswgDKYcIukBwyFEP1OXbDxfYRPmKSEsK66TJYhfeVhAb2eyJJbNtndqCgmMf1j2n0rW7qVa78ECQnY6qdXEI6sBaHnE8KtSdhjh%2FljT8GRm6hbOszGem5h%2FiAXwUTEpLEzORdPRrAN1hYaGHLBCkk9ct%2BlVMMNv%2F9M0GOqUBE62h0P2HHvHh40ofB8HEwh%2BRtljY6ennmA1EPWfnQ46XWPhVLCy%2BFu6cLb9QTEFuALixum4cU%2BSGs7t4LPbnR1mc5uj8rN9wC%2F2Wjly4RayZ%2BTIckT1TOZ8DhWvgllFuW9yygdjWLbstwic8kbPmTrZZ9F%2FSCbhRGD0hfDssqKcZElx8Ysjaf9%2B6qC%2FgYnxoPt9JyvYMM8sixPjgcar4e%2BtRtd2h&X-Amz-Signature=7a7d2abe5543dd377f87b68b7ed01cff85ef509dc09a40c7d9acb57f188b053f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VYJLLWC%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T135131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCb93gUgiWISo9HvAJaY%2B9XtbkGjFNa1BbbtGc79IuTUQIhAKERW4VOK8ThM4Hpbc3Uy5IP%2BlWGVbijGVdejE6lOtWOKv8DCDYQABoMNjM3NDIzMTgzODA1IgxFWIKA3c%2FKeXgXp3Aq3ANepRUSuUVMYMtN2OmHUfZfnaeYSvFooO%2BB9udITN2WuYIIArpdb85rAWRcGzNyXBSNf1xXa8umcy5zNt00oS7r2Gt1K%2B692iXHaSvWOplnuPmcMDkHIT5G5y8QLvYX9HLrK64UAGLJNnHyFQfzPxEJ0V8zG7Ay25U%2FPiiVDvHHDVId1odVYO9Ews4KnWImVdVHvjeAvNdSWJIhofsAMTRaUG8eoBn17o%2FtHioo0m%2BNt2BVlQPjz2UmiayjgdjKNWXl912TOx8GoMe9f%2F1iDPFu1bIOz3m%2B%2BsYYVT3P8oETPMnH%2FIvhAB3Y%2FI4itK45%2FO7MHp9yz%2FaqQBxZS1nPU%2BAc%2BbRSp3w80MGaSIHhN7YV9hcYcmtWf5zi9sG9k0BK6UN%2BG0A9fsl0eaKoMwMKasYqTVxBUrMk15OuLg6EL5hkUplycHg666r5XZQCINzkQAr5yUcQ1CNG%2B%2BA%2Fclf0BvnW5M8JP%2FIA7M5MXMqj%2Be3uhXw%2B7DxL463%2BFkRiTVWm0nKwVWYS7izgE0KeijWLM3HnU5Qe1g4tVH7wNpFo80sgltqhJ2RRO%2FHSgricZuWZ19XbAnF1AxLSsQyXf5Z%2FMX8aywd6QA68cQ0xux92xnKRloMqh5qherI5eDX%2FozC%2FgPXNBjqkAROie6HmOm%2FzMOfakRnQGKkcxBGZNuW0Hc5VSKC6gR6Q8Q7Q6AL%2BNKZcgEXDE9uNPBqDYeFhxFlx%2F3F3VbHNOLJdGzfJXU6K0J1vWP%2FyBpsTeLkEm7YOcW4oNWXtdE0GEyZhBvK5%2FIUHczZpJ6YrO%2FJ%2B2DIFz%2F6In6kNPHYsej7oPOpsshpR0ttGj4FkCqGFQvkGHuzhcBew%2B2NBxyLiyIZKd7hP&X-Amz-Signature=f193413923547fe47a928a42c67b7fd9d4eb7a65cde34301762f8fc163cf1951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

