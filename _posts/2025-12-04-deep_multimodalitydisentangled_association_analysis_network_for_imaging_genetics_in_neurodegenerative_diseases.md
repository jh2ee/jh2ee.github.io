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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BBXKUAS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCDNlHDSwVZzyaBr1JH18r531W%2Bx%2FzTCQEHBvWF96UALgIgbmj%2B1WGsIxsldaFKL92DKqC%2FtooPz3vf2KN6f9aIe6IqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPf4G8RF6b%2FHpFjJGircA%2BTbJX4FEdIjvikwf1VmqV9QvQdS9U8PZuX6j9HhtE4Ra7VYY%2FF1X%2B1B0e0M3rOZM9Sj5ABtymIO347u0AdjNksZGnkkg%2Fd7ecUon5iagyv4%2BiLQ6G2%2B%2BLvyZlX9Ys8ZlXVRec0jbxiQogl5SbYKWNnY0alozEK3QPBuSFc%2Fx4Zt98mf22152Ypy14WNVGmIqhaBFWNsgQb20XgL3IBmqjktDRPDeh84v%2B8D%2B0gXEevuo7w2yODoeEZl91YahrHJk2cUMxFLQhB1C0cDMzxs8xLrHI3Q3kS%2FurnhDBCB4PBIYahKFKrr5K7AG5WwbRimArhkNsWoXFnC26IPiMlmjLw6Fkti3k4S%2Fq6r8vU50DgMtebAJbbbORITeKAQ2g3JPCd5qqOn8kN45mL1wdVSNuKgKNIIq%2B%2BvmYMd5wEwHZ7qMebWw%2BPgC2%2Fg%2Fi1P3iaoQisrg7HasYwiWyY%2BCOtp2ZWgMtGnu1IyQbzJjR1z%2FxoD%2FWmN9lv6fDfXKnj0WRNbSZF3EJ7mMXptFk5EZRxnjoC96cf8ZqEynhSbnvD0hn%2F64%2FlzxN4BuedLmdgoVE22E4HBGbfhX%2BW2WOT1NmAuAP2VlV%2B5pGzdL7Mz0HLNgVjTfFhTq1NW6c8wYSgJMITkks4GOqUBXvjqofdfdFTuez0ygvwnyqmJjf9rk1p%2FDDMZstPGuLaMob5%2Fs91o12u1x2XBE%2BG9SatgTgkbG43g78TAhNE6B79s3FjJZyZ%2Fdz0vevC9lOjirvXkh%2BMwUabBLG3dyjn8G88a8sVJ%2B1A7h5PMfcPdA7CDrDn4v2H4Csx4uzO5%2F8aGo%2BmETMeFdAsF7zBRCrgy%2BFU%2BRLuoBuv5TvLw44NGoAMQskuw&X-Amz-Signature=bce44ee8bd2aebae1b0632b02002575a910f11fc835f0cb2510851fe2e41851d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BBXKUAS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCDNlHDSwVZzyaBr1JH18r531W%2Bx%2FzTCQEHBvWF96UALgIgbmj%2B1WGsIxsldaFKL92DKqC%2FtooPz3vf2KN6f9aIe6IqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPf4G8RF6b%2FHpFjJGircA%2BTbJX4FEdIjvikwf1VmqV9QvQdS9U8PZuX6j9HhtE4Ra7VYY%2FF1X%2B1B0e0M3rOZM9Sj5ABtymIO347u0AdjNksZGnkkg%2Fd7ecUon5iagyv4%2BiLQ6G2%2B%2BLvyZlX9Ys8ZlXVRec0jbxiQogl5SbYKWNnY0alozEK3QPBuSFc%2Fx4Zt98mf22152Ypy14WNVGmIqhaBFWNsgQb20XgL3IBmqjktDRPDeh84v%2B8D%2B0gXEevuo7w2yODoeEZl91YahrHJk2cUMxFLQhB1C0cDMzxs8xLrHI3Q3kS%2FurnhDBCB4PBIYahKFKrr5K7AG5WwbRimArhkNsWoXFnC26IPiMlmjLw6Fkti3k4S%2Fq6r8vU50DgMtebAJbbbORITeKAQ2g3JPCd5qqOn8kN45mL1wdVSNuKgKNIIq%2B%2BvmYMd5wEwHZ7qMebWw%2BPgC2%2Fg%2Fi1P3iaoQisrg7HasYwiWyY%2BCOtp2ZWgMtGnu1IyQbzJjR1z%2FxoD%2FWmN9lv6fDfXKnj0WRNbSZF3EJ7mMXptFk5EZRxnjoC96cf8ZqEynhSbnvD0hn%2F64%2FlzxN4BuedLmdgoVE22E4HBGbfhX%2BW2WOT1NmAuAP2VlV%2B5pGzdL7Mz0HLNgVjTfFhTq1NW6c8wYSgJMITkks4GOqUBXvjqofdfdFTuez0ygvwnyqmJjf9rk1p%2FDDMZstPGuLaMob5%2Fs91o12u1x2XBE%2BG9SatgTgkbG43g78TAhNE6B79s3FjJZyZ%2Fdz0vevC9lOjirvXkh%2BMwUabBLG3dyjn8G88a8sVJ%2B1A7h5PMfcPdA7CDrDn4v2H4Csx4uzO5%2F8aGo%2BmETMeFdAsF7zBRCrgy%2BFU%2BRLuoBuv5TvLw44NGoAMQskuw&X-Amz-Signature=bce44ee8bd2aebae1b0632b02002575a910f11fc835f0cb2510851fe2e41851d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NIRNFZS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClYrTDA9PzX4CcljqAIkQ4NBJ%2B3o%2Bda9mRX0L%2FPWAtXgIgOWwVisH3pusWwVFgj5dUjMOyvi4z89d39tvpUvdQIs8qiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKkzytr0HH9AyW1uCrcA34EPMcKRV%2FtPohRMA8kxY6MMUZDxTOEpaAVPkq5ZaBpao1PjDpCcOXleBDeHiRkNTRBRVZL9tVSe12DQD1LpSyPGi2idHcaByGj7tnEgItEr4F0%2BtmFi2oSQ17kf1AjsW5MSbOidleFeOzihJjIUeqHllU9KWL2NqhK5WJ5QVoRH7%2FD5q7Q3HS2DHjKkbpAJqZ%2FjniBLjruhJ4fS%2FlV3GHb5O2nbfB1CI%2FjLIX9eCixthEDVdU%2BWryvSAiixooY1cgesLqcHkipKeLp4BZjsV5Wu3Vt%2FjhJSGwMKEIiTQ0lKR5vrd%2FuR66MuypVxFUoL%2F1mJagaC0E61rWmWodvuZ49gJgg71Pca1XlhGKICTsbp%2Bc1WoieQHDxHO0B7lmZ%2Flae3BdUg5CdAZNtf6ZdADS5HWbj5sReRGs0DdABfB2ewtMAU8Hsi88nINdTJZV2F%2FgbRHhCAGTtrmojKdawMZ8WNFAr5eyEQ1QEox3RoNMJQULqMVfj8FAI%2F5gAV7S3AbZWawGcmJkwd7g2l%2Bw7ZYR962CPlfJpqk7WgEvayTzhBEuS7%2BR0AaXBWs6GHN5JMd7TvkfIiR4VjYIHo1BvsIeGsc0PdknBUwp7pLvFIB9EXxv1D%2BMS8NyK6pGuMPrkks4GOqUB%2BgmFVXiHWzkVuGvFuoFSLIinkQ4nlMUXcdejlH8wtT2h8jr40ij7Qrh2D3WECpX6ylFA8X46Sn05mc8RfeEjXLQnRFGkOXaHb7YLuuHUYFp0iHvFbbSoOrLRrmXY6PweZLncbP9ab04de8PC%2FIWJ41InjEGUsx%2FOVQ8ojgsnUG3d7tPjI%2B2ERMyriWAXHhFzVJwVOrauRmI855ldvmqQzONOAOpP&X-Amz-Signature=e2eb9678651f100553aeaa23dfff40569a2b9fab9edd98fdcab24437b536cbd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2PQDYO6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBu9E%2B51FUyPO8f6CVCczXHdU5Udkzk5%2FeP1G9OB8uuKAiBAYyozAYIYE6IdnXVh68qhccJjyxgZQ9APMJA2qvtvbiqIBAi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGnvymBh7AmekhVbwKtwDwWUNLOqkOEIjzuJ2dy33BgFQdsolnu58%2FZ0ys9c%2F9A02Fnhn4zH9NCERf6x%2FGIfEcW2teTBE2sYzP1qMeVFu64yqzznUhVKlGE%2FcgRYv8yw3IMRr5%2BaBopjbz2h3Hc9qq0sf8%2FSJFcjHlfb6mJNtkWlqW9nskCRBNkG9gO3IKqB7l8wRBjMyeykKQ4st9Zhu6fDbntprbSOuq3sQd7y%2FGkqel8DdRuHYmzY3EYgS6BNU%2FL44D06BiONPzpaQiYBSx5EHOGzJW55YB%2BnM2StaN1Wk0WYnR47%2FnQQSdHAaigf2yo6JpLnKfUMhMl6kSvMemw3auKxfSuz985TFmqQez9qcA5FxaTGD6oNdR%2BGJeRPkLPSUgO2cMtUUv0uPV2A0uiBr%2FF0N0trGcKfhqIGkAaopJOveEDw4iPaHu3LASiGKPj8bAuceQ%2B%2BLIqsDtqzmHziMnKPBITCZi9DYahVxsZQC1llnWgOlS5fsA0wsvhtjOPPYKCXAHtvRNiWvthyfk4b3ozGbBt3%2BPhiuVUyY%2FRVYPR2OzetKnOw%2FQmssX3pg4tmC3W52Pz75XAVwul4rVQon1GUR%2FEI9SdqJ9fsxqwtt5beICbuLKQS%2FqFFaHogQbTuN%2FcWKzM7ygfUwt%2BSSzgY6pgFmA2tRdMh4gr%2FweKclLU%2Bdc%2FK1mXndOVWz0LIY6jPrQLqzLeji0DkIABo7CMKxRxkIMATiy8SvMJ8dCjG2zjiNdv8CadI3N2K9YyuMTzcQDLMLO3%2FPUrojLCrYAQ0z9hJCsxRSvAh%2FzK7%2BuFbCSMxZRwJlYwKGvMlbg0FpQvLQ0VW12j22edhFrSMWh3%2F7PTKiBTIV%2F5NkkI8DdFPcqjkYB9s%2B5g2N&X-Amz-Signature=22dbdbfa0c3d643a4422e52bb2bbcd25283b2d72fdcad3a3f33657d00db399e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2PQDYO6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBu9E%2B51FUyPO8f6CVCczXHdU5Udkzk5%2FeP1G9OB8uuKAiBAYyozAYIYE6IdnXVh68qhccJjyxgZQ9APMJA2qvtvbiqIBAi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGnvymBh7AmekhVbwKtwDwWUNLOqkOEIjzuJ2dy33BgFQdsolnu58%2FZ0ys9c%2F9A02Fnhn4zH9NCERf6x%2FGIfEcW2teTBE2sYzP1qMeVFu64yqzznUhVKlGE%2FcgRYv8yw3IMRr5%2BaBopjbz2h3Hc9qq0sf8%2FSJFcjHlfb6mJNtkWlqW9nskCRBNkG9gO3IKqB7l8wRBjMyeykKQ4st9Zhu6fDbntprbSOuq3sQd7y%2FGkqel8DdRuHYmzY3EYgS6BNU%2FL44D06BiONPzpaQiYBSx5EHOGzJW55YB%2BnM2StaN1Wk0WYnR47%2FnQQSdHAaigf2yo6JpLnKfUMhMl6kSvMemw3auKxfSuz985TFmqQez9qcA5FxaTGD6oNdR%2BGJeRPkLPSUgO2cMtUUv0uPV2A0uiBr%2FF0N0trGcKfhqIGkAaopJOveEDw4iPaHu3LASiGKPj8bAuceQ%2B%2BLIqsDtqzmHziMnKPBITCZi9DYahVxsZQC1llnWgOlS5fsA0wsvhtjOPPYKCXAHtvRNiWvthyfk4b3ozGbBt3%2BPhiuVUyY%2FRVYPR2OzetKnOw%2FQmssX3pg4tmC3W52Pz75XAVwul4rVQon1GUR%2FEI9SdqJ9fsxqwtt5beICbuLKQS%2FqFFaHogQbTuN%2FcWKzM7ygfUwt%2BSSzgY6pgFmA2tRdMh4gr%2FweKclLU%2Bdc%2FK1mXndOVWz0LIY6jPrQLqzLeji0DkIABo7CMKxRxkIMATiy8SvMJ8dCjG2zjiNdv8CadI3N2K9YyuMTzcQDLMLO3%2FPUrojLCrYAQ0z9hJCsxRSvAh%2FzK7%2BuFbCSMxZRwJlYwKGvMlbg0FpQvLQ0VW12j22edhFrSMWh3%2F7PTKiBTIV%2F5NkkI8DdFPcqjkYB9s%2B5g2N&X-Amz-Signature=3308f064f9c8f2de8785f4aac9f6ee26e9f273e26b26f230447b5437d73b1901&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNZJ2V6H%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBK38OKpDkCjDiNiM2bcHnb4iv3wLFX5MgmYrPk8PAg3AiBTW0BnJKZeMTvlF7vnaYCw7NgZF4HZHzIkc8ZhSrx1SiqIBAi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwjZ%2F%2BTDfDKS4OmEwKtwD70WIDiBK63zastmEbUyfKylsnQyet5t0D9yDewIWq8rFfg7U1l0LE3T5qWiFgGrvi4yUuGy9oPdFEa1sKYgXznOKBIvIbo4CC6vev5HLePKtWPKq4HM3rb8t%2B3m4ob32gsQEqE5Q6jdYvQv4P%2Ftv%2FSi%2FseE2vHQfBcLS5npTtWAyHCHiS2%2B6pVWuQALR1zM9vnKaJm8ojvSqYdcF6yE12US%2B4ZWeNwUIZ1GmBEkhyF8Y0m%2BJBAmGqXNnTNDgYQiGTxJJ%2BfCcXLwqObXP9xDdpivhQPNQcQ%2BKD98mryvye7OsSuIvuJQLCPrBWyDin2q1qxBcUe%2BH0cC43sIUqyKkYsNxuSjKZsLkW3aDDgWOLUns9GlY%2BsJhpqDp0SYclR9mAS%2BGk%2F3IUIDr%2B39UWe9SF4EzfV7vgDIuve8WFzMmBH2i9j%2BhI20CJvqibtUat9%2BxWg3%2BRBag7Vg8pB2uy1OAQTzTeH5oPvoNvJnNtoBQhp4Bc7l0z3aFnZHWRGGdUu12%2B3Dn9tWPSqltmPIB123FD74AqpZoq7DKU5SMuyXmdEvzdI7DUSaJbZBxH0TAho%2FgdQGYqa8rG6pPqzuvQZwXXKZv10mhJCLUOA6hX4g6rpWyAbd8IfXtNnpNhPowluWSzgY6pgHmvm7xKVajrw56%2F298OhSi%2FytUgbRjA1Axix48sKFZeTJ%2BKmuISDWV3bKfQzx3mf9fNSaQLz4VyatQkm5Fh9lUnIRhdwcuwFyZOEx6gEQ99qzbsP3ueRk4gvrI8LoqeZzA4EsiQ9UlG4pv4hv%2BSN74k5bEfjYqAbM0h%2FCCdtIfa4YeY4mEFrbG3IHE6mEPB%2Bq48kqf2gbtqLi%2BN1eXbsIq6ABerAWb&X-Amz-Signature=9c7f06b484e204bcd2b53897c0d695ac6eaf092aa3c20ebc707508f11a772106&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLNUBLXQ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD4EFb9iTKQmEPRDj3%2F%2FGdy6vRKgpgLNUYf7MIDS3LMswIhALnDxiT5O9wfv33pY0UwB9PzMiqqLvp9S3qgbIFVo4omKogECL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxL4%2F1l22iTAO6gd6oq3ANSPH%2F3dmkYEhRV0BAvhKfVrzR%2BFA8uk6VLz9wzoUIOHc8BJDJLGFTbU3ZRE3D8idoTEszvdyrDrq3FZEKXBJkiJIOPF%2BqJVhf7VK8ORNOZ2xq12yKHjcoN0lsPFJgvdADjF9NXI%2Fg48ZmqeMA3aMvAgOaRA7wfuptGkm5Ug2V4PfGNy2UXVhxp46oIZFL%2FYK9KgmKwOShvolw9GIgJYCrfv9%2F7KTEjt3IbDMHoiVcFyXnuLBK4GHJYo%2FFIRMyq959wYFdEbwvbJwz80EH95dwJRS1j0Vs76c12XdjOUlW3YuJI%2Fkn5fKqZEnjoVgx3kliQ3DfI7C%2B3XOvTsNg3aFh1UtiDGV4hBWsDRp3MsejugC%2BHM%2FsRx%2B9438ZWEIBMluphun9oLnX2oKl37Qy3HemKEfrhFxzBE%2FUGFeM03OPHjlLrXaVYfO%2BO9kD0%2BlYduz%2BukwLxWWiAMsYXKSsCXwltx6q3BW4T1Hojcg5dFm4B%2BQbV7wOFn3SvNNCsoLvIca23zE7xVyqfYCSNJkurhNMvwTxt4Ie6YuZzwYatY1DVUqP1RsfafXfPxcTIGzLLfKgFr9tlb45pvRpxEkEHLuq9PGqmC0FH9S9yvY6FDS8oI4%2BXarfjYx1hOutS8zDZ45LOBjqkAZGlG6hvtUQgUBZfsTt1ERq4a7H7b5yU4LgAE5Pbo3jg3nqB1EJ74Y0izyIqNjCvwHMneAO0ezCKx8klVMZZq4XF9JQyV1fQk%2FPoLhUz4%2FX0pkIUBunHQ7pOuL7msxIjZoSW1jC7wrCXI%2F3xF01ZBqYhyszPI9yf8jlrtSVSdoqR%2BEx6AMLiAepASExP0fQuC5hyEnVSQrNAFDtnN%2BkQ0C7n6asl&X-Amz-Signature=bc7a7828c0209b5cd9b38bf37a913cfdd7d6fdfb83d3f9523962e97f3504d862&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662N6QZYW6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDN1xhXWzfqhTz9MD4LUobYjQSP87GBLtcnS0sAuhu2zQIhAPaBrUi9rtV%2BA75U35JpDBMPO6YXZwzjVuO7VJFfb9olKogECL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXKoyA%2BSBCdl1cqHYq3AP1bMa1ZkK1GDcdE9OtHxyHLcYrirQ7SeTUK8bpJ6KoVpIplDr6mNJOBvq6isdXiaA2AlQMnj6Xcet8bxbiWa17HozTzg6uWFoaPUV8ap7z52zfTS1Bivec%2FtVCnm3ZPBQeJcFpEFLN2AHqiIGNrnDVmAZmYwKwF1c3JUSqQl%2B0rU%2FTjrThlkSqaAdgILBMDSghK6z%2BH8B3jKjET3DTAtMEIfP%2BHyMKtBNR%2BNYoXdoeF5OuNlvCJQrFAKh9FA%2Fvt3HvfGg77HNZMDBxi4Q%2FJMklJNqTHLeeKs2Yu3OoA7xNU1uD1zHXa0RiTFp3e0bPJyLY2%2FkIGyMU2BUmPKNA0PZoRyPeLLRmoBP%2BjR7aodLmCM3ehwtWADr0dl3L6rbKZiwEKHXX9DSsUL%2FX9Ze2thC5D6gA3pd5gaGzPQR3kQce7IvH14G6KCne43SAKI6vkNRTnSlnEQNxri%2B0%2BcMMW%2BOedWjM7Y8vkvjzvfck%2FHCp5VxRdEWlkXEp6I796Xuh%2FOIdunX%2BUeyOJgu8JkvfqQotfyR7jAbdTv%2FLKhjSAeYZuAaqcjs4nYPQD2izdYFto8y9%2B7s9iu8sEix9vPKS2urSG2PHKlj%2FNU20915kMFqoAQHZ6DKBvMQY5ILgfzDa45LOBjqkASRNejOpi9xlfIiwaQuWZbRqnfpZCKrAyM8E26CCJCilbfHGaZN26hc1%2BbvfMlv7OqsQDdyThNWjVaIw%2BVRmbHj5LQfoz3VtzzzqRrXQMk0Vzz5fVO9C0a5jaDdvsoGC55NZnvb15JsmyEO%2BCNH3KDEHq5Du8Qng%2Fon0kH5tYwxg8D8FQR6cjOvnSvW8nN7l0Wz9Z1Db4ZOf8ij7JTcHPcFV2Qds&X-Amz-Signature=cb3f1a2b42cf24b3e5fba5007d3be3e90be2c0c5d43db1adcbc8c81417be004f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJIKL7HI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDb9axlpOenxgk8zOOVuTkPykzs17VVIYKt9throR5pkAIgRzKANjoMkXMxoZpgpUdDBwttMJ6dDBLlCwKtBa2rtToqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP0ETuIk5kMIowNaLyrcA4EsigG1T7VAcuSuwUgexS4nYVywq6oHZIGel6XhJdMbk6pGiPrEa8Y9LGJYWY6dVqI9KEhvTXVxrWhPR8e71waWMMH6avLOJ%2FeEZEy2c%2FHYrQevxWv9ZfN4mhWZx1VCxlH1BQlO36eJVCCKPsuNuFdv9AXzRuhmebmYpbuqijR7HV2b9CZUuynWTc7xLp5ym8ZgYPXzXQNYWrX%2FQbBUA%2Fj3lzr6qnAfSzzssZsIAcygeGmuhTPQoh%2FoU6mOFhMJc%2BDR3Ke7wY8zIHgOAlb0LrA%2Betl0R2qdjKVkyvnLu814o%2B4rHD55BKTVhGzvH2XJd82j5fvUB0cMkW4EUhSd9b8i%2BqSgxl6s0KkD2JF0p92ilrckC0mjaSWRyg5a2afCDSuSwzeDrLi4aGopfM7XNoYxMQ6y%2FmDjS%2Fw4DKfGHibcjh%2FbSKcXJG0vsOjOjGRXI5DXPYiGVwrRE%2Ff91aiWj9El0nMu%2FrhgDlnijsPBRHftO%2B5%2F05ONUFDUGUcEYE%2F34VAvT42qDdVCEBoMda5yOm%2F49ZcZ7elKviX%2BhaxgHy0k4OLytKxMiLyDc97xkLxxCa%2BvN7xdPBDNU9N%2BAuk7sYV2y7YznTBzkG9hVQqFG05l87H70i19ZOEubPD%2BMJnkks4GOqUBYEuxfjC5%2B33Lz6Xj7qr0ioOoMpXvWoQm1ki3RGx2o%2FDzkcgftLcvH9E0Z9r9P7cQXWUNJjxZ6Z18hVJdCvfIovJiAoupqi0HQOkp0hOir6nBrteaPTZUl2xy1hWjz4hHAtbZzYUaMCavSMC6OKUMwrZdna0EBIGwEMOlmAb5A3pGqzID0au9v130dgQldE03gSnmaA7%2B1QFMVk1P6koiGgmiLmcj&X-Amz-Signature=f9d6ba103bc13b4c46483bb38878002461d889e62ded2d8639fc2a7b8817e449&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJIKL7HI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDb9axlpOenxgk8zOOVuTkPykzs17VVIYKt9throR5pkAIgRzKANjoMkXMxoZpgpUdDBwttMJ6dDBLlCwKtBa2rtToqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP0ETuIk5kMIowNaLyrcA4EsigG1T7VAcuSuwUgexS4nYVywq6oHZIGel6XhJdMbk6pGiPrEa8Y9LGJYWY6dVqI9KEhvTXVxrWhPR8e71waWMMH6avLOJ%2FeEZEy2c%2FHYrQevxWv9ZfN4mhWZx1VCxlH1BQlO36eJVCCKPsuNuFdv9AXzRuhmebmYpbuqijR7HV2b9CZUuynWTc7xLp5ym8ZgYPXzXQNYWrX%2FQbBUA%2Fj3lzr6qnAfSzzssZsIAcygeGmuhTPQoh%2FoU6mOFhMJc%2BDR3Ke7wY8zIHgOAlb0LrA%2Betl0R2qdjKVkyvnLu814o%2B4rHD55BKTVhGzvH2XJd82j5fvUB0cMkW4EUhSd9b8i%2BqSgxl6s0KkD2JF0p92ilrckC0mjaSWRyg5a2afCDSuSwzeDrLi4aGopfM7XNoYxMQ6y%2FmDjS%2Fw4DKfGHibcjh%2FbSKcXJG0vsOjOjGRXI5DXPYiGVwrRE%2Ff91aiWj9El0nMu%2FrhgDlnijsPBRHftO%2B5%2F05ONUFDUGUcEYE%2F34VAvT42qDdVCEBoMda5yOm%2F49ZcZ7elKviX%2BhaxgHy0k4OLytKxMiLyDc97xkLxxCa%2BvN7xdPBDNU9N%2BAuk7sYV2y7YznTBzkG9hVQqFG05l87H70i19ZOEubPD%2BMJnkks4GOqUBYEuxfjC5%2B33Lz6Xj7qr0ioOoMpXvWoQm1ki3RGx2o%2FDzkcgftLcvH9E0Z9r9P7cQXWUNJjxZ6Z18hVJdCvfIovJiAoupqi0HQOkp0hOir6nBrteaPTZUl2xy1hWjz4hHAtbZzYUaMCavSMC6OKUMwrZdna0EBIGwEMOlmAb5A3pGqzID0au9v130dgQldE03gSnmaA7%2B1QFMVk1P6koiGgmiLmcj&X-Amz-Signature=aae697be4fa002144c05d4498e86ac01a26abc83b7881f231ef8e438490fead7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GRKFILP%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4rHD09DdXSlcExuTXkyJMNKgIkRC2JbnsxZFiYkkJaAiEAu5vIgxANQQ3XgnoA8N%2B%2Bl3ufB33FhmNoNWTOM1OQOgYqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEauMYa21Ggk21zWpSrcA%2FhUjueKpoy9derSfrCZmSB6CwflCkbX7g21roVKuQ4YNktotOqAiV3DLej2z99wM81rO4LeSa%2FaVZyE8GN92Pu2yQ4ju0KQf7dEATI1la0gjnu0mtrGy%2FBmJvFc5j%2B0hcwSG%2F8R2KSgD3OJC8fw9bp2ukSRztMCtjSfIDKVPF8qqcbVnsFg2H914nxmHIeaqCvX5UE3hLdt6aym9HkWADcb0ut4JQPta1eqrzU2rkmaqR3bvmx7pEkRvoPeJ2B3n9JVZEiHcD8cs8hc2MpCH8s5vYAJTs%2FbKjrcVRqVASbg%2FI9b7FY4Cs0Cq0DLpqNo4j6cDAhhMK%2BKrFwZlfhKzg9H3pfdDLV1E6hLV%2FFuhe5DBSZdf74yEr%2BPVP00ZYEVHyP9Gj%2F3XBIUsmjkhutWD3JOfVdJ7JAlui3TGsESWtgklNgaQSh2SNorce0crEL3t58YK34RYyCG9uT%2BYzs7h2oZZzP8MDmcAGd2NiE18Bg2gZlHlcWiNeypfPJ65xZynk5oqjPxvnSHwY1uaiK8VMrog8XZRNNcKnmnFgzJuq2xll%2BgG2WGQj5VoJ9mr1niEhSv7LJFZIoHsbAO06XdHB%2F%2F4GPSc8665ZSCwzDC1VIRTEtD8rqJvdSqlDxaMIblks4GOqUBKdO3h5ssouOp7Cc75kB6njQHCfGWsTzXNcSS%2BvP4MznOI51BqipzcIsuUsD4gwWPOixdlqpkoBtWKLvhIgS%2Fdrpt6oEY8K28ezQjoFUQNaKtp2g5CFATkYqrXV3Mu5QAPg4gg80ET5xzSAZ0z4EyLv1tipO8snMixBoK%2FXTez6pn5EVubXxOKSpMqIay4iEcm6LmR7OUg3ROmsGPnl2rGkMOe7hZ&X-Amz-Signature=358f25ab8211d3f53c843718a47fccbbf7255858f86a527ab2ec0ec0704248dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6JKGYNN%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDbTIn50byKDoKC4PKjUAb4pmcoJDbLpFr0JbX59yad0wIgWiKX%2B7cIq2oieT9K4Z97gSd1cA8DuFkxq8SKaJckskEqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXBRPQGYGHFYfR98CrcA28aB4TK5Xv7soqf9jylpWiJA%2BqUAewYxd%2FDbP%2FyumEYJT7umhVO62PTG4Us1Cz4JhUWAFJDOmkNJWsSF4zz7SzzeV94%2F7yCBmdFiUjUpgmr9NMIg%2FecdIGA8afsE61YVaUa%2FYKdsDgGJm2Nhcy68fK4ftAuUPakTMT17vmio21W%2ByrnjbxZzUJiZ1Z9Tdf25swapd9K5NC9IacTsKHYLFnElsyzTsmsiYAZLd3UxtMWvJa1ccsD1AC7NYFPSBz3oTiJ8Wv%2B5wW05%2B%2F%2FXvPCe%2Bro0izfocExoAMgwqdjsZ433xUHS%2FkgrcLR3dEE9UVWCPenvcFOMdp6OfNTo6WOKH29rlmGm59YwpGAbYTo9rtPjkWQWiWmqas5Qo2U2M9bgn128iHNvrzwxmBcNHQglsu%2F%2Bg%2FksQ%2B%2FOr273bVdHWUkrVfUMat%2BPdktI%2FcFNd9OgsKHgUzw2CfQbc3GIK6LzlogxWVEJJffWuwRZhQ1nu5s7Gj7PYjDAfY8NqvbN8%2BMHDQD%2FYaphq04cGGoxpCBHyglIltJ78Qkb%2BnRZ7eS6eAcQx4pR4GKJI7jf1%2BqNE3xYs1YeypybQCtpZTEMaaREFE0oDLYa3WXal4NJhgYD6a6i6%2BQMkDV%2F667a8HpMPjkks4GOqUBewaWE1f4rBgcx56QJ2HlsUQLCPBAGqtWwbZMzBEH2%2BTyJ8p%2FDI0LPqRqMWjZdEx9IRRfWxE%2FdYANr2YDGkx%2F5WptMy2SW%2B%2F2V4H4KIYEFQvnI09VNA4836DW8VVgj%2F5YW%2BCKR7MWei5qxNa5fjXED%2FKypwmVmeN%2FK5HrfiAV1472b5%2BmlQoOdizCv45l9sZEwUMiABhBMnD%2Fg8DylskjMZ4lxe%2Bg&X-Amz-Signature=30fb56439184f531c41d2924d90e9c8c549264d0bc3e60eade39ae910e9eb3ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6JKGYNN%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDbTIn50byKDoKC4PKjUAb4pmcoJDbLpFr0JbX59yad0wIgWiKX%2B7cIq2oieT9K4Z97gSd1cA8DuFkxq8SKaJckskEqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXBRPQGYGHFYfR98CrcA28aB4TK5Xv7soqf9jylpWiJA%2BqUAewYxd%2FDbP%2FyumEYJT7umhVO62PTG4Us1Cz4JhUWAFJDOmkNJWsSF4zz7SzzeV94%2F7yCBmdFiUjUpgmr9NMIg%2FecdIGA8afsE61YVaUa%2FYKdsDgGJm2Nhcy68fK4ftAuUPakTMT17vmio21W%2ByrnjbxZzUJiZ1Z9Tdf25swapd9K5NC9IacTsKHYLFnElsyzTsmsiYAZLd3UxtMWvJa1ccsD1AC7NYFPSBz3oTiJ8Wv%2B5wW05%2B%2F%2FXvPCe%2Bro0izfocExoAMgwqdjsZ433xUHS%2FkgrcLR3dEE9UVWCPenvcFOMdp6OfNTo6WOKH29rlmGm59YwpGAbYTo9rtPjkWQWiWmqas5Qo2U2M9bgn128iHNvrzwxmBcNHQglsu%2F%2Bg%2FksQ%2B%2FOr273bVdHWUkrVfUMat%2BPdktI%2FcFNd9OgsKHgUzw2CfQbc3GIK6LzlogxWVEJJffWuwRZhQ1nu5s7Gj7PYjDAfY8NqvbN8%2BMHDQD%2FYaphq04cGGoxpCBHyglIltJ78Qkb%2BnRZ7eS6eAcQx4pR4GKJI7jf1%2BqNE3xYs1YeypybQCtpZTEMaaREFE0oDLYa3WXal4NJhgYD6a6i6%2BQMkDV%2F667a8HpMPjkks4GOqUBewaWE1f4rBgcx56QJ2HlsUQLCPBAGqtWwbZMzBEH2%2BTyJ8p%2FDI0LPqRqMWjZdEx9IRRfWxE%2FdYANr2YDGkx%2F5WptMy2SW%2B%2F2V4H4KIYEFQvnI09VNA4836DW8VVgj%2F5YW%2BCKR7MWei5qxNa5fjXED%2FKypwmVmeN%2FK5HrfiAV1472b5%2BmlQoOdizCv45l9sZEwUMiABhBMnD%2Fg8DylskjMZ4lxe%2Bg&X-Amz-Signature=30fb56439184f531c41d2924d90e9c8c549264d0bc3e60eade39ae910e9eb3ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ROV65IN%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T060402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICkL003X%2FsKQd4xx%2FmA6EspiQmtrqn7mGpAdrQi2RmDuAiA1l3o2fWknguQsH4Cy%2FdxeACuCdprT9xYj12Oqua1xnSqIBAi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJnLsc56%2BElcobIttKtwDZz6Hqy25kgSP0Ld%2BCTGUzY2VqbxF31CIzqScrVugF3txoUyBMek1evvNWvnYmOb2M%2F%2BEtkTJh8IeDZCEOmtMuHVNhbNY%2F2pi7BU5BEnzr0piAwMYoKAFU8rVX3EVvgrNNcrHsZVLqF9zKfqZhuZePc8WnjSl17TVZI3%2Bp45pE0z1SEmjbhsRB9QPULbS98HNoX60cwsrIIC2vN%2BHpBSijj2MrDfzi67F12NWSi%2B%2BeofYet6E%2BsFGbNvMQ%2BaYW21%2B%2Bx9%2FgHpeambaWUPJ3aY0f99EYP5fIFHztovXt4XqnIFd5ad06EyGI0aJpK5dHV0qNHFkI2hgANFWTFuiKO%2F8d%2FuMqusy7mMnXS4ocv8DEpv6crEaVZkyfLhlH9j9ctMQgxzlgj7prWVwHDD6pN0yVX9xiYWVBi7FH83uyouj3Ib8Weug3dNWA71SQi1txLk%2FlJdr%2FX2Y7oPu0I1OYniXkI8%2FhNfH%2BS3oxRKfuIDgvSh5q50kOXt%2BegWCps%2B2AqMFM7DYyaJo6%2BZ88NSc0n9nP317MofG10Ryp2yxw4eI1fhO1EOPMpwu6xpCUl%2BlelN%2BEXQ%2Bqdid4ARKcUONdugH0sUH9fPRfBVjJKf%2BJLSvh3iqxpKTrfOcP8%2BsfQow3OOSzgY6pgGLM5FonaZPHfm%2BDNPGVs%2BcHv085XgYS3U%2B8OAZ55%2FoKEdbffm9ZY3ivmiXU5wXFh8dOo9h8vxkArKz68549%2B8e8PYcsSyRmRvJzIHd2FccBLjtx9tmuuyFrkNwdYyNCHarNMDOaaCLvwApl2EvM3Mw0cMwHzPeod93lXKivGF04fZAOSh0V9bh9SOegeVUU4naLxyg7VNmC8gHv5oQ%2FbOBQR2RV3TK&X-Amz-Signature=7324836b440829f5872f821354809ac2812689491754cbe54372c19363bd7709&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

