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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646TSB2GO%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIFOmpB1gxoHMQ8lU030RMvtuGZ8Zzc%2BSv%2FGL9FWPCnWAAiBmCuFpBa%2F19UOX71QyAEQqOAWZXwHlRZDs%2B1sQWk8B9CqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwH5aRJyWuRNc0%2BqvKtwDWDcfW9e6%2FjSrhdpzekuTg%2FwV0UDwwiwLNE3tp7UwZyihUgvX9XhfzbTFTJx%2BkUvulvGELnlnlGR3Crub9s%2F71Bs%2FIngAi0%2BbuA39iAWuJegccnMid4UHRhPBRr1hJ7k13DxCZeci1R5Qah1kMxWTk4JLB0OHoibUeIxE2QFZTfUVnV4xIaj81Oqyyl0KT48iWXtxYUFkR2%2BbIF6hBi5rHMMlCoqVbtAwtGPUCrHvOtuSjPACwNwbo4cbq9MCQFR%2BHb8krA5wqDyL6qKFTCBe6%2B6G%2FcgKc1dZ%2BkSA9KAeEAq5rAhcjioJjbIeJUNBxKMJR3wOa3T05GqOu%2FlKj0xiVJ0D7%2BIc8Tk8%2FArrCtZMz6T0UCjI5gjyI2EX6pAjBYtrfmUwB4DDozkVEb%2B5PUqaf49FYxOE38Pv0cEPzJZs9E9vFgQJjnIhByOQk1tyE%2FNz9rCD8t77gkqzRTP1gTWzhqDT6YePas%2BGtqK9eq24%2Febn2IPcSY7N81XTvgTcIyyIqitFE%2FfG7WcpfRCR8LCQfuycUEhK9X2Of%2BwyZLVaDoAJ2xu%2BQr6s9aC7gd%2FPxIIBI15Zq1%2BOIflU6t8DT3U3XNrE5YdxxXkUU9suOoy6LeaXAZQHG%2FxcPlYVe4kwmvLkzQY6pgFAVtYywp6H7ufW50w54cMyWnGvHHev%2FzAVsTKn8VX9TR%2FpvdlNG5pnt2%2FCIHrmzxqObo%2B70hLQojDr7822rRy7rYfhRP02cR1J0aUw7ahBE31GJzyWFkldZ%2BcRqnsRopckCVIqDxWjD%2FGuvAqSP6peqpE15p8E5FtcCTL9yrcfmZ3rErGAhFc5nVkMW8gVUBO%2FgTEzkY%2FqmFnJFwDNWw01SMCgn3iN&X-Amz-Signature=97a76678af522b32bc0cc0ef140eec28da65bedfedc7ac6c604be9e08a784a34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646TSB2GO%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIFOmpB1gxoHMQ8lU030RMvtuGZ8Zzc%2BSv%2FGL9FWPCnWAAiBmCuFpBa%2F19UOX71QyAEQqOAWZXwHlRZDs%2B1sQWk8B9CqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwH5aRJyWuRNc0%2BqvKtwDWDcfW9e6%2FjSrhdpzekuTg%2FwV0UDwwiwLNE3tp7UwZyihUgvX9XhfzbTFTJx%2BkUvulvGELnlnlGR3Crub9s%2F71Bs%2FIngAi0%2BbuA39iAWuJegccnMid4UHRhPBRr1hJ7k13DxCZeci1R5Qah1kMxWTk4JLB0OHoibUeIxE2QFZTfUVnV4xIaj81Oqyyl0KT48iWXtxYUFkR2%2BbIF6hBi5rHMMlCoqVbtAwtGPUCrHvOtuSjPACwNwbo4cbq9MCQFR%2BHb8krA5wqDyL6qKFTCBe6%2B6G%2FcgKc1dZ%2BkSA9KAeEAq5rAhcjioJjbIeJUNBxKMJR3wOa3T05GqOu%2FlKj0xiVJ0D7%2BIc8Tk8%2FArrCtZMz6T0UCjI5gjyI2EX6pAjBYtrfmUwB4DDozkVEb%2B5PUqaf49FYxOE38Pv0cEPzJZs9E9vFgQJjnIhByOQk1tyE%2FNz9rCD8t77gkqzRTP1gTWzhqDT6YePas%2BGtqK9eq24%2Febn2IPcSY7N81XTvgTcIyyIqitFE%2FfG7WcpfRCR8LCQfuycUEhK9X2Of%2BwyZLVaDoAJ2xu%2BQr6s9aC7gd%2FPxIIBI15Zq1%2BOIflU6t8DT3U3XNrE5YdxxXkUU9suOoy6LeaXAZQHG%2FxcPlYVe4kwmvLkzQY6pgFAVtYywp6H7ufW50w54cMyWnGvHHev%2FzAVsTKn8VX9TR%2FpvdlNG5pnt2%2FCIHrmzxqObo%2B70hLQojDr7822rRy7rYfhRP02cR1J0aUw7ahBE31GJzyWFkldZ%2BcRqnsRopckCVIqDxWjD%2FGuvAqSP6peqpE15p8E5FtcCTL9yrcfmZ3rErGAhFc5nVkMW8gVUBO%2FgTEzkY%2FqmFnJFwDNWw01SMCgn3iN&X-Amz-Signature=97a76678af522b32bc0cc0ef140eec28da65bedfedc7ac6c604be9e08a784a34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P6XLQM2%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQCHVg4%2FdqgXqC%2Be8p1D6kPl8G9GU9JCIuH8kGRCBRhuqgIhAJGery96gNwfgLgcFO9lTsQunUNSH5Qhiz9mznnVIjmIKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz70bZ5hikf31cJoSEq3AOpysVeSOmVHBfdTMxcwoyZRUUkP5afrOzzBCEsvGt2xT4sYyTAuzlvD1QtbCydLhRcDCRzSY6KxowghSdTcC8TTT9kzprKldoclxuba7ReSbvBglCQaSZIcEj%2FTxikMsy9zybZ1jJ11dVm0TJVQULGRD7qDjf4trbwljR5kkLqfmjNG8KsHR%2BqOhDzy1wdn17TO5JRsEpKWNOL6iYfWB0jDYbKKBi5lbnVOScLFU8K3t%2FzCJuf%2BkdLLqYqwpvm4v3gUFjtNigcsa5NJ%2FNC7xhv6Gw5YPY1h%2Buj%2BwpQ%2BLlea5WcVqIfdSNXVENSfn8onCa1U04ow8h59nF2QS7NBaNEfUyh5E546UIrhPnHIBBLbrlG639t3FazJpIykjMKR7O3ZwG1etvmJpSzZdyuX3GfLR%2FQDE4fS8kBS%2FP4euyowWamHpvtc9HZU3xp2iydbhmlFRhZGhZzJDg02zBvHsqd8u4wDjMgQi2lSQ2LhxGe6%2Bejo%2FnA%2BXaQpotrzkmxzhoRydO6UTzVhuc1JAOJZ41f8L69WKnFwC1FrbJ7nXwgOcZHYWxwCoWhdHdrixwnqnjPSSIos4UIjkkJeIDc2ZQoecg6L0wzYraapMOfhW%2FL5kPpqEBcGOuoYorsMTDy8uTNBjqkAZ%2BG6mr2rbYzLIpg1qh8J5UDw028Tbipcc63%2BkBakUJtTvw9E0rg5W8q%2FW1iwf%2FnJMFOYgYzpRqNZ0Kr4%2Fan1iay8Skae2ePKc4cMRGj%2B%2BWptEqnpxJvo5HF5rE%2BCht06tvS7klKa1z0MNlgG49au8TyAUAcuHxoEdOb6b9xe2IK4u4qsfH6R6qjEfqTSqGvH6si1Evhon0g5f4vCzKu7ZJ4pVq3&X-Amz-Signature=7ed89f73424845f2bc006314a1eabcc5544b606941ceb1a6220ff347f1fdbbaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAPK2BVB%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIFqFc69%2FwN0npDvXZkQ8ZyZs9zjGZOQVV3%2FaUshJJplDAiAsp7EE%2FHRyethSA945Hd0fc2b8T13hcozdwhHzkwhKnyqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIF0Gq30ei1%2FW67eqKtwDCL7LgU0OYw2igENCPQw1nkv6U2P7NwiXV4KeQwF9VeaC7SWXFZ87WBKECrrs%2Fvj%2BVhgPrOG9UPujAKyINTyfgPn%2FDyBl3q%2Bg3UeCiKUik3OTSxw5BMsI2se6zoUY2QWmTlJbNxCkA6zIzFcDWqxfv9A092H1Mz%2FSXLMNXvgYvVHRSOjnMZb%2BATOVm3Lu2SD39chrUjMPtshxni2YeBhLY9OriqfqAn%2BuX0FNxsszuZlU6k8yp0G2KCQo37iM%2BaauP5A0X3lKMWon3PLqTHk8wWZDmI3uOtV7kayLNEuFZmkOz3oDoiQVtGjcEWTANswfuB1vBumEs3a%2FIJFh8%2BhIy9hwA8NGsIuyEjU3dUco94%2Bhfrxh3G8SxiTyOTkphFRokIh670cS7yChS3gmZW8X1wySMVR0KRQ%2BuU6B81cHUcafoJglJqFhvwD8C8gXruoYEMSVSUdNMZyoGywg%2Fy4s%2Bywz9Y802vlnQSEkxGBs%2BpKmxkxo8xSgJlUSpETn1oAAcc9EODdk8ryKyeo%2FBWM4ECKDsuyXG48ySbyrUHFW4SDCxziZME7PEVxcg%2FCxO53Q%2FDm%2Fw5WFth92jSqV6flvjW5VL9Ij3PH4cGWcEDz73MRhdED1h%2FjguOdMuMIwovLkzQY6pgHJ89WuKJer3PsKLjR0zwJOehtbLPsFZsFNqAw0uIRVhxTk5Raf%2BL2GwNhtL9CxDzQSlXmrYt3w6J4jWjU%2B8l9zEDBR39h7iGE5WGmsg2f%2FsJhg9RUIMoJZYAIqvWREo%2FnPpWgGHddPWvOtVDYkEHfr1uZw%2FdglLrA%2Byys5RLeWa1Q6UghyVrGBBfLAz3UCN%2B36j5Zemyrh1094vBH8OkUkKcsKwcyY&X-Amz-Signature=40d3fcf38a7faea6cf0efc1fe48a54e9650b91c166fd672de6e6c8f1918e81e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAPK2BVB%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIFqFc69%2FwN0npDvXZkQ8ZyZs9zjGZOQVV3%2FaUshJJplDAiAsp7EE%2FHRyethSA945Hd0fc2b8T13hcozdwhHzkwhKnyqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIF0Gq30ei1%2FW67eqKtwDCL7LgU0OYw2igENCPQw1nkv6U2P7NwiXV4KeQwF9VeaC7SWXFZ87WBKECrrs%2Fvj%2BVhgPrOG9UPujAKyINTyfgPn%2FDyBl3q%2Bg3UeCiKUik3OTSxw5BMsI2se6zoUY2QWmTlJbNxCkA6zIzFcDWqxfv9A092H1Mz%2FSXLMNXvgYvVHRSOjnMZb%2BATOVm3Lu2SD39chrUjMPtshxni2YeBhLY9OriqfqAn%2BuX0FNxsszuZlU6k8yp0G2KCQo37iM%2BaauP5A0X3lKMWon3PLqTHk8wWZDmI3uOtV7kayLNEuFZmkOz3oDoiQVtGjcEWTANswfuB1vBumEs3a%2FIJFh8%2BhIy9hwA8NGsIuyEjU3dUco94%2Bhfrxh3G8SxiTyOTkphFRokIh670cS7yChS3gmZW8X1wySMVR0KRQ%2BuU6B81cHUcafoJglJqFhvwD8C8gXruoYEMSVSUdNMZyoGywg%2Fy4s%2Bywz9Y802vlnQSEkxGBs%2BpKmxkxo8xSgJlUSpETn1oAAcc9EODdk8ryKyeo%2FBWM4ECKDsuyXG48ySbyrUHFW4SDCxziZME7PEVxcg%2FCxO53Q%2FDm%2Fw5WFth92jSqV6flvjW5VL9Ij3PH4cGWcEDz73MRhdED1h%2FjguOdMuMIwovLkzQY6pgHJ89WuKJer3PsKLjR0zwJOehtbLPsFZsFNqAw0uIRVhxTk5Raf%2BL2GwNhtL9CxDzQSlXmrYt3w6J4jWjU%2B8l9zEDBR39h7iGE5WGmsg2f%2FsJhg9RUIMoJZYAIqvWREo%2FnPpWgGHddPWvOtVDYkEHfr1uZw%2FdglLrA%2Byys5RLeWa1Q6UghyVrGBBfLAz3UCN%2B36j5Zemyrh1094vBH8OkUkKcsKwcyY&X-Amz-Signature=d035212ce83287042084266e3cc8dc2efc94cf8d762606ba2626bdb6123ea048&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKJ5THZE%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIAQn87OzbP8%2FLYIvh8Z7CcKu5k16YfZhMvCfN0kZzyw5AiEAnD0SRSh2nwXSSndk2pFbayzWEmd0U1EOXMB3VMkhqcIqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEJJxDLPJmFBeoR%2BwircA4DUnIIIfDXa14J9TfB9tKdfhLV6X8V9dgmLgR%2FMs0LiuYMzDEdrr6w3N4CpzOIeJ3bKBS3q0y66cup6h9I7%2FWDFM7%2BtsvDqqhho4eenurYbbNluE%2Fz8%2F76Oj83JU%2BxpMfCPVG6vcb5Q8UiDeEx8enCPimgLr7JoqUtJKWXJbo1PmVTZd3K19WTGngPNytwQYtEuHSULkIEVl0kYOcsrmqm9Lhu19gL0UqkH1K1J2UzaNUokku%2BVa6fiHaqiPBUXeK7FvULfA4xcedlWt0ilEcx2Fp3JvamJUXF1f%2BjcGr5ez9BfeTDFVL5ugWShGLObZkHBb%2F8g5VqJ%2FcJYU2aogaXi24BdPJH%2FM7dnSIKcyXDw2ZaKssjwPQHu0Nv6xUD2JuRDnTpCaPpQs%2B4p%2FFGfW6lxElss8Cndp2ieQwPnCmK9zEpPSccFCK2f2VKseDSxWm92nyK4McH2SbK4dZKk4wprdtgAszpLiIJqY3ks947D%2FOsjh%2FQrQ%2Fb7NvRo%2BNRWb%2FUogXwhna6sKYPi85kfSdMnyZy9g%2FXKpnwBaAWOA4meh0XaElP48m37aMlCtLx6e9z%2B7HGsTiydbbaZcmC%2BgY8yVtlaND%2BteXzsg59kLoAXVaGbnH2nXWgQzvmtMK%2Fy5M0GOqUBi%2FYanVF0YjTNDpv%2BT3xDntBA0hU3%2BqXkz8lkYhvA7BBEkdx9Gslu7GZq%2B3rVB%2F%2F%2Fu6mFgZBy1T5gV7sinRu44UcN6bslWXah9%2FVSZdNnPqgziVs8X%2FcdhQQRGRjYCLPkoLH0ZWeZZg1GOg1glbfzV5t2k34QYF6TMK4eFs74RXVTcJFgxewPhJSj2HDitxluW50yktbjM%2Fc1QCzFuPS3Jq8QMVUE&X-Amz-Signature=e65196cfbfbba3a0d6e871017ffb48bc0d1dcb30ccbf0dfa003f9dcc89c60d89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GZY6H52%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDPmiSTub6YNYyiP1qIdPTkj90GkTDUgGHsYJQVh68ojQIhANjKPvwqQsCeXutY3pY6jKdEy0ngG8%2BrHIqnXNkGeEPBKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7VHpIs%2B5QiUFra8gq3APOzx65lZE%2BKJxX%2BiERVpIRU%2F4NDni%2BrQqQXatBBPVJCVprJEP0B0yq%2F6pWazLkhy2EEX2KKuGSLS81xDdGvIBopkEaJUsOEc6GXVj%2FawymG%2FnycnK%2FWAMOlwAcvFiJGpXDsgARWGLGcvMI0YScSj5s7TFblHhielXTmvAQC%2BhGEyE2XMTbv2r3STXeGxZdJgsZhxU0AbagMfQru1oP5wdqDulIVna0qQkPk1sU8pKca8L4mtjm6FxWYPawbJVKdnx%2F2riqVjBSz1Mje8mOPyfSLrSqh%2BK0oK8Z8j1NpT3bxjDMIu949Cw%2FJ5atuW0b6neTuVuDue0wzc8jNrsQENyGRvN%2Bag%2FqSayknJMAWn9R13kjzKqrUg1GOuIJqs5AMGPYSaXStRe%2FBzdG4EElCZo9jJmAyo5LfvZrcf%2B2%2BljTaBz06o1lyNafO8PZNqgTiVXisnPjX%2Bzoxg5HJJwZCtKu%2BYTszYgbSAzsV%2BwZY0K%2FVuPnS74gbp3AHm%2F4Ba7KU%2FtUHFVqeWg8NEMUocfET65Si%2FIo9WFVlThYQz3PsoSmFDlM465XasLJ7%2BvznE970rcR4zG75w9GRt5thNzIA2V34bDB7kP8yfaa36SGL%2BuK2puQAirNTqs87%2Bx3ZjDH8%2BTNBjqkAYVBVaoTn0G%2BepmQfTrY1htKO32dRhVxdsedArCEA8BGq9QcDV9ubXvCZ6ZUrmU2K07sQ4lIHmssrHZlzjP%2BImwdeICO6PbL6dlGN6bkJkaEccKPu7gYf%2BZQIEA3SkitiL%2FCdxQX5ZHbdUTlFnRR%2BKPF%2FdBXPHPRzwWd7xIRgXZs2sepM5NdlmQE%2F95S4wuSAUkM%2F4Z%2FhEc36AlsyjJiexg5Ayuj&X-Amz-Signature=888ca6f8bea64146f2da73f2ca90048d0f736954378eddcb6bdb179d48fff507&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664T73LDWV%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDj3FSAA%2BMQmaRzCaUGizDGIfqtyXB9kwyEzWhGtGGfRQIhAL5XAP0mm1yipqPsxpIExL3Sk6Iuimx23vO21JBSfbg3KogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOQYKAXfFD67WBRgIq3AP9hVdTGkc9LZckuDiR5NrYE49NeM2EVaEkcMnOCQXUw%2FZ%2BGxTpx70LntXnpw2mFysC0UzFPuIznfIPw%2Bl34bQBzukTBJEECtnhvTgjFlO7S%2Bgia5d%2BcZ7j82unz3V%2FuOVXkIgo59s9AT3iU7eCydXe4yb6cNS1kEiv0XEXvWYE5j1ULISpI9uatWb4kEzp6%2BriQazOo6mhi0Fd3S2gH3qhZZuNEK%2Fj6FKAfa7yTUL2FghqTDUV7NqTScyAaEW1lMkw3ax%2FitBl%2BeIgzpzswZ%2BgR2cc1IgLBypqoufpdSSzgye5yACe3SZlLq%2B1Tu9ML6rZYm9GdImRX4GC0TjoOZRTwXg%2FMdGZSCJId0UgEApmjdKxD2EwtdtB4I0%2FbtkwO%2BJl6bwj3QCGakLHl9ga8wIcSRRNvrYyJ4WsEoB7qNtkzi2tTyQLqOLXTyjHBvPhXDp2%2BEKx8ZwTM7EIpFr%2FrTBi1Ltnh5DljzaMRAWmP7ThcBNDUU%2F3sv7QBqvBPdNkrCBdkPe0mZHUCJJWnlIH6HdOnVrz1hw8qOGzhnREyKNVAMAT7N%2FgV8HMZlX6VOafcwKb%2F7Si%2BZHzHQOFJELopYCJTTGRlQmtywTdJRRpFWJnSiENRcRFu647C0Lg2DCN8uTNBjqkAfB7ZWdZHkzSTopxsSO8DYiqRmopHaboJ65QYD2mXr%2F3Vq5rx3mgLtlVW%2BKh1WOZR6RGG8urda5BMn4g0J8WgyLzeqs5kTN8SwyU3i281gFAw5p8x%2FSMe8btXZwb7UCEQGaj4PYHcDqJdr6EPkubI9uHn0D5lag8cP5WS1S931P2WRy2ck6lGfTNJWc8RKABgP0FX5e2JQv%2FO809OKuJ9kmTS3Lc&X-Amz-Signature=4d01e4a68c9561a99ab118083bfd8b2bdc690200736aea5e0c6f7eb9c80f9cab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX7623CQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQD%2BWB5buwM%2F4mk5boSfCmzMHCfOT2%2BNCN6K7KsvSSQl%2FQIhAJg%2F5ZKtvrOcQJjDE0fplC4PY6JLgQ1cvOTA2td8yENfKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBPEs2O%2BNujfvwcTEq3AMBhDye9DdAwRBUGrFf5gYI5qK9wmWsmrQp9o3I5MjRN04lNXBdsQ4JzGtOrfW03i81u8izuvjp4AFGdUwGBdCbe94APcxlpcqXZheHsay10WnENNeUQcF2Bmohv1eZX42nz7gZiYI8B1GX44kAg0lIQ3QeqFM7lXVxh4zYBZpvvXgwKHFdCzaHXg0L%2FtTrq1zIsR5eefGNJwPd36df%2FqEezn7qBY1IJo%2FXeHmMbLSXMqw%2Beiu25r%2FrM7UM6P5a4vfhIc2MGf%2BcVQHnkxYOIl2a3gi77M6teTdEXBmyefsWWTiGT32CYGFAdjzHNu03qqMef52O6%2FUwCfFkoZHTgwX6qyXypOafoGqWgPwC%2FJmzs6OLl%2FnMoYGmUGH3iklLsTId7nhQIpgNzxOX%2FshJOkaVDT18JhfuyQSYnjFkl0x3GI6BvZ%2F6At%2BrC2UxQamJm9V6%2Ft996PUytK%2BTqRGJB2b4ZbwSlgyclT%2BtlQGTl70%2BgW92a77s2nLLl8cc00wFBmYW%2F3YGwuM4AJBuP8JIObgdov7rktKt59J3e1iLBl7ZnKEyayOu7ya7Gq7bJ%2FPx3suaKQ1VYyIa7%2F1gL7LPzFh0Jl%2FreecMQ17vDyRkh2NFY8F9oGe9whpaVUNkbDCC9OTNBjqkAdSf%2FMTKNuhU2KMWLuqXxjZwYZz5W%2FNCC2bXL8Mum1Hp6dHlaeMwVPSX3R9q7rpLRx5k1Lf5m4lGJExqH6GP7O0bBnSzYI8L1T%2FVdbYFgkByNojZQjdRVJ2EnY2IdAYhhOcAmHZ9kgPXWNz95Q33aTeNSwmaVq2kq%2FKpNzudyp2Bf9yfJ26jtc9KioKQglUX9iBnoRaSa97U6wmPDSNi9U26LLgW&X-Amz-Signature=644529dd724a0635e3896c6a579256e2dcdfea7240f2fbaf93a1f53e617d1f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX7623CQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQD%2BWB5buwM%2F4mk5boSfCmzMHCfOT2%2BNCN6K7KsvSSQl%2FQIhAJg%2F5ZKtvrOcQJjDE0fplC4PY6JLgQ1cvOTA2td8yENfKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBPEs2O%2BNujfvwcTEq3AMBhDye9DdAwRBUGrFf5gYI5qK9wmWsmrQp9o3I5MjRN04lNXBdsQ4JzGtOrfW03i81u8izuvjp4AFGdUwGBdCbe94APcxlpcqXZheHsay10WnENNeUQcF2Bmohv1eZX42nz7gZiYI8B1GX44kAg0lIQ3QeqFM7lXVxh4zYBZpvvXgwKHFdCzaHXg0L%2FtTrq1zIsR5eefGNJwPd36df%2FqEezn7qBY1IJo%2FXeHmMbLSXMqw%2Beiu25r%2FrM7UM6P5a4vfhIc2MGf%2BcVQHnkxYOIl2a3gi77M6teTdEXBmyefsWWTiGT32CYGFAdjzHNu03qqMef52O6%2FUwCfFkoZHTgwX6qyXypOafoGqWgPwC%2FJmzs6OLl%2FnMoYGmUGH3iklLsTId7nhQIpgNzxOX%2FshJOkaVDT18JhfuyQSYnjFkl0x3GI6BvZ%2F6At%2BrC2UxQamJm9V6%2Ft996PUytK%2BTqRGJB2b4ZbwSlgyclT%2BtlQGTl70%2BgW92a77s2nLLl8cc00wFBmYW%2F3YGwuM4AJBuP8JIObgdov7rktKt59J3e1iLBl7ZnKEyayOu7ya7Gq7bJ%2FPx3suaKQ1VYyIa7%2F1gL7LPzFh0Jl%2FreecMQ17vDyRkh2NFY8F9oGe9whpaVUNkbDCC9OTNBjqkAdSf%2FMTKNuhU2KMWLuqXxjZwYZz5W%2FNCC2bXL8Mum1Hp6dHlaeMwVPSX3R9q7rpLRx5k1Lf5m4lGJExqH6GP7O0bBnSzYI8L1T%2FVdbYFgkByNojZQjdRVJ2EnY2IdAYhhOcAmHZ9kgPXWNz95Q33aTeNSwmaVq2kq%2FKpNzudyp2Bf9yfJ26jtc9KioKQglUX9iBnoRaSa97U6wmPDSNi9U26LLgW&X-Amz-Signature=bc1a3b3c6d3124f21f874b58d8f6635df6a92ce1c9a5a6091e6647ce0cfa39a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHWGCRJ2%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQCrJAxmuktcNfdZwK5gE8V53YydzqYUR65iJ84GdxVRTQIhALUKBvEW%2BuBEOR5iwuMAJASOJHx5SH5H1lS%2Fib%2BHAM1fKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyGihw%2Bl%2F5tz5ebFxoq3ANBGsY4AMsaHCi6ZHhcKFUD5iiwWKAGdtT6fRiMkPLvXpz72KzHG4fqxU4azE3ZXiRjGjlwhFKiFDPhH3rljSAVaAHTTNVkVJas9MoggkmtXRIXEdnMLsLY8gG9FrfLODIX4CN1Dap9GF%2Brexcr2ay3FfxtiJ6UX1ZLc5FNNnNVeduhzp14mpKuimT7BYOE3AHzR71MCatW6kjMWlfuEYUqfIqqXO43CjYen7auwu%2FKspyQql4TMIMiFiJwGwg15t%2F5F7lr5HxqFqIZs8GPuc4WHwmoQTE%2BKnmEh3t3QfccOjQQbMXK57mK84Ixz5LC4lEknj1kGmA9GwamqJ3y%2B8KfGGG17eALVGj1z1V1exd9Heh9iWZJF0HZfC0mePRN214YUgK%2B3oekOTOvEGE21mKFAvj5CJdd7EWuLn7M6rUScSs%2Br7k%2Bcu6%2BoazUSbdRQ1uvpW7QGx5dPvA%2BNJ4CUenbzfQJmUWhkEV8ZxV9kfhFxEggzwP5N865Rpvpz0sz7tCTyZAyMJGKmjEygEKafz9HFZWQLcQWJ05idHqIA9nC%2Ftn0OGS3mLomrYcUDuwdKHk7H3%2BpQbZFleB9MN%2FK2pzNv8suqLfhs1dZyQDfoBvztanoM5r0Bl3sblunXDDN8uTNBjqkAfVkS5KJtBu2e5f2GM4BaeIazyIWT0Y7S568%2FUH%2B%2FSY%2BNbUd9%2BJ0RsiCm8k9U4aeN0cvkMf5mOer1%2FUYgpVU8RjkrQouWqFq5F%2FdC%2FKvscdwpq5D%2BXDGitYmvV%2Fr24adTrYcAN7WXmAW7FHPtmslkgyDhz2S38SMiI1yw2BZjGOdtxnl7MaqvLKQA8RFs9cXa0FXVhSCh%2FCMwesDkqIYwIyYWXtX&X-Amz-Signature=0c605ea21cff511e0117ada4442484e670b5f6b10edf947bcdf16e2fa628e063&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NFAL6MW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIHmMBjfKnO5%2FIjcqvoGddn1yZr%2BiFl4lJP25l0j%2FlnRfAiAo4k97xHZsIwd%2FrMxrvPep4mZEJiazHYEauHxs5izqCSqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9qioQsH4lh077TjMKtwDcuCF5HzxmlHX%2FhjIyp2yIjcNTsthW78O1DEj%2FKK3JMf2gfT%2FHlHLM6r2oruL63HYUdAaa1pvbQvZqGwBYG6zaqHmG4bofOWUdw9oO92MVK6MvTuEx6ZLrEWUR%2FItooW1JMnKOReGtte2VCTdHewvR11mz7HousQfNI9Q5tUZ%2FvTlxtkEQXVyx633GLVsZlqUCNqepHseu2o%2BcyZA%2FvvX2e4T3a3ySLGAJIdpgkcsVqKdWx4J%2Btlu2YzU%2BlQUVZmlUzHlnxHvdvQWsk2zhEUlvXbd5oDq9QamRZGSeWhdw9hK9FrgHKljsXVnCANtSAaJk2k9ftIQxoGh6epT0yftqxsCqiZZAqczk5NXFhe4vxfitp2P3Ebv7srl6Th3xmL0E4vSxxjMYlYK5kLY7olMcx958ZR2xCRDotaUT%2Bmc%2Bcpn%2Fs0Pfr0fPpzV2OFs0Ghen6DLXIdYSjhz63RwNxEwoDd5FO%2FFueEk6JwKcz4JDajZh2QzS%2FC6eJFD3EAKOBIM6oU0S8ZCk0LP3CLrkP7Ov2lA6tCazmJB1rhjL8p83bKk%2FALtkZKRTzLOZ%2B7utkEKjFaGATywqU8dBJeHCGKbJrPCroP9yMlNC5Po7SoIth8l86A3B1XK3a8q31IwrfLkzQY6pgEKdpQ48ji8igQ%2BtXVgefPf%2BC8Bib3Ol4ro1bN8wBb5CF3bU%2BNKDx4%2Bf8bjElAtjSGYVl1B%2FMctNkdEdG%2FTRtBdpiQN9CAHqOk8Nl8iIs70JVkAPLGKh%2BXkPRvkUS4PiwfE4X108xtqwETXJnU2C42lD%2FmPpWgKNLj4a8L6r7COgkYej8hIsIPWmKxPR1jyhUBZrz2x2FrxdT7BBd3S%2B31yeSIUV0ln&X-Amz-Signature=40b26c8a613c78044a140f9f4e7d325e414e251f64d0b5c6166102f355539f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NFAL6MW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIHmMBjfKnO5%2FIjcqvoGddn1yZr%2BiFl4lJP25l0j%2FlnRfAiAo4k97xHZsIwd%2FrMxrvPep4mZEJiazHYEauHxs5izqCSqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9qioQsH4lh077TjMKtwDcuCF5HzxmlHX%2FhjIyp2yIjcNTsthW78O1DEj%2FKK3JMf2gfT%2FHlHLM6r2oruL63HYUdAaa1pvbQvZqGwBYG6zaqHmG4bofOWUdw9oO92MVK6MvTuEx6ZLrEWUR%2FItooW1JMnKOReGtte2VCTdHewvR11mz7HousQfNI9Q5tUZ%2FvTlxtkEQXVyx633GLVsZlqUCNqepHseu2o%2BcyZA%2FvvX2e4T3a3ySLGAJIdpgkcsVqKdWx4J%2Btlu2YzU%2BlQUVZmlUzHlnxHvdvQWsk2zhEUlvXbd5oDq9QamRZGSeWhdw9hK9FrgHKljsXVnCANtSAaJk2k9ftIQxoGh6epT0yftqxsCqiZZAqczk5NXFhe4vxfitp2P3Ebv7srl6Th3xmL0E4vSxxjMYlYK5kLY7olMcx958ZR2xCRDotaUT%2Bmc%2Bcpn%2Fs0Pfr0fPpzV2OFs0Ghen6DLXIdYSjhz63RwNxEwoDd5FO%2FFueEk6JwKcz4JDajZh2QzS%2FC6eJFD3EAKOBIM6oU0S8ZCk0LP3CLrkP7Ov2lA6tCazmJB1rhjL8p83bKk%2FALtkZKRTzLOZ%2B7utkEKjFaGATywqU8dBJeHCGKbJrPCroP9yMlNC5Po7SoIth8l86A3B1XK3a8q31IwrfLkzQY6pgEKdpQ48ji8igQ%2BtXVgefPf%2BC8Bib3Ol4ro1bN8wBb5CF3bU%2BNKDx4%2Bf8bjElAtjSGYVl1B%2FMctNkdEdG%2FTRtBdpiQN9CAHqOk8Nl8iIs70JVkAPLGKh%2BXkPRvkUS4PiwfE4X108xtqwETXJnU2C42lD%2FmPpWgKNLj4a8L6r7COgkYej8hIsIPWmKxPR1jyhUBZrz2x2FrxdT7BBd3S%2B31yeSIUV0ln&X-Amz-Signature=40b26c8a613c78044a140f9f4e7d325e414e251f64d0b5c6166102f355539f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK7SFOCY%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T123646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIBxJ%2B%2FxH4vONCI%2ByCB7BTZcbMqk2t3zUgLcgaF9JA%2BzSAiEAmrYb%2F7H9%2FFr0inJDVifAxXNsAkJB3r96jHFXDVDwnJ8qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMPB81fHxT4fNh%2B7yCrcA7%2FbsFeFqxUrG3D%2FOcIRDyG23T00kugiTXsHOFnEFTL7v97vBKUHMc4jvvT%2Bi9cA3dWUvmvm25f7UdMtCaAKSXoOrWn%2BVQfh7cLPIiElI5nHvFMh7CN%2BfGkIw5%2BJMXRpj7M1Ip5W1ExWrMn20DQ4VkljYX44res4NUhVfwJX%2Fkp2AbFKzimnvhiUuCNq2MX7ItjBWJSZjx7gz6UnaV8D5BipKTNCc6YeQIkmymx090%2F8%2Bwndd%2BjOvvB%2BTjgCwRJTQKvvBQ8NX6BiN9v0INCJHYgboyC%2Ff1cgjoW9UCJ%2B%2BWJg0gw0Qxcc7pN3lloS9EZpryFHXgNoJbAtTazvV2WVp%2FHLQDwYpaJ5aGlYuRuTi4PAbXMq58Ret94lOkrPt9qti3hrVSHR518Rkpi5HnKqIiFQo6DFQ2g%2BdFp8yzf9vzYHleLR3XRf9vb9U2Fs3fBcAbFovvW1X3Jmcf5ftlJVMcTwBR3uJt8KHz68hytmNeqykR3Mn%2BlJQbGWzLTDYKeRdNJDeN45qXAVXOUxOcSg1TTW5FzwVj4cgnl0Go5IoqrunCqTb4tXUXnVa4EmHolLxt%2FmpaSm6YEOMTRLCRdwBfeIBTqnL3x9ZUQyIK4EQV1uGmm46P%2BTMm%2Fqnqi5MMjy5M0GOqUBkYruWRe8a%2FPPX6UH1zGgTlyEGQ6xEHtLpQR2hym21cIrC7gZ0YfS1imfrNqH%2FG5MCvLoqiwP0ETnEj2Z%2F1%2FvonJUxl2XHvqK8a9724Ol64ai00iweJedohYB8f3CtJ%2BN5G0nta3fxLXWgAgRZGfJBrZb18WPGfhVgOCcZs79NZCZb%2BBTw4pztXyTNrOHhT7aW%2B7S%2F6zz54%2FeJuW%2FrGKMBcEKJgj%2B&X-Amz-Signature=1c6d54a4c1aeb47cebaa4ee1a7b61f698908a78ecc9ae5904d6f98241c93d476&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

