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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XPCTYDR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIE1I4GtEiJJWJOgyFRYHkeKmk8sHzb0dOp559VQpYA8QAiBDEI2XcdcFMZGuoGp6D7W4PpoH7cI8l2x%2FbNfTU1v3OCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM3Q8KY4%2FpWUL%2Fmx%2FXKtwDPspN3uDPzzqFDVWsyUQeNfE3UcbEZfWZlzaYKBiexOIf%2FkGSqwayxWGLoyxFQh5RTunuxDnRMaQuTDgyVjUEU9Sryra6DUSawdQFYfprYghsCJSWQOJ372Xoz2dGbIdnnugJtmjodb4DfeNaA%2FUhv2dKEPyyvAzyJSBmr1DuvoYDMP8SwN76aNcaDGLosZv%2Bb2UTqYhI18oK%2F2GCm5GR%2BkO4TDJXpFgtbvqNix%2BfrV5s%2BtGwezw%2FciAvBAu%2BdFJyL99nSIp0GXzPodkU9s6kPHdpwpOqGvVah1n46zhsP%2FvjGY4WiCE3h6nN%2BCn8EPCckPwjMahSakS6YYlU9P141NSS0PBSxYLKi7Q0GSlVqgcTxMYUUl7vJmuebcpBk7kTsW7KNhpZq3vNXQLIBtW1dZdAuNDYChGVP%2Bfr7Q7LlhG3lXDfd0TRADyN6aZeYwG8NyR%2F1G4XZsKgK%2BP9fSIXVceHV5ct%2FX42XpdQ8NQ88cLi6zOO2aVixixgenmWWrdfjycJrDuEmVW5g2SB6pkI90q9OxKnhYUr0tVM56z%2Fkq1AifXGRPfScLeOgLqGV6Fy6VoFDDanRGaHu8Ab59dTpLGjDE7mQJM4aRuuXQvlYpbPWtWSXz%2BCb9Mk2akw2Lz0zQY6pgHhHAE7R%2B7%2B9argPW9pldF7Qryx7bw9ANKdC8IV78BixlCkmp9J51PvBAy8e%2BTfzZcP7qtsKcIaw1ED5VpWdO6n6kP6ZwTJ%2Bs%2FqrrUAJWd%2FYI3iVrUN6Qk2S3asKnhd2ddAkE2vsur%2BbGd%2FexShs7E0GnrqcZAS%2F63rX6bQ91jMjvLWxPndUjkTtL6ygA2lXk9l6rDNqT6eBNLHQCwPYu4aSUrOQ2jx&X-Amz-Signature=49a27009682c855d4bea410486b1b216c4a91eecef3b964806d14ce850356efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XPCTYDR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIE1I4GtEiJJWJOgyFRYHkeKmk8sHzb0dOp559VQpYA8QAiBDEI2XcdcFMZGuoGp6D7W4PpoH7cI8l2x%2FbNfTU1v3OCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM3Q8KY4%2FpWUL%2Fmx%2FXKtwDPspN3uDPzzqFDVWsyUQeNfE3UcbEZfWZlzaYKBiexOIf%2FkGSqwayxWGLoyxFQh5RTunuxDnRMaQuTDgyVjUEU9Sryra6DUSawdQFYfprYghsCJSWQOJ372Xoz2dGbIdnnugJtmjodb4DfeNaA%2FUhv2dKEPyyvAzyJSBmr1DuvoYDMP8SwN76aNcaDGLosZv%2Bb2UTqYhI18oK%2F2GCm5GR%2BkO4TDJXpFgtbvqNix%2BfrV5s%2BtGwezw%2FciAvBAu%2BdFJyL99nSIp0GXzPodkU9s6kPHdpwpOqGvVah1n46zhsP%2FvjGY4WiCE3h6nN%2BCn8EPCckPwjMahSakS6YYlU9P141NSS0PBSxYLKi7Q0GSlVqgcTxMYUUl7vJmuebcpBk7kTsW7KNhpZq3vNXQLIBtW1dZdAuNDYChGVP%2Bfr7Q7LlhG3lXDfd0TRADyN6aZeYwG8NyR%2F1G4XZsKgK%2BP9fSIXVceHV5ct%2FX42XpdQ8NQ88cLi6zOO2aVixixgenmWWrdfjycJrDuEmVW5g2SB6pkI90q9OxKnhYUr0tVM56z%2Fkq1AifXGRPfScLeOgLqGV6Fy6VoFDDanRGaHu8Ab59dTpLGjDE7mQJM4aRuuXQvlYpbPWtWSXz%2BCb9Mk2akw2Lz0zQY6pgHhHAE7R%2B7%2B9argPW9pldF7Qryx7bw9ANKdC8IV78BixlCkmp9J51PvBAy8e%2BTfzZcP7qtsKcIaw1ED5VpWdO6n6kP6ZwTJ%2Bs%2FqrrUAJWd%2FYI3iVrUN6Qk2S3asKnhd2ddAkE2vsur%2BbGd%2FexShs7E0GnrqcZAS%2F63rX6bQ91jMjvLWxPndUjkTtL6ygA2lXk9l6rDNqT6eBNLHQCwPYu4aSUrOQ2jx&X-Amz-Signature=49a27009682c855d4bea410486b1b216c4a91eecef3b964806d14ce850356efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMUQ3TAK%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGB5z8JynE%2F6HeGILeY8H4chpCA7ecV3e3XQ2FAV0SC1AiEAgqYXDdyQZdCboeQU8vrv0%2Bq8%2BshRaJmSwZ6pDqI2tHMq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDPsmtXMrXA7qSMvAcCrcAzzmwCj2%2BibFkqIrC06vTRDhN%2F5bIlum7OuEFAXyBnECddoiXe6DfzSH%2B19cZJy%2BHquRXMHMDVPJzZtfUeteWZKwyKJRB7jfQz27DkmNmhMWH8ofa%2FPFbCd%2F3eWIYBQ3een1YU6c8LWfYZ99VGXwLOZC5CWS8YCrE%2ByEiNvJ%2Bv2aWyRJNOCTBlsJygP13PH9JOe1S%2BtVcpEfmMjDL%2BtAnazkNWcVyz6V4SIjtjunEOeDqEoqWw%2FO6tZb7Rrd%2Fi4HlwQt9Sal0wUPfT%2FtULazYM8F22Cq3A0%2BxUV56cZ4GTiwBpgU%2FUXBGzsMzxtMG5SFgk98aRYeCOczV7Mogt89xQO83aQgu72flAAEc2pA86FjY7IlHXJ2eab5BO6H7t3aSVCk2Jfx%2FnXsHUDWndnTFMDctTmtu6OOqLrjibisQm4ftIHItGPMr%2BZXfxusoybW2CBNBF15UtyKKUyFbXGxceUWvrS4JIZE1WvHLy7WHK2VSQA%2BBL%2FtMqUL4woUQpVv2%2FhjMxWiY1XK6HQMM%2FfwnftuW9jT4%2BCbndrAgy4ri3SgGaUbhQgpG4Z%2FKWAy9aWvQLJeC1IBf7lARlcMAqy5UB2jwYzCIDL8ad%2BwTd%2BLyfugwmb5GwF4i8kLWGlOMMm99M0GOqUBKwqzTUXkv%2FwLIrjOGPisMszaqWvq0JgTSeHChWI8PqkZSXWnOZVftVyr0n2oCiV%2B%2BBkQuc07Jw%2FLdM0hfG3JMqLkhaF1NCbfEcbub8%2Bo3VgqnmIXmxFCArDxkjwv9ulGoASFjNXpuyRKeTFewDt%2FFzwnQegYQTVe%2B1GqngY0TkQEJhzRVvsKUPhUy7NnwVFJ%2BaQ7meqZCPbBG07R1s36Kh3Xv9xQ&X-Amz-Signature=8b3e3fa33e2561acc6c13902c892abc2e330a5a123b72adc088665af5500700f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USC4HUYQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCv7R5IQyFa9FlMOAkwcP7jD6QuCISo3Nz3VVMa1R82%2FQIhAMvRkNPW5r7vfkISMlziOHlhMfhxqi%2Fcn8oQ8kQ6XyI%2FKv8DCDMQABoMNjM3NDIzMTgzODA1IgxEedRqM49TCHEuI3Yq3AP61svD9MoMHAJi4%2FdYqdIPAaSdDCeFThuBt9Mbkw%2Bk0S9ih8bYeXO%2FxadKyJF0BzEi5j%2BFRboISq7tcXBO7XaiAPSjKLHBYeRKPgztZ9KpZ6ayEx892yB0NIU3zy8waCrDDcchlxkyAkRBG4Dm0oPitcoHOlZyGg7HcFtKJ7XVGKNimPpuERpSpyKWMRFXLNzRrJO6lFZcl4nLBJf%2FV2r6DFYg07SFYQ33GIFbWq28ydDdTxXb4IX7itvovBd0YloF%2BTTv9WSlXviJ0lrDVHK%2Bre7402HYiZ1cMceFdBcG5AQJivFtQtGDDo8P3okH7x2ej9fE1Jjnmqymx3cjPp%2FbirWVPcUhsWUwG6gdwJ8rMHupUv9kumNmDPPdUIje51LTWMI%2BjOTndkByJYt6RXRzd%2FubicqhFTbz1haeswz54oZI6cT8hFWvOeIsol3GaRYyuFqzHPPqHzTixPCpb2zvkUsBPxmfv1Hwdpy1nVQd1HI9VuH%2FDb3Q3%2FIucwzt2uZ8wVPVvH6WLDFbIAU6rCKDwyFdcgqISaZZ1WAi6AuwqcT18u%2Fbgy7FORbFh5%2BZOHbCy0Gu9X%2FIuR1CYfLmyIxpulh%2BYw0ky7EmthbA4vmVnNPKygecodVmVImZdTCXvvTNBjqkAY3nZKdbRd3iJrX61H5FZpE94Btv5lkmAtWsuwsoj7D1E2taL4D6beVzaYL6e88Sa4ZePB2iX%2FmisKMxPlCnx8S5ylPgmyv9l882hSruprbrLb%2FLmdsZkK8YG7STEMT5Dk9%2BnQveLmw1Cd%2Bf%2FbRisH6TJF7T3gWSHXhY2ER7PMFohlhNyS6GXNeR5Re3MX3eLju6E6q2s4b8MbiRCyn6SucVfcjZ&X-Amz-Signature=888afbff6ec1af1be894424e8ea31177cdeaed5a7153c002c1efeaac577058dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USC4HUYQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCv7R5IQyFa9FlMOAkwcP7jD6QuCISo3Nz3VVMa1R82%2FQIhAMvRkNPW5r7vfkISMlziOHlhMfhxqi%2Fcn8oQ8kQ6XyI%2FKv8DCDMQABoMNjM3NDIzMTgzODA1IgxEedRqM49TCHEuI3Yq3AP61svD9MoMHAJi4%2FdYqdIPAaSdDCeFThuBt9Mbkw%2Bk0S9ih8bYeXO%2FxadKyJF0BzEi5j%2BFRboISq7tcXBO7XaiAPSjKLHBYeRKPgztZ9KpZ6ayEx892yB0NIU3zy8waCrDDcchlxkyAkRBG4Dm0oPitcoHOlZyGg7HcFtKJ7XVGKNimPpuERpSpyKWMRFXLNzRrJO6lFZcl4nLBJf%2FV2r6DFYg07SFYQ33GIFbWq28ydDdTxXb4IX7itvovBd0YloF%2BTTv9WSlXviJ0lrDVHK%2Bre7402HYiZ1cMceFdBcG5AQJivFtQtGDDo8P3okH7x2ej9fE1Jjnmqymx3cjPp%2FbirWVPcUhsWUwG6gdwJ8rMHupUv9kumNmDPPdUIje51LTWMI%2BjOTndkByJYt6RXRzd%2FubicqhFTbz1haeswz54oZI6cT8hFWvOeIsol3GaRYyuFqzHPPqHzTixPCpb2zvkUsBPxmfv1Hwdpy1nVQd1HI9VuH%2FDb3Q3%2FIucwzt2uZ8wVPVvH6WLDFbIAU6rCKDwyFdcgqISaZZ1WAi6AuwqcT18u%2Fbgy7FORbFh5%2BZOHbCy0Gu9X%2FIuR1CYfLmyIxpulh%2BYw0ky7EmthbA4vmVnNPKygecodVmVImZdTCXvvTNBjqkAY3nZKdbRd3iJrX61H5FZpE94Btv5lkmAtWsuwsoj7D1E2taL4D6beVzaYL6e88Sa4ZePB2iX%2FmisKMxPlCnx8S5ylPgmyv9l882hSruprbrLb%2FLmdsZkK8YG7STEMT5Dk9%2BnQveLmw1Cd%2Bf%2FbRisH6TJF7T3gWSHXhY2ER7PMFohlhNyS6GXNeR5Re3MX3eLju6E6q2s4b8MbiRCyn6SucVfcjZ&X-Amz-Signature=9e47cfeb9dcac590f28a91a712f84aa773de8148be21c615be2ff2bda7eed23d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R56KZ6JN%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDzvSijeVjzjArQGHzYsJDJo%2F9UyF64sG0U3xucURUIQQIgPTKlZfTWmyZR0Vr9IBryfAVG3mgo7y5jRNKEJC9DelYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDELwBBfmqPWThLml0ircAyIZcMZ2mrFHTAhPr%2F1jnIowQwIMkX0GsQhbohmLUpL8l7EuiE2zDfKMVXSAD9iKUTqczRRDU6EyyJvkxEyiHPZvQRTo13Tu8RyenRH2z8kmId9VzZhn%2FcrSmCzYcpx66coNqEoMsDBaMI5lUlbqqnapXxzrsGdFe2hSzBpirRHQDSMIsc6vHplf4Jssc%2BY5nLXk6oWGsWew6a2ScrpUYLawDMX5TtF0hcn0UNm88Mf0sg5RMg9%2FQFiaNMeC821TpiylzweLZ0mbXUvXtWelvhuljO%2FYOY5Yfn%2Fc%2FmWL4E8W1zWZzHhRbUwXfUJtIbMMjtpC167CWVYZFJ2JKZU1fMhYrWpbNnQ1cu%2B4TvLWmdbU8qbcwuGCkk1wgoi6JXM%2FOlpCRHkoS%2FSoxWvmVYgyQVYnHkWUuU5qKHkF4qkoRb00pVI%2B0R17p4jhD2JT4phVFBF5pPrr6Rt%2BYZko98Tw55y35UGO%2BXh944C1fidyD%2BSKCB727PzkiQPquuzLhCfLZA1QiYRGKGYKUAHNlNYTRu%2BsFIp8eBUNaTtDPnAT2l976TvHESjjB2aSvmTrP2AsqROTqcUdFUgZak6DwimA2fEBoUwhmvxCGUArxy5lQlc6SgeQZlMDAJXodZKoML289M0GOqUBrmTNqrYT1acQEdVyQRs0VhXUQk%2FhJKF7%2F%2F%2B5fcOsEtDkzJBUA6KPq4PXRIw5h88n9a8WnPeMMB5y%2B5oUBJvF6z9yNhqkS4e3dY4EPIDeCSvT1Zw1YtH3DFIP76CtTgJY%2BYb9Tesi%2B8T0tP%2FwqgSHAoFuFt1myYO1rioDesENlGuPTZIdz8PXVtYdP5yyp%2FWkvsu5dUg9wGgijWKWOxiB5ZihxJgc&X-Amz-Signature=44e55ee39c0c415ec8a1d28798791c5e65b07f588a1942a805e6638b9b417679&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEXCVRUR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIHJb6m%2FwRJZlaZ86W8%2FLzUMEIdShB4b2nsOTHZodmXjLAiEAuVHyUK5om%2FcZS4mHJLqvUa%2FiTwL4bADPYWryZfNgfhUq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDHMaicFMLJAir0bsLSrcA0UM%2B5TGMs0w1Ib6xBnV2HssgJzezJpA4S5JUFOcw1Z0TLPE7pp0xB%2FyXHgK8H4GkNJ9ss5GZj03zQzepNxXRHOik6QiTKmG4Db2nIcUVdLLD2Zs4U9q3dsZDaDqZhGiK8sfhb30I5e0HWngO5d9gHYPQmOEw8DrMbbMvmHvWMs0vkCRdl6%2Fwzt9bEv%2B%2Fjcn%2B0GQLr%2B2vE8UDIYChG6yIeqcc%2FxHyhAC13%2FF8RLu9DjP0qkS9zoySx9I%2F%2FSRVsZCOSCQtfzdttFE8APfPDwWc%2B0dxd7fzfxX4mD%2FnpshPH84v5GyT%2FrZv40s2pcE8QHPYan3fs%2FYwf949ZgH6zu96uN7eFL4iQEhvuQw7Jgx1Ft2VuUHGZ0hSet8ucYHDT83aFmY9YYKVqkQBkY5J9cdEP6yZFon2gaC7%2Fcyw%2F5qSOnZYDSFgeZtS6NUvhHZw3wyFDGqK%2BS%2B5nTj%2B7zLHBOYikLHmX%2BClvmjIShwpQIyoiynOQXczbhg9lJXTEVQwlAH8sdNN9jm%2F5xmCzUTKtyL6rhOQBVthAqAq5V2llaFdseqk7mBnMrHBEGUX1EC8MQ%2FBKFqi6mOkQhSkPWtvFL3QQLEUAdcB4NZmu%2FwdtPx%2BlRkLKh1qHjTfnDrEBkZMKi%2B9M0GOqUBB7gJSdea2%2BT0J3Z6KobCqB2m3K180dh5R1X3ZODIBZK8Y5CkjIXXzSeZq3d%2Bwu8FFscdRA1BU1fR4RRWB7u5Ecw1msrXLT%2FuYY578GMtg96TReuhfEy0%2F%2BpMQwexwxZ1BtFGlOcrsXSCwoXHgd4utYimP%2Fgl5HCubhst0ogxSXZ57BCTCx2s7UVsxYZfIaHCfReX%2BwdONZQATEWtphpi3Zx%2FQb3C&X-Amz-Signature=e20570ba6d5f63506be3eb183a71abc7500ac2d7f94421988ebdf9b6f82ea593&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBM6SEQN%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQChTrRkmFoGlzjujg2xxNDmkpRzKG6dL62GLPDPq2JxwAIgM4mDuY4EHGtu1GZl4I3n5%2FI6UaDYWrfW%2BYbDYZEqgC4q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDBn1ayh39%2BhQaKnciSrcA2mtn2IuALgwVCsOzHFOF24EMZGGzuVjIkFpGvlaGQQzy9G2ztRvb5JnH5m%2Fp%2F5sL%2FDLNKCT55cOXeT%2BY8Q%2BMbczu%2FbT5qrXyGU%2B7MidLvyBx3x6e15wQRdme6VB08PxK5MedsRSmwk6tQARvGzcG1PURw388ZUuO%2BbfwuE451BhHEgM2%2BZXQt6baJZWP2oj5y%2FaPPNJt%2B8I9JVwgGjeN92nCPGpSt6j2eLci4n868dMYqCqFsgId%2FYVfAyUwMcBb1PQlLJb1b6ZV3%2F5pQBtn5Dd2cYRSIetnVLGOap6Ubss3oIFnOEfgBYRaFufLqOlMSLo2Ulx0auiCM%2BpsiSoB%2Bs1jZdxUQES%2FeOZMl92G8wGH%2B9qLmhKX4WbaEcKF5jTL00W7SrF5SVaapBs4efP9yCsMLu1FnmnX2YlwAvGvG4HmH9eFFzmiByWxT15MPdV0daKSmWYMetN2s%2FhdQvXCBxhCr1TvNyd1ZEiG8tJDN0s%2BMP19W7x29OF0HqnsoU%2B86CCpp9d0sXhPhaqO18cFcd7SjDQDEXvAPfvR0XwRnEo136N2FbciXabmRiWj5N3p%2Fn%2BZLLI3gxn9A4KaSZ%2FSP8ev3Sk%2FaN8T7wVozovPV%2FzHqmnV28JkqDUAw%2B9MPy89M0GOqUBgRMZnPhUFF7GoxU7aEL9d2aRVRjnamZBiHuv2TDaw0uOzin4Rf%2FtpyR9CRI30K7eSsbSH4GJFSdj1pK39cdc10lsTYPnYR7Edw4iiGUG%2FY2LELLrUlUE2Fk3YIuuWO1nEiKdhEBH8XKQrUwuCJSB4vMFBoghAaMOie4xJhHEfjhjpgHIWGEYfnzuev32ZVcB4wFbTtveJhgpYugld0dKgfHL%2BNoz&X-Amz-Signature=0d894249a3a6319e6e3016ffa8fceba97d83a3c73a3d799fbe3a716e824a486e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS3A44PM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHlctMuDyPcsfLirRX8CVBart5xpNerc2Y7Or5P2PONPAiB0v0wD%2FsZpKaJuNpTkP4UnSsTcNTDFsogo67nxZjz80Cr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMgeh3rfvWBTCD1oMhKtwDuGSkxrGB9c48XqyGdK5hsQSDAB6xJ5ol9imgE2ZHDUUxA%2FkxS6bYmWw%2BLPJW9A3FoK3EKoLsBsW3Xafb7QIh3%2BJOQvj9U%2FlB1BKK%2FiOcO7qULkXDbTl%2FfVRcKMikrbJJGQzGyxTlQmbmpdChhEeDGwBcbphbCWV5%2FHPihNPRo%2BunJ%2FzLqimInKlXvO8hNL1vZh7cGIG4CVQS8K4qUoJWMVwAbyQlx%2FCJvu2q1Nl%2FoBIZQhMFwPiiMJYe3zgP2FSmrYgKchXZCDM%2B90LJZrIh2AIBOavQ0sM4SbiFOfJOddHhG7%2FopKp78rcEKar2JDiTmqpDUc%2F%2Bgyj3iq2Q5F8A5DOBsFEA0hYwfFLtTEaI4XzvVQ1gNKbefRubZdyeq3zZ96JBJXk17jCbduwbzuACIq83c79Nt27dP3AHXVTLmz1zC8Lp%2BwjuIMXDcjAZxpcCfq%2B4YXae%2B11uK1n9ekmG0JLg2v03U4wY%2Fza%2FMTRBFRJl%2BspueTx2bhRT6bjdK5EY4j5nDFVplA%2BoQuHnoY8CNcSZ2sy5Z03CqKVowUAcJgcThREKz3roVQ4dYgY62JWf%2Fh%2BeUvZKcq3tpYVpKzqGDrdwVohHSzlU43cSk%2FJPaAMLy3tpuDSNUcgjkAkwmb30zQY6pgG1rCJPvbC4uNVAWLuT2%2FPeoQatalacnfhYqQlrWx6Z5Dz57LMWW8WS8VLd5spFXrA6biPM6jF8%2BCQ5bhXlE63pMJ9KpUTFH38e3hNMFvIPk9NuxuM0py84r8TEEJYBtZKgH%2FHB%2Bk%2FlajWl1V6iiWjnHt6tauL2k0qeDp8QgGXKAXFdV4G51Vku2v9Y6NqD25gpOqMQF5xjMUnU%2BFMAvoFFENtwJI1S&X-Amz-Signature=9281d17f4edac38b11637b68a1fe63d8a823e6048bed1ede8c086f81ed0383d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS3A44PM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHlctMuDyPcsfLirRX8CVBart5xpNerc2Y7Or5P2PONPAiB0v0wD%2FsZpKaJuNpTkP4UnSsTcNTDFsogo67nxZjz80Cr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMgeh3rfvWBTCD1oMhKtwDuGSkxrGB9c48XqyGdK5hsQSDAB6xJ5ol9imgE2ZHDUUxA%2FkxS6bYmWw%2BLPJW9A3FoK3EKoLsBsW3Xafb7QIh3%2BJOQvj9U%2FlB1BKK%2FiOcO7qULkXDbTl%2FfVRcKMikrbJJGQzGyxTlQmbmpdChhEeDGwBcbphbCWV5%2FHPihNPRo%2BunJ%2FzLqimInKlXvO8hNL1vZh7cGIG4CVQS8K4qUoJWMVwAbyQlx%2FCJvu2q1Nl%2FoBIZQhMFwPiiMJYe3zgP2FSmrYgKchXZCDM%2B90LJZrIh2AIBOavQ0sM4SbiFOfJOddHhG7%2FopKp78rcEKar2JDiTmqpDUc%2F%2Bgyj3iq2Q5F8A5DOBsFEA0hYwfFLtTEaI4XzvVQ1gNKbefRubZdyeq3zZ96JBJXk17jCbduwbzuACIq83c79Nt27dP3AHXVTLmz1zC8Lp%2BwjuIMXDcjAZxpcCfq%2B4YXae%2B11uK1n9ekmG0JLg2v03U4wY%2Fza%2FMTRBFRJl%2BspueTx2bhRT6bjdK5EY4j5nDFVplA%2BoQuHnoY8CNcSZ2sy5Z03CqKVowUAcJgcThREKz3roVQ4dYgY62JWf%2Fh%2BeUvZKcq3tpYVpKzqGDrdwVohHSzlU43cSk%2FJPaAMLy3tpuDSNUcgjkAkwmb30zQY6pgG1rCJPvbC4uNVAWLuT2%2FPeoQatalacnfhYqQlrWx6Z5Dz57LMWW8WS8VLd5spFXrA6biPM6jF8%2BCQ5bhXlE63pMJ9KpUTFH38e3hNMFvIPk9NuxuM0py84r8TEEJYBtZKgH%2FHB%2Bk%2FlajWl1V6iiWjnHt6tauL2k0qeDp8QgGXKAXFdV4G51Vku2v9Y6NqD25gpOqMQF5xjMUnU%2BFMAvoFFENtwJI1S&X-Amz-Signature=b717a98393c5e717b4b98c27d56951012165dc4b38b75b6b8566e54fe84ba68c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FQCGOKS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCeZlEDv1cUpf73o02dQF9s5LBgc0ActbaUIJOFBlyR9QIgWa%2FZF98RprY2APsPrjRhJfV%2Bt%2BiLpNJlbuD97Rpjvowq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDKiV8c1bR6N41GHh1yrcAzumTjfu1l4%2F4R8quePfw%2B2J3qQwKTpvQ4ljIo15XTenZv8sU6VdU7AjkLj5rrf1f3jtjDQQyxBSPJCETU0s940kN9Zgt5IraHUKsGRT88gD5xSczP1rQO5pW6%2BwpyBp7oAmQvMHn%2FCGdtSHsHhlUkXfYjDGvPksjWEVzkaJA4dpnbjMeSWml2UPmjUm4Hbvo%2F9GLeVK6jnSFz70wXqLSvKCAhagVACmpBofRyt1f68XAQhE%2FWwuh7Na3vJm12heC2uFRL1PVufKe%2B0swwsRuuXkIDedVJJQg4E70SnOtE8P50%2F2BOIHv1EQ5BTbsS%2Ffo1jTrbnh60dQDW2ESafqTJyQiFAEcVukg3Yp3PwWwLJrb4rcJaDKumSdhjp72QyFa%2BZarpmDohcpLpFdv%2Br24cGi5BoikP4s3Z8nGQ4%2B6FGfOeVcCHB1HdcqscAiANyO%2Bg90dK57kILcWJma7S9QxKvihUZrXqSHLTrmDSLQmXpFOhHhr3CXfUy7pml2kQbzpohkNEb2yW%2B760MevcK2R9Oe5M6%2F0nV7%2FITmEYN4IM7uvpgiYZvz6A28tvG%2FUnodjnm1I7hlj7S4WlmC4Wa6YC4a7vkb9SwMkR4MFlVhTkhfnyUXe9ANGCrm3PhVMPe89M0GOqUBhhpowljb916CgNaHU0vcXmV0I78vuvcGITkxVIsA6vIIo%2FB9ajSi2v0T0ztyH2xVQmOrXOBBdzYMzF66nGYbG0lAL76Eq0IIF0ggAGHJNzEwJmAdGg8wP8KVSljr%2FUpVGt0vFbCzn1hvTPG%2BMOqB3L4z7Spvtxjj1xovt5AFbR0COc%2FUliyOUSWb0HtKtpuJeIOjWv%2BG6Li1FDZmX2O%2FV5U75r7%2F&X-Amz-Signature=68954e70f76039075a7266175fef3871aaf03dadd58e6631b7b4655340d52595&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMUQ3TAK%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGB5z8JynE%2F6HeGILeY8H4chpCA7ecV3e3XQ2FAV0SC1AiEAgqYXDdyQZdCboeQU8vrv0%2Bq8%2BshRaJmSwZ6pDqI2tHMq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDPsmtXMrXA7qSMvAcCrcAzzmwCj2%2BibFkqIrC06vTRDhN%2F5bIlum7OuEFAXyBnECddoiXe6DfzSH%2B19cZJy%2BHquRXMHMDVPJzZtfUeteWZKwyKJRB7jfQz27DkmNmhMWH8ofa%2FPFbCd%2F3eWIYBQ3een1YU6c8LWfYZ99VGXwLOZC5CWS8YCrE%2ByEiNvJ%2Bv2aWyRJNOCTBlsJygP13PH9JOe1S%2BtVcpEfmMjDL%2BtAnazkNWcVyz6V4SIjtjunEOeDqEoqWw%2FO6tZb7Rrd%2Fi4HlwQt9Sal0wUPfT%2FtULazYM8F22Cq3A0%2BxUV56cZ4GTiwBpgU%2FUXBGzsMzxtMG5SFgk98aRYeCOczV7Mogt89xQO83aQgu72flAAEc2pA86FjY7IlHXJ2eab5BO6H7t3aSVCk2Jfx%2FnXsHUDWndnTFMDctTmtu6OOqLrjibisQm4ftIHItGPMr%2BZXfxusoybW2CBNBF15UtyKKUyFbXGxceUWvrS4JIZE1WvHLy7WHK2VSQA%2BBL%2FtMqUL4woUQpVv2%2FhjMxWiY1XK6HQMM%2FfwnftuW9jT4%2BCbndrAgy4ri3SgGaUbhQgpG4Z%2FKWAy9aWvQLJeC1IBf7lARlcMAqy5UB2jwYzCIDL8ad%2BwTd%2BLyfugwmb5GwF4i8kLWGlOMMm99M0GOqUBKwqzTUXkv%2FwLIrjOGPisMszaqWvq0JgTSeHChWI8PqkZSXWnOZVftVyr0n2oCiV%2B%2BBkQuc07Jw%2FLdM0hfG3JMqLkhaF1NCbfEcbub8%2Bo3VgqnmIXmxFCArDxkjwv9ulGoASFjNXpuyRKeTFewDt%2FFzwnQegYQTVe%2B1GqngY0TkQEJhzRVvsKUPhUy7NnwVFJ%2BaQ7meqZCPbBG07R1s36Kh3Xv9xQ&X-Amz-Signature=7d50d7828c481adc0aa37448904249b677f9ff662641f9a3052582724d31af7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMUQ3TAK%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGB5z8JynE%2F6HeGILeY8H4chpCA7ecV3e3XQ2FAV0SC1AiEAgqYXDdyQZdCboeQU8vrv0%2Bq8%2BshRaJmSwZ6pDqI2tHMq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDPsmtXMrXA7qSMvAcCrcAzzmwCj2%2BibFkqIrC06vTRDhN%2F5bIlum7OuEFAXyBnECddoiXe6DfzSH%2B19cZJy%2BHquRXMHMDVPJzZtfUeteWZKwyKJRB7jfQz27DkmNmhMWH8ofa%2FPFbCd%2F3eWIYBQ3een1YU6c8LWfYZ99VGXwLOZC5CWS8YCrE%2ByEiNvJ%2Bv2aWyRJNOCTBlsJygP13PH9JOe1S%2BtVcpEfmMjDL%2BtAnazkNWcVyz6V4SIjtjunEOeDqEoqWw%2FO6tZb7Rrd%2Fi4HlwQt9Sal0wUPfT%2FtULazYM8F22Cq3A0%2BxUV56cZ4GTiwBpgU%2FUXBGzsMzxtMG5SFgk98aRYeCOczV7Mogt89xQO83aQgu72flAAEc2pA86FjY7IlHXJ2eab5BO6H7t3aSVCk2Jfx%2FnXsHUDWndnTFMDctTmtu6OOqLrjibisQm4ftIHItGPMr%2BZXfxusoybW2CBNBF15UtyKKUyFbXGxceUWvrS4JIZE1WvHLy7WHK2VSQA%2BBL%2FtMqUL4woUQpVv2%2FhjMxWiY1XK6HQMM%2FfwnftuW9jT4%2BCbndrAgy4ri3SgGaUbhQgpG4Z%2FKWAy9aWvQLJeC1IBf7lARlcMAqy5UB2jwYzCIDL8ad%2BwTd%2BLyfugwmb5GwF4i8kLWGlOMMm99M0GOqUBKwqzTUXkv%2FwLIrjOGPisMszaqWvq0JgTSeHChWI8PqkZSXWnOZVftVyr0n2oCiV%2B%2BBkQuc07Jw%2FLdM0hfG3JMqLkhaF1NCbfEcbub8%2Bo3VgqnmIXmxFCArDxkjwv9ulGoASFjNXpuyRKeTFewDt%2FFzwnQegYQTVe%2B1GqngY0TkQEJhzRVvsKUPhUy7NnwVFJ%2BaQ7meqZCPbBG07R1s36Kh3Xv9xQ&X-Amz-Signature=7d50d7828c481adc0aa37448904249b677f9ff662641f9a3052582724d31af7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LA6OFF3%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T102453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCOSm7mdpYcKVwwnJyUQ8%2B97Wa%2F2Ai3H2WPe0gNglSWsgIgN%2B%2FA6sI6SLxk06VTNuDTJX0g%2FF1cjD4v4fe464S%2Bls8q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGAbgrF4OvQiQcHDTyrcAwRAgun1HFDd%2Bo3phP4MLBowsX55BNRuN9j9Egy0ezMuTKyxRcnt9IphvHOP2fTCvJMqvLkqQ9kIbJ%2FnknVhEl%2FKE49n5v8zZwRQXzUmogzhra2Mz5zP31f569WrCddV4jlOf2DVwHPibCJObgaqAXOKV3bZCmNEBIdBtxO7Xswnj4u8qHhXoG4UFKoMKh%2FD%2FL9nY1b%2FFKhkKe60Ulaxr%2B8D5Ao4thgrz2A1s1MIKTZ9MlaGyCAWFt1079i979fMkb1D0%2B8G2Qj6DwVJOf7MDMNOIorknYMGaWQL%2FdebpiV6rYxcmDgRszqnWI%2F6JXagOoQK5zmw0Jj0Rqq9Oh2ni74%2F5Nnmx8mVOUvZxuQewiOqGmNuG2T%2B%2FulROJ2tWzXXPcx%2FtEZMIVms2WVeYJqjeme2VMKjFVL1NHH15ad%2FClZha58thRn8shuYeOtkCPd9y%2B7ymz6D8LrlF2KSIgsN0krmPF2qGpFjm8I%2Fkt6WgkcMRhz1gsmkMMnxWn4HoiccqSbcWHxi%2F27P0RRabAwf752SMVS%2BazSw9jGIVQv0JOlfGOtclO6L1mN9ko3ZlhNTvY5Bms121ZitRIgq%2BYUYsjamAEZ79J7L14eCsloFzdL6eubYayoYgHHbyqOuMMq89M0GOqUBI7R95dLH1BqlJ%2BVN0niaXTzDkLwDHQzDyknnsBUzcQDDoynULkPAn06XhNW4M9yIrJV8kVa2%2Fa6zHq1BCuIkWFaJ%2FUqhAJwbiWs1pH7po7PEwwEa5UtL9z000nMJQYnAn10Cz7AuaC5MPHUbc%2FpGoZxETBxFuMozMXs5gih91JqL%2FHUOQYbmyUQKNYu1JXyo%2BhzFQQBh7xUkmoyvDtjlzLwsTHpf&X-Amz-Signature=4fe1f77d8f733dc229f7d1acbb4c2b23a934553acd7383475a3844450666d948&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

