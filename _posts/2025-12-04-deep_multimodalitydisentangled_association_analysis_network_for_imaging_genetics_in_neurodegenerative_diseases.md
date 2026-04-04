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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCLMJQ5B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIkIYli8wNWpQHpYHGCenDpHBEnez1XopqHW%2BuLJidQAiEA5XLSaHasyuAqrqY97VT2R%2BvJ9J9dJlCWqLU1a0bEP20qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2FKH9ST%2FDWOjN7YrSrcA0UfjwdUHqS9aoIBzL6%2BmQl4ixGpDRfiTBR%2Bb9vy1dyGvOdlRTJ8mdLfCh1LjDA%2Fh7ZtCxhRsWh7yktNh0fzfrB8tRaVA%2BUnSQPN3Kdh9kUIjXWGxZwNuO3R1qnBF62zIc%2F0jM6PQuq6qWJXWfKshEJG86qTGVi%2FJSHK8zZ%2BDRsosMgtgyDxSCfaSZEa4EtMLo8zVuMHnCUciUUQ1FyC2B4mrVb3Ie5btlgRTOi6KqeqXw0674Ga0U%2BJmVK0YHKpp%2Bq7UxZEckifJvuJYOtKwuuIy2vrwnJBvq%2FtfaJR1B7LllCZGBzcWAOyvz5E1asC5qj5rBYUHh00syjo838adgK%2FAgvye96maUkUdK5ZuMv0sSPIMfXWcV%2FzA8T6U%2BSltSDRO7zg0OK7xtsUmdXNzjhAtWQwMzQgOlTu1TdRdTYAjCCL5Q9jbd5oiyrmKg8cQok8s2%2B963y9xOjV76CYUcp6a3pUxAWIvGHTn4xOqx%2FCS8b7ZqhSaELLDtKu%2BIvglcqqx89%2FgjrrteZwcCsacgpJiniIvz3hys9C4w2YHBoOkKQkBlBKbrH8u2r%2FjG8NRdOxXZomilZsAY8uu%2BTjttPi7VhUf2dn531pjf9Jg4c6zSTBjejvoo8ipSdWMI2xxc4GOqUBLtI9pRD1eXr0Tz%2BYdpShCNwwdMrvfOyLsOJKQiYy9LLz%2BC%2FtVB5YkV7coAvH5xQnCudVWU1a4R0utdd4GalqxWoOoF8Rkz%2F8EndjWBEmh5RVxexMir1CgHf4V8iidDCbb844h6TTTuK67cA%2FJB0jmmfC3yNM7hDCdP2EAXxz2hQs%2BuEhks%2BaJY5v0SFJDpPPmLuyNE7fC%2BIiH7kzk%2FLxyjqs%2B4bG&X-Amz-Signature=94f2253cf69d8d8f0a2d90e92ceee4d61da3e30a1a92eb80d8e033b6ed3e52de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCLMJQ5B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIkIYli8wNWpQHpYHGCenDpHBEnez1XopqHW%2BuLJidQAiEA5XLSaHasyuAqrqY97VT2R%2BvJ9J9dJlCWqLU1a0bEP20qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2FKH9ST%2FDWOjN7YrSrcA0UfjwdUHqS9aoIBzL6%2BmQl4ixGpDRfiTBR%2Bb9vy1dyGvOdlRTJ8mdLfCh1LjDA%2Fh7ZtCxhRsWh7yktNh0fzfrB8tRaVA%2BUnSQPN3Kdh9kUIjXWGxZwNuO3R1qnBF62zIc%2F0jM6PQuq6qWJXWfKshEJG86qTGVi%2FJSHK8zZ%2BDRsosMgtgyDxSCfaSZEa4EtMLo8zVuMHnCUciUUQ1FyC2B4mrVb3Ie5btlgRTOi6KqeqXw0674Ga0U%2BJmVK0YHKpp%2Bq7UxZEckifJvuJYOtKwuuIy2vrwnJBvq%2FtfaJR1B7LllCZGBzcWAOyvz5E1asC5qj5rBYUHh00syjo838adgK%2FAgvye96maUkUdK5ZuMv0sSPIMfXWcV%2FzA8T6U%2BSltSDRO7zg0OK7xtsUmdXNzjhAtWQwMzQgOlTu1TdRdTYAjCCL5Q9jbd5oiyrmKg8cQok8s2%2B963y9xOjV76CYUcp6a3pUxAWIvGHTn4xOqx%2FCS8b7ZqhSaELLDtKu%2BIvglcqqx89%2FgjrrteZwcCsacgpJiniIvz3hys9C4w2YHBoOkKQkBlBKbrH8u2r%2FjG8NRdOxXZomilZsAY8uu%2BTjttPi7VhUf2dn531pjf9Jg4c6zSTBjejvoo8ipSdWMI2xxc4GOqUBLtI9pRD1eXr0Tz%2BYdpShCNwwdMrvfOyLsOJKQiYy9LLz%2BC%2FtVB5YkV7coAvH5xQnCudVWU1a4R0utdd4GalqxWoOoF8Rkz%2F8EndjWBEmh5RVxexMir1CgHf4V8iidDCbb844h6TTTuK67cA%2FJB0jmmfC3yNM7hDCdP2EAXxz2hQs%2BuEhks%2BaJY5v0SFJDpPPmLuyNE7fC%2BIiH7kzk%2FLxyjqs%2B4bG&X-Amz-Signature=94f2253cf69d8d8f0a2d90e92ceee4d61da3e30a1a92eb80d8e033b6ed3e52de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NUXU63M%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDLI6tLOO5hG%2FFlYkLmWaqV1ukTUUSZ%2BB3mGcbhSCckcAIgCTsLkQYzrYCpoeMLhfSEIArHiXYxuSpuVtK102FBh%2FQqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCbvHK35sH7QDzd9MyrcAwj5eULF%2FVDoyuyhwszTAgH34biE9TuWoNS6%2BBVPUodgQxq2motxf%2FPdONQGx5wzWwJTCc4cxyClkK7eAiu8%2FdKghW0DbACzi3mBOPYUk3ryLoxFtCsne%2B%2BoBcNeYbWJLavd89kNMp%2BXM2sLyNLoE9bMr6S5SLGKG83nNuKKfZ1RW2h7fcWda4cMeCeJCtsd2myLURlNg%2FI1VijkPac2lRNGCAXhuiNP0Ahxan6U1%2FQHcbze4%2F7i0pkO7bI8elqqPNfGNt4aSqu37RfoIReFBrsHRlVIzdvzWIYCEC64nLQ4cnw9P4EtmRZaVz0Spd%2F8LTYe2gfC2%2FSfFFvjVcHJlG2Z8Do9HaaesJi6YHpfAZJ%2BUJPG8uF%2FLDxX39c%2F4CUDnxRmA0xEtK0SqCcH955u52tOj10x1o%2F0kfx98HPYn79a9lLD3pPVb5wrdNjunuL4UmqtEyu9kLonf9izlPvq2GudPl3beHduyomL7vq5rDSncggV%2FmWa2DGVVDxy8n2LY6xVcsoNrXv0KeHVNM25JzTGKNMyusm7GXDGDFjpdJrNB%2BXMawHeNz6lKCcnf4hDy3u41znRwHTsxoU2%2Fyf7oYmF%2Bwt0hkEfGKFhF70cTEVtzI9%2FjlxBKPCm5ooRMKuwxc4GOqUBNDSULerPf7VVHn%2BMQK%2BtOI8mJTTbhbNTNtKo%2FokT0S4FlwebvFbTKpy4cPviu8UHDhHU1gMfMy2y2RV8uP5pbxnA1ZDlsubDbbpdFegeGEx6StV8FZSHIIjzov4yR9r7V47h3EkcQY5OSuhiPNejTCHA0htXET8cqsh6KRq0oB3l1EinNqjShN40vqFYe7RQcg7QzmJlJOfPXotiShxRDGVu5d%2FH&X-Amz-Signature=38aacc746ea8d828dd8e2158601ccfa139f75e30a85d5fd6623bd3acde439647&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6CEVN7R%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBgf36BW3zABZCAG85Yi%2FzDLYuYdekqZeSygz7DVLNJ0AiBcFo6WRh%2FfHLu5NR82kP98WsQJXgRxhYKe4NXBlFlr4yqIBAij%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRJWvPvESIiQ80fqGKtwDFraQKzrZsBVaKtV5CdPtKN4mh93P7U6ac7jc%2BCn5tUV7Ilvlv7PDJqP4ZYpd23%2BWRsWL9XRyLoBxDErB6l8xRAeybF6uQrxaaf9nqdfgvhKFPsuCfGiYv7IVXlYOLKty6RhgBfszhe%2FpezevexmHIW1Mb4K5n9GT%2B1MYIHGMrCwrYpi8tReeG%2FhyRh4wjLwG%2Fm%2FcE6DjodW%2BiGUTAClhvZBQIiQImY0wFNN9dP2AXh3x2o2ndIVe2A0jjeW%2F8vAwUFh97juZW5sYKRdlrgiMPyO47bHHXw0eJjFLujEMd5pH%2BWI1ztU867iCW4Fls5owQYK1kil9tgKTNLJR02Yl9Co8qARtBC0cZIuxqI%2BRptmIjJmTyYihE5YdA7v81EdQnMfgvK1tn3w8HDn9E2pcJ9zBJWfIP2qINFsMspXbetgBiY%2FCjRoZzEjdDXAJgGAeE2SVKPEohazj8YPudgNTW696dOLnkQosKluKkyBE6L2eQQzH4PDrOXEiT0U%2B8qZTvxGkke2t4QbaeLEl3C9OTlDcyn0yVmDUmA5JvX1M3sWU%2Ft%2B1IbEBDrPHP3tJWtQdmjDt4aQ1TlcqOVFtsCF8ZY3CGwOs2ksks%2FOUJ63j8MVIpqNbgXxuA3jkWcgwmq%2FFzgY6pgGvV9vTfLiOACa9jeLCbPW%2FWxPdPnB3snFnTK7u5Yk3k0xvMweqIfo%2FzYP5BjU%2FWkIamk%2FEC2%2FLIDowuqtyawpA9krQNGJ0Q%2FvYs9dzs4%2BM2Zla7PBEmOaLbInr5%2BB2c2XFZ%2FTRTyd0c4qr3jjQS3yp6lrvwRKyeTTHihNm28%2BYRvdd0oXlmXJuxJ14BJbvPKD87JA3WVRUNH8Mloobs5Qh0Zgw5ni3&X-Amz-Signature=12e1257cd7c5f52559edaef048770f79ceb01d0947ed3e9d67722fa11b4457d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6CEVN7R%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBgf36BW3zABZCAG85Yi%2FzDLYuYdekqZeSygz7DVLNJ0AiBcFo6WRh%2FfHLu5NR82kP98WsQJXgRxhYKe4NXBlFlr4yqIBAij%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRJWvPvESIiQ80fqGKtwDFraQKzrZsBVaKtV5CdPtKN4mh93P7U6ac7jc%2BCn5tUV7Ilvlv7PDJqP4ZYpd23%2BWRsWL9XRyLoBxDErB6l8xRAeybF6uQrxaaf9nqdfgvhKFPsuCfGiYv7IVXlYOLKty6RhgBfszhe%2FpezevexmHIW1Mb4K5n9GT%2B1MYIHGMrCwrYpi8tReeG%2FhyRh4wjLwG%2Fm%2FcE6DjodW%2BiGUTAClhvZBQIiQImY0wFNN9dP2AXh3x2o2ndIVe2A0jjeW%2F8vAwUFh97juZW5sYKRdlrgiMPyO47bHHXw0eJjFLujEMd5pH%2BWI1ztU867iCW4Fls5owQYK1kil9tgKTNLJR02Yl9Co8qARtBC0cZIuxqI%2BRptmIjJmTyYihE5YdA7v81EdQnMfgvK1tn3w8HDn9E2pcJ9zBJWfIP2qINFsMspXbetgBiY%2FCjRoZzEjdDXAJgGAeE2SVKPEohazj8YPudgNTW696dOLnkQosKluKkyBE6L2eQQzH4PDrOXEiT0U%2B8qZTvxGkke2t4QbaeLEl3C9OTlDcyn0yVmDUmA5JvX1M3sWU%2Ft%2B1IbEBDrPHP3tJWtQdmjDt4aQ1TlcqOVFtsCF8ZY3CGwOs2ksks%2FOUJ63j8MVIpqNbgXxuA3jkWcgwmq%2FFzgY6pgGvV9vTfLiOACa9jeLCbPW%2FWxPdPnB3snFnTK7u5Yk3k0xvMweqIfo%2FzYP5BjU%2FWkIamk%2FEC2%2FLIDowuqtyawpA9krQNGJ0Q%2FvYs9dzs4%2BM2Zla7PBEmOaLbInr5%2BB2c2XFZ%2FTRTyd0c4qr3jjQS3yp6lrvwRKyeTTHihNm28%2BYRvdd0oXlmXJuxJ14BJbvPKD87JA3WVRUNH8Mloobs5Qh0Zgw5ni3&X-Amz-Signature=3f6acbb60430b8bd63405e9d5eb2fbc94d2e5efc1b1c5408b008f254e2bc468d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2IDT2BM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDs22nSrEmU7OIqQKlnkcq4y53VAPSwk%2FksmfIcV0RXaAiEAxh5jNH1o19U1jITnuQnqpPSHMlbZ9hlX4CxlRo2NfMsqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD9bzrzaxhx9wwwAQCrcAzgdGlmbnFk3in5dcn1roIMO9DyJ4iHJXj7GMEAl8DWM9eEuXSrXr9YHzmPOUe2pGjIl57iI63UO8IvSSeet8BLjCmDQ76azQcId%2FS0g7EaHrC9rpXaRpf%2B%2BAM7CVKRp5%2Bhj98HJxiWA%2BYBcH5mH3hH3Mu0kTrjLLtIWp%2BJBrE7E%2BmA7pQRMqwTnuk17eHeC0MHGUowYl7o%2BTMQFwnLq%2FNOf%2FJ1NLMA4xV6Z%2BSpcJQ%2FDcFdc3gnvP0QDrP4sOdM0WaUUc3lcnjaX3TOSUbvcTn%2Bioh8JdCZYL45X%2FagXPyxg6jboYklpSbYs0Iu4RSaGdM9QJ%2BGAXJlI1KlNn0EdlJw7uCWoGl2jyg23Tk0YmkSryo7raYbbRaGvEH6mfaPzWhQ%2FMLPLBsEH9nbRMrVAS9MoZhmCJjK89okShRd%2FnAVDQbC1e9RdpK0A003OtfIFWWpZHwn4552Bv4ef6Wn6oWndC5BUDZOWROHfrspyfoEty7T9ReP4qozPuNSkaZ34n%2BkLL5I2saK3f7OQpWgfqthZ1e9dTOlYkztlO1ZwhXvX9gu4T1EMo4nLT1VIGy5RZeeJH0KDMhAGOLCRCZz6%2FZGNPceYqP1ROtrwpaIslwHwNmkgzcm7Z%2BKhFNkgMI2xxc4GOqUB1kINuW3e9t89UUsyJohlXUfbCdD1LQCNJT97b83ZJt6s%2BqzQpdSpvA1h1egBz9OG4%2B1WKB0X0d0jeb9ZNd3caRoLEl5RR7WOzEP4zOsJkKYROJNb3dhe8KNp428E1d6AwRc9b1oOzkkvR2W84XwU5qfpKrFLBaQFZVHTStQSxKO5cPRhy20s5g%2B9NOypqMKDV4djfnPBFaz3RkwwSy82T7g3dPBa&X-Amz-Signature=a6cd1e5169c511a3dadab4d65661d2906f476bb4b544e4cf8697329badad9e4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XZTMBD6%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIjzY588zbp2SYH3jciBksFqyp7Q5g9tVD7ByL6FyTUAIhALLlXlebpVYPBOC0BOgb2FaZ85qDWHWedqDU4%2F9w%2Faw2KogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwnO60WSyhew4kGsy0q3APW4A0d9qy%2BSUFOJT1D7qlQiOIgd40GaHR68JAG0TE4w8OuF6TiY7oboL2woPDwtRcA8clz%2Bwbfavl0QON8T8voMgoYJuSLsxcVsazbKG%2FFsDioHKPYlyFpu%2FEBi%2F%2BiTs8YSPuMe7pwfQWsyfdJL4AUI1lRw%2BWNNS%2Bz5QXG4%2FiKW8VMEQ%2Fy3P%2Fy2kHRwFgLBYCprXqTNSYUt4J5fcp%2FyZaj4WIRNmETrhauEPzYlgUhKJworyKVVVg5CpdXnA%2FacwxfKNddEBJhLOLi9RuaVRKWMSZnWAs%2FBOm4EBGxYZJMNPDB7dkRoglwbt1U4NIUGIcebkBnqYBPHEGl5JCL3QO31eGk3uqte21y2Sy7o2tT2zVYvfYhy9Xvn%2F7nI1cvMixVftT69l9uFiQ6iR6Yt%2FHjPQR5Nrnl5m2pFRDTbh1%2Bsqoj%2BZnSSqFr0PlL2wQVeuner56S3iBmilXnc1eKbWIIEVnQ54A1eF0bDegwypm8pdbSr5xI3bLIIAGvXcieG%2FP6hQIHKoFsgvWn%2B%2FXr0U9U%2BqVhWksf%2BicdfafHQENlnIgvgStDV4fFsNPMjNFE1MeXoZJH9GndiuXSWQctwVKxTtpheQjr6txjUQZWkntQipK1AVSnk6%2B1IsehOjCNscXOBjqkASWNUIlmtbiNj4OH4bZdtbgGMt0cWg28D14akhUH%2F6glGNruWLmkCl2PYQ5WTgjraLu2UkwlcsvpcaPGgwxAewJFipK392hlZvPdyWoajvvH46Vv1UEZzWkbPVKtMt1mOHPUj%2BZCZw7Ye9itlbXy6%2FEa14n7zXTTUdI0tAgGy0Ezn3MNuDZTwa5JJ30RG39L91PRYP1u%2BzdNRVhxpLcg0dCJcoSi&X-Amz-Signature=498b93380021e595d20be41800bc1b46f55f72e3813049b091b9c66f31c10eb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FFKAXJE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGsQtPddrtZC2px%2FVGWdWy2JwKwwLHl8xbsx8ZvQI6mzAiBS%2BcpYiJTeihazmnZ51bXKdLqRes2odvGvMZEZsQ8f1SqIBAij%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMx0RVpESPUbHK%2Big5KtwDBWswspuPtWGDLjdTooIP5QmRz4kuR041gwfo8eBAZtFV%2BE7lrhQOEF%2BLjJ68WJ2tDG2C0flu7N1OET7Px7n5jKHbIuRSVqRSiVMF2KYjQLj3LZKOG%2FZbFF6M2gnFFtlglUkNvz%2Bu6dl%2FNbyDKZlvhEv0oI%2Bt%2FsDj8Bo%2BcDqUKvI72QSaKK4iDArvOHK67HN738hPmcEWSz6J0nuy6qhaiChSL%2FvexOrvNnaNCdYqPP8kP8hGnhqDgHOa8nhVYB%2BFEAlFwaeEuJ91%2B6S%2Bv6X49wCHOyp5X1q0JI6SJdJKT0ntE2ZOqER4tPjvTW%2FLjmlIPoW2bVgD9GIT%2FQoPdhkedOHc%2FElaL0aEU4X%2FbFqJsQYE99F%2BuK4SJdkyUxGWurBnhr25mQIYK9BvVzz2PWwjNx3qhfhQ6ZIRqPdPQVDlWf0ak1wa1caeOWni0OsyaCH9Y%2FLyNIcD10Tvh3F8WN97FoKetimCgj8t0FsNc3RkpQyGjgE9HO99Ag%2BCZjXP6ySq4tfcDGrY4ZnvuyToasHoB4WiV8oQYnMrV9M26FaLK4%2FMAXo6CqhpXggnMFcqGpNp7KasOQth5SQJNkOHyfhYlrj5SPHlwYwO0CBv9hWstIXpyIqOho2%2FQORadEIw1q%2FFzgY6pgEbAFiZ1iWVEsxFIIhi9f9q1Bi659b6TndcXvJ6Bh2R7wUjS9%2Bm1ykpD%2BdG8%2B1roVVYq9qDaXjZZE8hZ%2Bnd7%2B7p9r2WV9iE1Kyq64BQkNnunegg7g9Y%2F0YbrBeUht3vpXdDFV0a%2F8UCsxy%2F1YLjoYwN4P5h3g3sulYVwUwC1UoJ6paY%2BS70Rbnp1dif%2FWc1L64NgI9yQDP8l9nR3vU%2FbRo64WpPuwee&X-Amz-Signature=8dad96c549d715a9fb8974a1d5a4fdaa998c3b01164551d0ccd7a0f6f8bdbccb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H6XQVQH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfP6DmhQhbb4WWFvjGbrIB37GftbdGzIO%2BXPSVcS5mrQIgQqLDcIRxFlBCaX1acsNDySdmQp0Nv6Pzma%2BrRe0JzxIqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHPeyup%2B7KzZGzi3fSrcAzLgqDmah4cm0VZVMZ7pItQEItuvH8%2FuUoxmf78TqYPPD0260aqIFRp13CC%2BOg8I9pRnyG00fH8nBCQixXvrCqYz7nltKZx5zQTBYAoAoVr7N6Oki38HGIHvJBWm3kg8XBW8PeqA%2B3Qo22Vy1WHd05woN%2BWYjfjmNbVziN5ywFZwEAsnyDxGbP7cEYruiFpQw8G9GDzwIELv%2BudXUW3XoewItM7iLUxKjT59aSaMqmmMZmV%2BQRkCT59pVotWnA9x%2BYvVCc8y3i2K%2Folt4gOJBd8sNZ8avDsqBvkpAxFG6luMnF%2Bh2HoYh86GKMKrsiI9KfKQWjr3tDnmJqN5TPCbkOVFdZuidUaHJNWxkgKblPX%2FsMgGjkWkPcuHh7La9egfUIqG7I3xep7mqy7AK2UfJAM09TLDP99X4R3b7YhKMI0sKi1HfnV%2BjSxDBzYBlpl0jjlSblGtyMYRClpHdbasS%2BNzVCeU6nayLQZWEnY5tD2gCPS3HBRjyqvED25YrkadHtNdo3xhmPOP8qvpiwJeA35UmT7kZ30%2BvSgyn%2F5jXccAHJjwBiVA0tfEc%2FwzzonvHawqYs7KB0GELzwaBgXsoIfwrFrNYkioLzy0ssToMEszAiudTsFfIFQ%2FRCWxMN%2Bxxc4GOqUBUGAlYaL3%2FF5WuKJpx4DRcaThZSDQ4CpumvU3ZqNP3R2iOy%2Bx8Zo5NNrq22c7iXzrhhsmMQRSxk3s3NFXtydPPHZ33o9U2TyviBAOE0j6FFDJ1MXJkBM5g9pm1CTbfxgsioZgQIEYjYZta8WvqmAvkOAGSlYOOthYM314Xu5je%2F2KwbJRMA3Cju%2F5RNj29Ej3u%2BFjd6W85s6OEbMkCGdKU5ihjnBW&X-Amz-Signature=43b6344e7b7fe90ae03db52ee75f668c461389b304d8b1d18f948d9a1512f790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H6XQVQH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfP6DmhQhbb4WWFvjGbrIB37GftbdGzIO%2BXPSVcS5mrQIgQqLDcIRxFlBCaX1acsNDySdmQp0Nv6Pzma%2BrRe0JzxIqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHPeyup%2B7KzZGzi3fSrcAzLgqDmah4cm0VZVMZ7pItQEItuvH8%2FuUoxmf78TqYPPD0260aqIFRp13CC%2BOg8I9pRnyG00fH8nBCQixXvrCqYz7nltKZx5zQTBYAoAoVr7N6Oki38HGIHvJBWm3kg8XBW8PeqA%2B3Qo22Vy1WHd05woN%2BWYjfjmNbVziN5ywFZwEAsnyDxGbP7cEYruiFpQw8G9GDzwIELv%2BudXUW3XoewItM7iLUxKjT59aSaMqmmMZmV%2BQRkCT59pVotWnA9x%2BYvVCc8y3i2K%2Folt4gOJBd8sNZ8avDsqBvkpAxFG6luMnF%2Bh2HoYh86GKMKrsiI9KfKQWjr3tDnmJqN5TPCbkOVFdZuidUaHJNWxkgKblPX%2FsMgGjkWkPcuHh7La9egfUIqG7I3xep7mqy7AK2UfJAM09TLDP99X4R3b7YhKMI0sKi1HfnV%2BjSxDBzYBlpl0jjlSblGtyMYRClpHdbasS%2BNzVCeU6nayLQZWEnY5tD2gCPS3HBRjyqvED25YrkadHtNdo3xhmPOP8qvpiwJeA35UmT7kZ30%2BvSgyn%2F5jXccAHJjwBiVA0tfEc%2FwzzonvHawqYs7KB0GELzwaBgXsoIfwrFrNYkioLzy0ssToMEszAiudTsFfIFQ%2FRCWxMN%2Bxxc4GOqUBUGAlYaL3%2FF5WuKJpx4DRcaThZSDQ4CpumvU3ZqNP3R2iOy%2Bx8Zo5NNrq22c7iXzrhhsmMQRSxk3s3NFXtydPPHZ33o9U2TyviBAOE0j6FFDJ1MXJkBM5g9pm1CTbfxgsioZgQIEYjYZta8WvqmAvkOAGSlYOOthYM314Xu5je%2F2KwbJRMA3Cju%2F5RNj29Ej3u%2BFjd6W85s6OEbMkCGdKU5ihjnBW&X-Amz-Signature=40fa03ec8cdd57080dadbb452942d62c48d0eff01eac4265a6dfc7725e235001&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAXW6FO7%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBi0%2FNDfllahOX2y9PfgFkw31H%2BqGiovLWYOeJpYdPdeAiBAiFz1VP9marAVB881niclfV4AEOTXAZ3hHZoGujBBYSqIBAik%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1KMxeIVW9aDzvdy%2FKtwD8ZEQhtcUjY5wRu9LZvjCeoRIwn7A7FtXivAsJyIrleWXo9BxbpJLlm0P9JHPftCy%2BMOjllxoWl8Rmpn%2FCbw%2BnFSpSXmlLGAPo950A2d%2Fv3cnqb3uH7H5ibvhAbI21tADRn8C80497tiMImGA5ZdfVAvFqQQIis530jK92JXbcGHnmrExVOt6fcuUBnlKnE1K2nKfr8UkB1CGGzpZBbhnkprdYqAylEWOkejRBI9g%2FhjqLSD8yrPgfu8lQxLyawp%2Fl2xvD4G1lUZWZUuBxTIl64QNGJCXadWYcSbiCm3L5q%2Fgw5Wj2QfxPQf3PrqTml6Hdgu7YPmApzn2he9QSUJf8ktRdemdQlEe2mPqNVyZLjAi3p3uedVwuQzgb3yIOU%2B4sjx%2FGZN2ue%2BPAPZW0VkHL4%2F70OD7RUPq%2FdkE%2FjiVXykp1XQrnAI6gXjBeyn7yg68TdXpjilLJ7hgsSmNap0NrZXSi0FdzI4tiWHPFbMfIBgs9zEg1PK42%2FvMigiqU5ynx5ndbQ2TEi1ZKH8fdwA5i18Yun%2FrRYJrCpaqmgxZt5fk4dFQBZAJk2BE%2F5zwGISD4bJUvyjr3IUUaWhe56adhV6qOMHpJTIJyd24a8kYYblPD4CanBq%2BjHHs3Eowiq%2FFzgY6pgEOfSgUnWdIxkyjmfXXhR28Z0CA%2F6CKTXzvT79GQu%2B14AUeEBXvoghUdzpJnkiFlQ8H9wOlE2%2FSOtG89Xs2Tc%2FPStf5HLN3bmL9nl31tD3369uePv31IRjX558cvGDa1Z1ER2CsIgawN5kKKNoDOQHtOxQKsTC%2FuocGnZPGCJ%2FwNAO%2BQyqU5y4CcrVcqvaDA4X6oTjzIj6DnBduW2m%2BGDqmlIMRrj9T&X-Amz-Signature=40e69e0291c49857545d7c4fa2609d72df28eea09eea0459d1778b468d88210a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTF5AVNY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1mFsMLIgEalnJYZpoLpmW7etcD2mzQwENgh97%2FIF32AIgDkF1ZEMle902Gx680NyOy0MokmXRaUZUOyV89RUjWJQqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKC3Ccz0FLoT%2FX%2BVnircA1jp9cKGKSEE7U8Mu%2BVZq2EAw3LQnEpdAKgLghyDWxJ4yF1fA2jNMmErxGpYBb6o9QEI1oeVS2M9HodU0HP57sp0S8YQJrMt%2Bm%2FsDc3%2FgA9WbXDz8ai3y29%2Brf2EGltJzCIQz3rgPFRz%2B8fUmYIemfYGLK7%2B4FG4KIbCu2oQyBwbVJBpbc7ZZ6SDUNgPdxnW3EZltMuRx3XbP2OWvAGHj3W3pvprUqB4tRa5oIqgMkNBV9OeiMqcWh%2Fs1iPfEdXLz74fbANPA9MvpYTBAVz89H6PdINbIdBdZvTh3Hv1gtF0kESu2R6hTxFQ2bHxx6Ojp9FqYf2MXTogzPZI9UCPhjIPa60%2B1TfojWCgxk7aDoyuw0jwTGlblqNZjyEtpUINTe%2FKwFU4uikxCqZaeeQFtpMECcz8O03OjUHRbmONuKBySMndKpMCf0GsebxdHDu0THs7pZm4icUk8WhpqCatoNp17op7KqY%2FSlkYDoQ1B7MK0BclJRIkp9IA30Yhm5DIrvY87LT24mQF6%2B7490Z63usjCE6Dmhb01hXbqrAMrJTopI8ChkkjkdRrCZEgDAoVVkpX9ZKig%2Ft5xV5pqk5QloHTZTgTwPtThxvT%2Fw8kzPzIPdQpr6VdwDTRRJaAMJKwxc4GOqUBtOTMPC1St22VoflkGXhDJrIC7GemClVOIVvsqc2R0X9VVrkSlKJi9MXqswR3B3BtsHkBA3FXcGSyYTinr%2B118h%2FLbC9vdKsLYXg3uy7bpo3LDTKG2s3yz6iU%2FErRh04%2Fx6oJq3fDmSuj9i%2B0iQJgHXe2ZEGgowK%2Bon20w0B%2B69cSU0WFE5vQB2STfMWTYAo7eObeHhMoZsTZyuLJVKiIZVlBYcHn&X-Amz-Signature=fb530f57fcba26676eb889738485077202e9fe1cf1777089c1020f8be20b54f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTF5AVNY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1mFsMLIgEalnJYZpoLpmW7etcD2mzQwENgh97%2FIF32AIgDkF1ZEMle902Gx680NyOy0MokmXRaUZUOyV89RUjWJQqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKC3Ccz0FLoT%2FX%2BVnircA1jp9cKGKSEE7U8Mu%2BVZq2EAw3LQnEpdAKgLghyDWxJ4yF1fA2jNMmErxGpYBb6o9QEI1oeVS2M9HodU0HP57sp0S8YQJrMt%2Bm%2FsDc3%2FgA9WbXDz8ai3y29%2Brf2EGltJzCIQz3rgPFRz%2B8fUmYIemfYGLK7%2B4FG4KIbCu2oQyBwbVJBpbc7ZZ6SDUNgPdxnW3EZltMuRx3XbP2OWvAGHj3W3pvprUqB4tRa5oIqgMkNBV9OeiMqcWh%2Fs1iPfEdXLz74fbANPA9MvpYTBAVz89H6PdINbIdBdZvTh3Hv1gtF0kESu2R6hTxFQ2bHxx6Ojp9FqYf2MXTogzPZI9UCPhjIPa60%2B1TfojWCgxk7aDoyuw0jwTGlblqNZjyEtpUINTe%2FKwFU4uikxCqZaeeQFtpMECcz8O03OjUHRbmONuKBySMndKpMCf0GsebxdHDu0THs7pZm4icUk8WhpqCatoNp17op7KqY%2FSlkYDoQ1B7MK0BclJRIkp9IA30Yhm5DIrvY87LT24mQF6%2B7490Z63usjCE6Dmhb01hXbqrAMrJTopI8ChkkjkdRrCZEgDAoVVkpX9ZKig%2Ft5xV5pqk5QloHTZTgTwPtThxvT%2Fw8kzPzIPdQpr6VdwDTRRJaAMJKwxc4GOqUBtOTMPC1St22VoflkGXhDJrIC7GemClVOIVvsqc2R0X9VVrkSlKJi9MXqswR3B3BtsHkBA3FXcGSyYTinr%2B118h%2FLbC9vdKsLYXg3uy7bpo3LDTKG2s3yz6iU%2FErRh04%2Fx6oJq3fDmSuj9i%2B0iQJgHXe2ZEGgowK%2Bon20w0B%2B69cSU0WFE5vQB2STfMWTYAo7eObeHhMoZsTZyuLJVKiIZVlBYcHn&X-Amz-Signature=fb530f57fcba26676eb889738485077202e9fe1cf1777089c1020f8be20b54f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MRHTHBI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T221503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjIefUCCo6PISmTwPIr%2BobLtjQA%2BJQcdoJMUSZNQeLmQIhAJT6OPYmfUdo%2Bw2Vft3ut2DF6V4502dsrlfR8XAWHRqVKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwJE3Vkjzh%2FLDtbeXYq3AM7Uy5oEmElhnLESj2iti5cb0sf0Z0INF%2FSz1aN%2F68V2uEOY%2BYrxQClTcUFKgt%2BUPAg7sgSWHt5tT0mXkiTL5HWfea26tb83659fP2yt2eSko%2FwPlnlOAgtsM6HpnTzv4mdC6rwBOHXyxlWjyDr08VY68iB6B2%2BlFXa0PvYTWHjfUAh%2B8b3ZLfF%2B%2FsttgYdg8WrvzXfZIgbi3oVuEnmCJ60DorOm4HeoEuK8rZFuDwdzBOrRCxmXB5VdrhRl%2BPR0mH0ESFYxv2Fzuu91Klcep%2BLKJAkvdyI7Rm0uDmNPfpBz09sTKinrW2Sqjf2K9n13QFYbb0LStxP1ejuXIMUssPYqNvrr85VKgr78y%2BukM5zrAaO2mybS%2Fm8JH2tFp8yTGg2ecUb502F300vIzaYog%2Fs8WGBt8vHMInFNgIZrrgcR2PZu6eQJnOONYPikX%2BjXJu9J%2Bu%2BF6gQCXZlIH0OIsJ55ErQ%2BzLWYvvG51PW3gXBI2STu4u9AjSASsmckAR%2F%2BqxZOy8fIBiBgaCilb5T9dYQCxvPuK0d3b6nZSgGdZnAzxFyBhjYPr%2FKcgotOeOtmTFxOsLtSgHdVL%2FoHXxqPlzC5gmhsIIA2XFE%2Fweg9zPshC4Bf4OZxvLGhd838DDysMXOBjqkAc6jXsBfxW0pdzozEa4FpG7FmxhS%2Fkk6iRuNKsc%2F5INTmaeLCG%2B9gCIyqLF7cml9OGa%2FI6AnY932JshuPNPBL9trprePBk4cGs9Nc430x8Qf3ldaRqdUznBoFEoHnsmvpqySfquM4c7LFJijAmSEbywvdws1wS13tQR12dqdhkEk1PVmMoZycUIevbLjCCXek9oR0QdusXmeWvP3HEHYLL%2BsZ1qo&X-Amz-Signature=61ab2c440dbdee28c065ebebd612a4c524f3c2d842818edc058a237c9d5b99dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

