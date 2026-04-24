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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YN66OAYB%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDsIQMmqhWJ3usKoId2Jn3ySfttUv1pK3bpCk1IDxLy1AiEA9QTzYRLGhsH%2FatrHwL8rdhgAU0KFKMoqmlj%2BQ%2FG7P7Mq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDOr8iK1VaCJZQgOMiCrcA4OqgYf0pUq0QlFdqU19EeqY%2FE8V8vDHbSzLk1pwihzKpd39xAIoRu6vNRd%2FHqlMFzoiMbRiBLHNybfCC20b1W5aWLSjDHYbEq%2BGMqkF3y5VZ%2FesDzTBVAKRYrZcQuNYgOT%2F7Ui4WBH%2FbuZ3vYS3phu72tfMCg7vB1Ec7v2ZowTSGvaqQemKh1htYsoRR26P73Tvl%2FxriYL2Vtb4OByuMxD%2F9WeFC9h3pLDeNKXgzUPSK9uP4MZKNjdI%2FP29Mpo8VjV9JJFfnkTkXOFt7BF1u32e5SsQkRPAc9c48%2BrUwO0wORc7w1vE%2BZFqr83OWjrWPWymebW1vE%2BtzNRYwo2Wp%2B1i90nxvdgTnNWTs9J6yMENThHO%2FQPvNfHSOH2zqBf1WKqBHb6pXntN%2BURNRvk5vM0Lknxad%2Bq4kt51RejraHqX01%2FOSZcDthLpbtNTEO4sayvNAFqdd82S8tAr9mnbsNhgLUjsJAbxV%2BSxGMK%2BzBd5zMlvO3wyVEBZ5FdcMwkxnPl3gusQDfD7l09Xj7vEvo84wD3fGZI805gQpMDBkEMNhonDfB0NQj6kI2l5mIqQTLEG3eRKfoRck1waS%2Breh%2BOawAuRsvnzcAojAKqHnc6WZwkLMPviLkH9LVu7MPa3q88GOqUB2nnbVMCBs6p4VMcWRkG%2BdxaVNurzt6jgBv7aRquDrST5dorzNgRZTm0yeAAWxqfOl2tAFLnkc6gTcnel%2FtywPj72xYCaGqWThG9a7has4zEcezLOcgPnjD0aZv5Og8lW%2Fkbv8uA1kVvMBkGvWDpEF4MyWdMCF0rsf3ybZB2z8lQuD0pd2tu39Ue7MQpMu274oIIP6ZP9bUoZU2m7g5bxZcfdKD78&X-Amz-Signature=35a36735fb5cf3986396391cf8f94ee751228e3e9d943c6e72357d19e80418f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YN66OAYB%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDsIQMmqhWJ3usKoId2Jn3ySfttUv1pK3bpCk1IDxLy1AiEA9QTzYRLGhsH%2FatrHwL8rdhgAU0KFKMoqmlj%2BQ%2FG7P7Mq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDOr8iK1VaCJZQgOMiCrcA4OqgYf0pUq0QlFdqU19EeqY%2FE8V8vDHbSzLk1pwihzKpd39xAIoRu6vNRd%2FHqlMFzoiMbRiBLHNybfCC20b1W5aWLSjDHYbEq%2BGMqkF3y5VZ%2FesDzTBVAKRYrZcQuNYgOT%2F7Ui4WBH%2FbuZ3vYS3phu72tfMCg7vB1Ec7v2ZowTSGvaqQemKh1htYsoRR26P73Tvl%2FxriYL2Vtb4OByuMxD%2F9WeFC9h3pLDeNKXgzUPSK9uP4MZKNjdI%2FP29Mpo8VjV9JJFfnkTkXOFt7BF1u32e5SsQkRPAc9c48%2BrUwO0wORc7w1vE%2BZFqr83OWjrWPWymebW1vE%2BtzNRYwo2Wp%2B1i90nxvdgTnNWTs9J6yMENThHO%2FQPvNfHSOH2zqBf1WKqBHb6pXntN%2BURNRvk5vM0Lknxad%2Bq4kt51RejraHqX01%2FOSZcDthLpbtNTEO4sayvNAFqdd82S8tAr9mnbsNhgLUjsJAbxV%2BSxGMK%2BzBd5zMlvO3wyVEBZ5FdcMwkxnPl3gusQDfD7l09Xj7vEvo84wD3fGZI805gQpMDBkEMNhonDfB0NQj6kI2l5mIqQTLEG3eRKfoRck1waS%2Breh%2BOawAuRsvnzcAojAKqHnc6WZwkLMPviLkH9LVu7MPa3q88GOqUB2nnbVMCBs6p4VMcWRkG%2BdxaVNurzt6jgBv7aRquDrST5dorzNgRZTm0yeAAWxqfOl2tAFLnkc6gTcnel%2FtywPj72xYCaGqWThG9a7has4zEcezLOcgPnjD0aZv5Og8lW%2Fkbv8uA1kVvMBkGvWDpEF4MyWdMCF0rsf3ybZB2z8lQuD0pd2tu39Ue7MQpMu274oIIP6ZP9bUoZU2m7g5bxZcfdKD78&X-Amz-Signature=35a36735fb5cf3986396391cf8f94ee751228e3e9d943c6e72357d19e80418f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAZ3XDWD%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BRpWtLaNYG87Auvd%2FRUbRW54I6IKzhxC3xNVmTfCubwIhAPZo%2B5sTzix6HXa3oIiMjJFSw8RMYyFLp2rudMPjCPWkKv8DCHQQABoMNjM3NDIzMTgzODA1IgzH6safBoi2uzK4h68q3APkhNlOKElAmsjFzpiOqZjjPBxbsWuBdOQF7WQpMcg5yRLnhasbItULl07UTeaeuXMCtpAasSI9ditualunaezNrOsJws7bx8zpHaKVvwvfw5fgTzIryZXjh1HoyxXFkq3pSpizIaslcNLVLvRg5J%2FJ7i6aZO%2BshvnAH1iZ1dpvGltuyFtwf5IcA52S6L4Kg3xCnymzqLbFjpG8VdsNeYfIt5cRz9wx31mS5ZnO22g%2BQMY0LQkYcstMw03jtXuM9h7PNdNjIiguBB1V%2F4M3HLGE3VNaf6wXa0k18YyClYRGgTEOEG0I7ujT%2BFuqAr073mL4qUVTtgo3b882OntA0xbk7KFw7dRRsBgt47TxilqoWLD5BfU%2BxhSBOnd%2BkabRIlsrUzbA5q15IbNsNxsxI0EySbxwLLQFnsFtwGO1XCh7OM8xm9wCvt3dEHtQaFUgOXTsmxqyvac8sUP68vMOVJvlbOLtWrfDomMVdoc6rPjD4q3OVNFS2T2CUbtGDAQs5PsBs4i6JYyXni1PwvPd6k95pvwjgkbxsqGpcXtIKdaEeBc6k8pjZMf%2Fyj02mGYTkG6gmrrAogWG0T%2FWGz0vLs6mo43BQuIM%2FN9daHtnY2iynKN3lB0g3ClpHfg%2FRDDiu6vPBjqkARBXF65u2CMWCKP%2BVc5opVQfsAWbS%2FY6I3oMC%2FZ8Rb3pMBue1gG6HOBI%2B0g%2FKxp2CzxnjTkiIk1Odt06FhkJCu5KQVHfawD8KaqLjQkUYFxXC2ofSG3PCp1eA1j1yOM%2BebOWg%2FnE%2BvUGSNpagiZO8BYu0R7zu7ije9Ii98Lc7VB4kbptveD%2F%2FJEhCSekMcBvjjEintjI06kzXXwM4tyMRDotbeEK&X-Amz-Signature=9762155ee32cad885eb3c39c6db1420191230684a98f1826d5ab8e940a54b4b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K5RGWHM%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5aan5vJLctbDACuGUGD0aej%2BS924i%2FiEW9dLPDy8IDQIhAIOmOMOX6jjV4KHFi%2FlpKpDRZcP8xS8kRHcJf7PGV%2BvUKv8DCHQQABoMNjM3NDIzMTgzODA1Igzf7wgJI%2BVRsW1sLJ8q3APwdiyMZWvlv8JPk8kS8E0XA0v7HwwEl3DxDHVoOcOVClMjNgGT2BeGdvs14wLSIl%2BLZedgVZbft%2BijSRZ8FycNivgAst5ReCmCMj6s5ewUUzFAJi959WVuVb18DTPLoWyTCBRFdgJNJB2OMv6NCew2tN5Rf%2FiNkjXyrwvxVgIBMkCaWbB1KNTGssqNL%2FpHIoM%2FQjlXoyY%2BlJruKVpdc3RdUom3nvFO%2FxqUhwWpYUnjLhDNO%2B4M4WEYOxw3Bv4rLr%2BbPbBt%2BXf9Li9hN6GaGFnW3WgNiZKyGdWKBB%2BJ562b8NEzz3tH%2Ft2xznbA9O%2FXOtKTnTOwY0AYRrS46EUZmJu8J5fJDVDTjROxe8j7LLI11flGDtpVj8vab8iJ5HVQjHBLxRK%2FJPEAazwM72GHElscTMeNjBuHN%2BUh3W%2FYztf7uJh0GH8eoIoZRQmw14DECDDmvD6P%2FiW0%2BxP5H0FQMqKPYpS5UpegcG33N7F9yvhPaYgTNPTmOvSGJLW9pp%2BnS2u0jTRAgWysdsU0fBXJBrMnWho42WCJY189T6ThhOJU7siDRjURQjxS7%2BGg1CbZR9F9THyAM0yYfAwSW66DjpCFQQVhs3hd0vjbtApYPowR6Nr4%2FMLfXyKwzHXRKzCdsqvPBjqkARLFyZ2Cd69kjz7mQ%2FFSXvlKlD7zX6jD3uflW8dRf41p4DaVghS%2F6rrb7mb9HFoBh79XaRBhTOTve%2BEkTVCUEpGCFP6ljnMSVjavg1VaU%2Bx2RJ8EdNilMAbshLk7CTL0InHpuehQp0QXs%2Bx3kGDelUlRSIgxWxUCvTg%2BVxZTGhodInOnvJJ2T7xyThAZtYIsK1Nl0%2BByiBHa0JKfK0J0uvgyJahy&X-Amz-Signature=63f7f7402783d65eb7f226176bc5b46e01bd518ef5cf370a033fae33011856f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K5RGWHM%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5aan5vJLctbDACuGUGD0aej%2BS924i%2FiEW9dLPDy8IDQIhAIOmOMOX6jjV4KHFi%2FlpKpDRZcP8xS8kRHcJf7PGV%2BvUKv8DCHQQABoMNjM3NDIzMTgzODA1Igzf7wgJI%2BVRsW1sLJ8q3APwdiyMZWvlv8JPk8kS8E0XA0v7HwwEl3DxDHVoOcOVClMjNgGT2BeGdvs14wLSIl%2BLZedgVZbft%2BijSRZ8FycNivgAst5ReCmCMj6s5ewUUzFAJi959WVuVb18DTPLoWyTCBRFdgJNJB2OMv6NCew2tN5Rf%2FiNkjXyrwvxVgIBMkCaWbB1KNTGssqNL%2FpHIoM%2FQjlXoyY%2BlJruKVpdc3RdUom3nvFO%2FxqUhwWpYUnjLhDNO%2B4M4WEYOxw3Bv4rLr%2BbPbBt%2BXf9Li9hN6GaGFnW3WgNiZKyGdWKBB%2BJ562b8NEzz3tH%2Ft2xznbA9O%2FXOtKTnTOwY0AYRrS46EUZmJu8J5fJDVDTjROxe8j7LLI11flGDtpVj8vab8iJ5HVQjHBLxRK%2FJPEAazwM72GHElscTMeNjBuHN%2BUh3W%2FYztf7uJh0GH8eoIoZRQmw14DECDDmvD6P%2FiW0%2BxP5H0FQMqKPYpS5UpegcG33N7F9yvhPaYgTNPTmOvSGJLW9pp%2BnS2u0jTRAgWysdsU0fBXJBrMnWho42WCJY189T6ThhOJU7siDRjURQjxS7%2BGg1CbZR9F9THyAM0yYfAwSW66DjpCFQQVhs3hd0vjbtApYPowR6Nr4%2FMLfXyKwzHXRKzCdsqvPBjqkARLFyZ2Cd69kjz7mQ%2FFSXvlKlD7zX6jD3uflW8dRf41p4DaVghS%2F6rrb7mb9HFoBh79XaRBhTOTve%2BEkTVCUEpGCFP6ljnMSVjavg1VaU%2Bx2RJ8EdNilMAbshLk7CTL0InHpuehQp0QXs%2Bx3kGDelUlRSIgxWxUCvTg%2BVxZTGhodInOnvJJ2T7xyThAZtYIsK1Nl0%2BByiBHa0JKfK0J0uvgyJahy&X-Amz-Signature=febd622103ab1d34b569b26ad42e5c99195795d2ce5e278b5c1bef782b79bf3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DYDFWWX%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDm9LMUjVcfjskQW72O4BR4qKpQpdEq0C5vbWmwdGC5XgIgM2wa1aIKkT3lXZX1s5cZIg3taAmb9t6GxMkjCK7oQQYq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDJSdOnIuON6CnIPNjyrcA8GgA8kr7O21ZZ8C5K%2BsNueBYX1ztSkdVccwy1F8zLkA%2Fw%2BkTV5yfpRCkdp%2BrYL7R5CHaKK%2BB5JiQVcWoxp%2F9zuRCGfEEyNwkjiL8mPC7OVW1rmrLwqYIB0CpCcrmSFNChIXxvAxOHMHocCTDZOrKi9LnsNOgI347kkzrA0fnm2Tdg0VwcKTKD36a6USPFnpQARLgGP6eIPVcGX4s0XAO0zyZ0aPZPXVUPh0aJ%2F8mMdnIYb3kahL7NDHw1yjZ0rgH0UZCLAuwztY8GdBRDdYGGw%2BYTt5%2F8s0f2WLQ5ilWziDz8v%2FsUqe7wz8aS41Fn3FdQQI6k%2FiYK%2BJTqdVezPwBV%2BCPAw0hJKz3hWrvOIbUleQmwfemfbI9FpsQxlqyPOesuUaEABEvBi9d%2FEc%2F%2FefLlvRnCGumZMgo9RK13Fy3VJDzQ5HlA94sMCUEcjziFy88CC8HR8%2FT6pW%2BdiSfgrnup3QWDJieSEc1ELPJpiKza3VMC%2BLydlNSn3zvSIrk0u9f3S31EzQct%2BCoxpSeE6Wm1pxBazdMTkqaA%2FbBcjVv%2FqgmU%2B9JIS6p%2BdcVfwK%2BUJAmAUjdoqW13D8rGqsL9kqTl6mXTGjNiCjy81Av32%2FoWfxX0v%2Fynzf00q11nANMMW6q88GOqUBFBrO9Wa7PaegN4wREez8ZZvrDSsUfoArizCq93BgHMz9xYUtKbneFWbpzDRqQUzeSPXh22Me97SmtZXFt0S7dzP8%2FBUJlf%2BCM%2Bt73Or3%2FC3SRwRGGedL2jjwzX17j%2FNH4QrjuUmtJLgIJTht1uPMX7QRVPDBdJxFKV2tjdv1NrxCIXebG7fXZU8TzsQuBrjJbQGWYWeiwkrjQUwNG%2BEekQKpORIS&X-Amz-Signature=72351f34879999358317b14acc89f75f242471a1d36db968d5c277a03cdf1d8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ65ESO3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClor20mkAYFtVMb0f4u7idjXZYevzAwKNWv%2BA8C7o5BwIhAMiP2NgrIx%2BtRjm4SyD7pZ3FtXhWGpRJMwuHVqBodKGQKv8DCHQQABoMNjM3NDIzMTgzODA1Igw%2FFYIXkK%2BkWayt1AMq3ANeMqToTD2304G6Sj199RxxKYzjiEgd3hXjM2y6UE9PpY9upoLz9CCMb5rTPaySdDPrGpv3Qv%2F%2FTkGtIzTJHWs6PttEsJK0QAjUYzcF6cyj4SX2o%2B97%2FjWK8XKsCJZTJYzvwuQ6IFGfQ7xKSB6x4NENKn9w4l9hEZuaEjc%2BuAnGyqcDiW6yxS%2Br01GkwqvTmkPZ3Ft6F5hyNo4pQ69PbIU21gFHhPMDv%2BWVvtgRET8HZS4sei0BU5Ab2JbLelyhvxJMwx54YA7ECGDjpv4J3nsRzfmSs5%2F5AKwqfcDoQulqObPTsgkwEUloYsxkFBAAhX4ozSH8IwRjlcMsm8a%2BNqqewDMuL%2Fukvg5ASb80NC34cZGlzFXv2IQ5Xpe%2FRpnJ4pgNNtszzZPYuMOxSxtH9XJWVW2nPQcRLThAYVrlC2%2Fmq8RLM4PQCLNMaj%2Fbn5cBTTsZDVTXchzMvJeXPowQA7Ebl8uOe%2F9BtwhTITZ45oDR1tJBJ63qMVehzgCcOemWTWuQu28s35lJw5p4XcrkGZui2xrANjaEnTH0Y3xDAlD8Nwux%2FU%2FTCQXXdqMd59Glylh9NvKk6bD3lFIwllsroLgdcZJbH6v7RkhZIrgA8GBjw37GF32YF3QeRn5iLTChuqvPBjqkAdQnaMjQcRGQ%2FC2htKj4ZOLMBfgrp%2Ff3ApZ8iwXcWu8QctPa7exzufVwah8PKNDmkNiVLsaeHbBtQw0fGSW6SqaYjieXWoGOiLUEzgc%2BPpvuT81Q9JdcGW017WBSX8TWlA%2Fwkj%2BrhUGeNH0ZWMwZLIhlFNKGeLsnOaPn8mPI6YN8YSmPNx3a1dJ%2F2txsgyIv6fNAsvbVNjNOWfhWdPI7qb%2F%2Fw9fT&X-Amz-Signature=3591927f927d9f741367ba30e74aa778de2f554d6bb480ff7a4d4c3a4b6d4efa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634NOXZDQ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE8CQ9Y4ldTfarOKoJF9tVX4VaN2jSMd79hIwC27zy%2FxAiAKaB%2BCiuiwJ7B7WSqmVkZgHsA9cFOmaKK5NWdZrZlmkyr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIM9nJBTDJ4xfCIn%2Fz9KtwDBGPtgiWyZooWMc8dLhJ2WFUb%2FwmdRsea23qFGK7GenCirvfREYvCRnxJAOv81Yv70JlVLaxyFNSZUG7oQ6wgo46JqVbD68ZnsfXBY6PrViAqhLa5AEmhERgWDSvMVla04V9z00PqwoHJs0UR3pE9ITLsDKJP6mb5cXZaYhfAg2ym%2BdBYIcgMJk1JIP%2FRNSarH7efQ9BcIHHvwxzhdJZwI6EVxbdHXY%2Fv6vErYuk3uP2XPg3aItTXYMxtPq7MAC%2B1tqHc96w2UFs9l97hgPSG5gAnpV0KEihdO%2FT4i9XQRHxspDCjbHMnTWBSwSlJzFaEtcxWliFSd44SvDmAlfVnqUICUrMJ9LPXYEaZ9%2BzlvkgSGwmdcX%2BLiofhvCCSm2VMhnQgX3EwfiKZceCdEMBs%2FhcPvO%2BHnHHfWfh3CmVWFNSsSSmviK3BMQIfXSQDsYmpEQN1dPp49ZuPL4EfP4d4Ex%2Fpi3KAayluTLP0VjkmJJQZMyNuwtRBoh%2FH2pc8jabWBshZ7%2Fw%2B86oESxFQLcZcrdso1rLQb%2BZvrDtSfkSSl9Ny5xA5cqcfI5Hv0CTjS9ncw2FcwCZRIqq3CMcl0mlgI3LqPOJ6XhGCkNQ%2FTYXtsM38TEQo7ifpGALbA3kw4L2rzwY6pgG137rOg8yiXOk4ChmOm%2FL0UWSnwI9bSpAef7gD7jt7riSQ5cz6uqSGPoNGN5rKfnNNtZL%2FBRwMrHsJpemigx%2BY78KAQWBjgbnOFGm2OwrC%2BDYldXO521gRGe29vseMjRKOPBMkOZx5qZ%2BWBthUylWXGA15trFdn%2BXMRPmbZGafNoOeDQTf7w6Lqsr02KUsQLfbSumZtwNmJ3AeQ9S%2F7vs4jKYYd7Xe&X-Amz-Signature=4d044024881b4bfe058e09aa8472b0150edb51b0db06b3ebc44faa0aa46c9df0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653QHG6LZ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID3bisc7AvwufurYACbp3bnY7z3vcoPlmsJQNrZs3EeYAiEA36XBKHTnvaCj57vquyW6nAHxW5LJViYQEL4jp1NdlTAq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDJ6jju3QYb1HF6qbrCrcAyYv4QyLpXiublO56IFGjPKeei9%2FOKZHjRSfhJKj31fbr5bRAAnBNKLX6QqW1r6RHLnh9lMBsnKv1a3RG4R4T2C8QC8YLp3E1gMOfE8BMKS1uxfF5NU3dzV%2BbDlpyisrcvvKuI5teieyln%2BrhkGG3WmFAogHUHFHnsvVlRR2XXCNhZmfBy7jpw4KzApVOzdJcOhksnbLjcyKL00DoBZ%2Bb%2FMyXMkicd9Uc5xFpsh7Yp375Olgna5Gls4skFhrlyENzyTiE%2F%2FvREKYU6JTuDaTuF0adFTDmi0ziUoerIz%2BMqAVfaroAqeu9AdzJFPPDDp7WpEwIuRwlQ4QjtfIxfpUewcnE5ZtkIoaIMvHmjQ9LiiASDR7wrBxuWJ9jbrZx87%2BeYrd0%2FdHIEtar5Coct3XlT1HpJTIGHO6gk%2BUEfqFTrit35t%2Bn0JbPnMCUstPtjUZn0kJBsSDE2XQT%2BUIPxI9soM23cwaft52tP%2BKPuq3pYKZbRsOGyBA%2BDpFe%2Bko%2FQEYnQ899a2yOpxRvjG4kyRkzoAPW5nKcPrbwPCiDB93Lcx17uJB35rTK2sBj98QYyWzAJzou9XwWG7V3DC%2FCZ%2F5h8tUsiZma5ph6RNdkUamSfoAIhI1mfEFkwtcpyvtMIXZq88GOqUBP892yY1ORaCFdCx8Ys0wRgYWyCVdn0urXw7M6ReIxmLTEgfH1Ek9a5qS%2FFhg5GpEzmuy1bR5BDd%2BuiNBbJK9siojpRyDNhgvU9%2FYqgCi2GRXxLVVftziUSQmCwa1O69qbbyOxV9meBU3SJiEya6JsrAQooiIELR%2F5goM5S%2Br5dmUvRt2bSt8LQQqSWi5v03axY8Qg2EcsnKkkX8r00YE1O3oZ3%2Fq&X-Amz-Signature=bfe8e38746ecc4e6e90ee40cbe164b06bfdbc7cb43bea47d7d6a55d39957c39a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653QHG6LZ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID3bisc7AvwufurYACbp3bnY7z3vcoPlmsJQNrZs3EeYAiEA36XBKHTnvaCj57vquyW6nAHxW5LJViYQEL4jp1NdlTAq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDJ6jju3QYb1HF6qbrCrcAyYv4QyLpXiublO56IFGjPKeei9%2FOKZHjRSfhJKj31fbr5bRAAnBNKLX6QqW1r6RHLnh9lMBsnKv1a3RG4R4T2C8QC8YLp3E1gMOfE8BMKS1uxfF5NU3dzV%2BbDlpyisrcvvKuI5teieyln%2BrhkGG3WmFAogHUHFHnsvVlRR2XXCNhZmfBy7jpw4KzApVOzdJcOhksnbLjcyKL00DoBZ%2Bb%2FMyXMkicd9Uc5xFpsh7Yp375Olgna5Gls4skFhrlyENzyTiE%2F%2FvREKYU6JTuDaTuF0adFTDmi0ziUoerIz%2BMqAVfaroAqeu9AdzJFPPDDp7WpEwIuRwlQ4QjtfIxfpUewcnE5ZtkIoaIMvHmjQ9LiiASDR7wrBxuWJ9jbrZx87%2BeYrd0%2FdHIEtar5Coct3XlT1HpJTIGHO6gk%2BUEfqFTrit35t%2Bn0JbPnMCUstPtjUZn0kJBsSDE2XQT%2BUIPxI9soM23cwaft52tP%2BKPuq3pYKZbRsOGyBA%2BDpFe%2Bko%2FQEYnQ899a2yOpxRvjG4kyRkzoAPW5nKcPrbwPCiDB93Lcx17uJB35rTK2sBj98QYyWzAJzou9XwWG7V3DC%2FCZ%2F5h8tUsiZma5ph6RNdkUamSfoAIhI1mfEFkwtcpyvtMIXZq88GOqUBP892yY1ORaCFdCx8Ys0wRgYWyCVdn0urXw7M6ReIxmLTEgfH1Ek9a5qS%2FFhg5GpEzmuy1bR5BDd%2BuiNBbJK9siojpRyDNhgvU9%2FYqgCi2GRXxLVVftziUSQmCwa1O69qbbyOxV9meBU3SJiEya6JsrAQooiIELR%2F5goM5S%2Br5dmUvRt2bSt8LQQqSWi5v03axY8Qg2EcsnKkkX8r00YE1O3oZ3%2Fq&X-Amz-Signature=597d9ad572dd1452e30cdd8241d7cb6e077303030119267fb0ca44900786feab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUAMGGVG%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFkLCDwCCVqjeat2BgmeuHJ6GU3YHuVd%2BeQPcUSC9SRzAiEAjTtBhgEUIcD0fxSceFGLHxcBeC5HQLGXAJ66bGlliiYq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDC1RZptHN1pPLTPtUircA942Dkmm%2FRjqPqs5jqjB2YL1TSltjKyVeg8z6gbGhDpAS2XysmL7Ru27BIO9tk4knstt3qT5jTvdryl1vA7Mo0YU%2Bc2FGMPiooxPh93ynyXLiLANsSyzCqDI9JvvWWg%2FIFJkFZK4oaC6hJe%2BtqY05PGtnPd5ZyjENbLPbAdWkzYDuwS4%2By7%2By7uyCDlmzCHWqtDhBwG8IeKIng9%2B6TdpOVF6QPuO40FcQHsEL9dYheiMo42ybtjuK0LPNdiX2zyRfsCE89WGiVWi3ELlgV7tY1sKSgZUww%2F8RAldDC%2FYBsDH9k%2FApKnpHwFdNweCVEO518AWTqK06fmoRJC1DZp27dT5JkDvolM%2BQmKDUsO5NH9fijdZOWpgD1EJdH5Jk3Xg68PEQ5ECG6LAaCBfIIO3v6lORsisarq2uQPbFxdPYYW%2FzwDE%2BhDXtFMUGMuQOv4OQBYymaA9cO%2BRBdXvEtxFA0Y7K2bhrznhDoSzykzPFEHlrLcCGGBXlFtEZVyxPHZ%2FmBP087DtNE0u%2FQ4wXz1UtfM9jJwp%2FrI9q7ljsEjLgbR6sFYsYg4U3kFfyUeZU1%2B7Uze5HJF7iP5oy0ZS17LYqv3SglznuOPKSrP8qWbFeBisQvzm28lqdDP7HqX9MLmtq88GOqUBTeqi5DwzJs%2BKB62owSgtpUm1N%2BjtSSf%2FAGIF7zMRuKfr7OrWlYfgoGJAgSW4dABmT6SR9%2BXYpQ7IjCnpIWYL0NxVCj51ANwxvnP7K1o4TEe1c8Z%2FIAMvSuR2Lbcq%2FRvxSiLdotumvOT55txyXRyYKXGwzUhDgvOTTSyf48gKtjgw%2F8sqEAP%2F7P7TXYO%2Bv11ckTFR9OF3r4R3SEiyuGjBqXcwwXgU&X-Amz-Signature=75055cea591e3b40072125c67eede83beaf0e8c0b523087a02ca947495577912&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QUE4KNO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDP8J2KPm1VwZMToGQfLDvsTjSAHlCoHnPwMFfLuA%2BrWAIhAOo1bw7m%2Fuz67dek70XR%2ByN80Vovruixt0vLf4xgNdu%2FKv8DCHQQABoMNjM3NDIzMTgzODA1Igw9RN4w8sqHDMQPNCsq3APZPSWdqrGPW8kepw3d0e0TAmrqMR0%2B5I4%2FYsWViMyxczWviXkmSh8vWUR6xsM7N0UJP5LMF7PVqXZvPKrWjS0e0A7f3Z8ASQ9WNm9JJYMfq8gDPeGzXPMWRII7QRrQb8GbU7vfhjVyHzK5QWXZGqW9rk2UJ%2FwwSOmAu6ZFm2AAFHGFiYEHfACK7gtGJpE1MoJj0IsWjPH%2Bnl9i1jM1aAOlAX8IAt8WvE0RmKdv7naq2aAK2w1Q4KLmVnwJdZauLSv%2FhGbCRMK4tI4s9QjeCWxcd8f3oa8jMqsvC8yhdLx%2FuGwGmrW1b4bbZ9ldguIdWPhhd1c0z60ikV5LmLu1GdQfFoDFlYymdWsJIGL5sj1rkR1PCZ%2BC3ruxrMpUbigp2TAZ4pZ%2BPcUrLRfnwbJKSwV%2BiiCPNTkwUCB7%2BZutdeGFvz9MOlx00Q%2B0o5HP4knSO3MMTX%2BzTiMW2kkkrOp8Irdca5ynL0gyVLpER%2FYrtuCpEhq9IR1PIYAxpXb4bWR3eZIGEbZobSQ4OOGyUQRnz9gKaQGgKLKdcsYA66VwmfTbGEh%2FrBt7cHxfEHw9pUgWuQJDTHQkPokZpzLFnSOTF9NWDuRemVxGdvvu3KB41hS%2BtO8xJHePVjF6ylj0LjDet6vPBjqkARTVvBoUZWLUxQ2Tx%2BvkdxD0sYw4%2FqRJ6BLDDaizwixWYeYfufqL99v1pwTdzdN8Md2Px6%2Fnbox31oIzt4ZN2A8zYMw2WEtBCrtUGC%2B8q1OXrRK9HzesL%2FWcPRmwkHmGBT%2Bj%2FDVmcgRFSGRLe%2BFg2wEmRaymiXW5CPTGWz0LnHHQFxtJvqHoPQdwE%2F25jxXf32IjzzLfwsNcMG7AY3uNICBeesy2&X-Amz-Signature=25926b43d4bc02f0fd359a0139da29ef96393fec8870c9ea4515d745dc08b4d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QUE4KNO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDP8J2KPm1VwZMToGQfLDvsTjSAHlCoHnPwMFfLuA%2BrWAIhAOo1bw7m%2Fuz67dek70XR%2ByN80Vovruixt0vLf4xgNdu%2FKv8DCHQQABoMNjM3NDIzMTgzODA1Igw9RN4w8sqHDMQPNCsq3APZPSWdqrGPW8kepw3d0e0TAmrqMR0%2B5I4%2FYsWViMyxczWviXkmSh8vWUR6xsM7N0UJP5LMF7PVqXZvPKrWjS0e0A7f3Z8ASQ9WNm9JJYMfq8gDPeGzXPMWRII7QRrQb8GbU7vfhjVyHzK5QWXZGqW9rk2UJ%2FwwSOmAu6ZFm2AAFHGFiYEHfACK7gtGJpE1MoJj0IsWjPH%2Bnl9i1jM1aAOlAX8IAt8WvE0RmKdv7naq2aAK2w1Q4KLmVnwJdZauLSv%2FhGbCRMK4tI4s9QjeCWxcd8f3oa8jMqsvC8yhdLx%2FuGwGmrW1b4bbZ9ldguIdWPhhd1c0z60ikV5LmLu1GdQfFoDFlYymdWsJIGL5sj1rkR1PCZ%2BC3ruxrMpUbigp2TAZ4pZ%2BPcUrLRfnwbJKSwV%2BiiCPNTkwUCB7%2BZutdeGFvz9MOlx00Q%2B0o5HP4knSO3MMTX%2BzTiMW2kkkrOp8Irdca5ynL0gyVLpER%2FYrtuCpEhq9IR1PIYAxpXb4bWR3eZIGEbZobSQ4OOGyUQRnz9gKaQGgKLKdcsYA66VwmfTbGEh%2FrBt7cHxfEHw9pUgWuQJDTHQkPokZpzLFnSOTF9NWDuRemVxGdvvu3KB41hS%2BtO8xJHePVjF6ylj0LjDet6vPBjqkARTVvBoUZWLUxQ2Tx%2BvkdxD0sYw4%2FqRJ6BLDDaizwixWYeYfufqL99v1pwTdzdN8Md2Px6%2Fnbox31oIzt4ZN2A8zYMw2WEtBCrtUGC%2B8q1OXrRK9HzesL%2FWcPRmwkHmGBT%2Bj%2FDVmcgRFSGRLe%2BFg2wEmRaymiXW5CPTGWz0LnHHQFxtJvqHoPQdwE%2F25jxXf32IjzzLfwsNcMG7AY3uNICBeesy2&X-Amz-Signature=25926b43d4bc02f0fd359a0139da29ef96393fec8870c9ea4515d745dc08b4d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466564JO4HA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T044250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXT6%2B%2B4ei825ZmbnNqGpfn0M4NJrCDkicLT2ZIyWlSaQIgCLrYaxUMOoCZkYUoC3vTLr8e4g3%2FVZYOQZPF%2BqrAcZUq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDJiovF8FLLztoi9apyrcA3YoLblQ%2B9AChkKfPa37ZYG9dVMXwRUAWXtxIIYoVruK0FVmFDhj2E%2BreGWxtkjclW%2F2XFhnoXDgXkfyHGQ1syS6Vc9d%2FqJcqQLOXQiHUH2eNL2Ki0fhpjmSsGMD2bBQO%2FkUW09EZDsXOF%2BM%2FsmrXtwx6b024y8oZK8770RM2nfDiZ4NEcKWw39IjOtScx%2FjGNlsJR5BHAV%2FIPK18kxwVN8m6Sszi6Vv7oJUi3N6TV4AUMYEqm0HP5glz3gJzjqIEUkgxQW7Q%2FV9pcmn4g%2FDrF88ZoEkRfRGzaD0Q3t5tVvu2G92%2F7X7HReF2cL168R6r3CMUknKFZMeW0BHWp0TcL0L8rfMPGd05oAWydcH%2F%2FkmJUummvMi7YYHEDLkyuq3w9fPx9eGKP0Umwzkn4jF0dqMTWhGP%2FKW5XXryuCh%2FBIkUebVcxI1oI9TZVBJIiEWnwxAV%2B0XTph8lQTzKZEe56dOmm%2FoGpeokzizTLOFPf60c3XPPlTCbJonlwMY7cfM2u2bMEBBi3W%2F9HfN9X2MdbqbUHfVZyG4nS5sF%2BmC2T58LixEBrK0m34NeyANr9Di1gNFnWL1UnY0QA3xFSdxHTq7Y0Wf%2FRudYF64XXN2InRT6odampdIOxv9LtVoMI61q88GOqUB5HalKtTa0HQve2W%2F%2B7TKfTmF0gPGE9bSk0KJym33kAudJruRK90kZ7eSDljbpl034oVrTmAD4ysZPVV94DNG%2BkLjzGSW4b7y4OnjD0dhvx4XwdPexIqqT7225FrllOdosL1L1g5FrhrjIqK4TbkhmA6KTxHiP%2BFgf2KHV27YY%2F1W%2BV1KPcsIIxmRh5hRZMxJIZqXjNYHhfXd2xfCnJU%2BFCOJmOia&X-Amz-Signature=27cbec27af197acf85bdf23cc3868a9eaad8d94074f35c7defb983432e3bd8bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

