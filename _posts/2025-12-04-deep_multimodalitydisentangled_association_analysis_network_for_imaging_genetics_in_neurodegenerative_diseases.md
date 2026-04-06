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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USWAA4O6%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIHZdDV9XvRkNvwmszySerLzfYtAd7r%2FWaiHyJnZcDhn%2BAiEA55zVUQ9xfyDHzDe9mdEVzJbfuMutOZNv6CgX5%2F5J8dYqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDTwN0U47d%2BeJWkVCCrcA3EzzIZZCZaKafNsHWUOlYwuh1Ybpwcknquo1guBXikMerRgNbEsbED31t7QLxlJmWv9PWi4Mye%2Fun53M4f3BCyPmuixG24%2BYY9K%2FneWMkL6YOpOY3I6jtx7%2F1U11lJGrFv2PhGSja3gwjZm0C4itWUPP477ttZDqW%2F4yt32LCAtrpEdI1aB%2BY6i6LueX2AVG3Zy7SwZs4bnSbfax667DybzU9YpQEIHgUCQ8CZpBJ11QD3GCu%2Fpw5ZL510yb0UOFRSVQBi37wq2H4aJ7ZQRRl6LKc3o9VL6hv8S9PhMhyKWK8OUbFm7UE8ID6lvkyLVjH%2FRp%2B%2B6ZV6dLf5ZLUJih1c0H0YS8nCbM0qjhNRO0kezVuOlspl%2BBNRjS8gc%2FANcHbKcDMIHuX3Jjq0eYPKex898OPrIzxYnF2WE70zPGhaxpkt8yvMwFNvd4R4CbO9yGrLrPpSryQ%2BN0Nz36cQN0Ffk44irwe6sEjyLLGmc6Hq41ZO9PIyOq1Ry97X%2FbBMcTH0esQiIg4mtZCH6YA1BAXYk4%2Fbe77d9PQ1pENQqxhGvWNKM6spn%2F7%2FjmFhLS9S5sXweu%2FXGrxaVGbYsTG%2B8MhxcxQXTNy%2Bj03mLsco9NEe0RxQy%2BMdw7jPxQ4zQMITEzc4GOqUBy5m039qLioegO5DRAwGS9cPnI%2FME%2FKbjMOYTrXwB2hTRqcftoPYlofM%2BTl6wJandCTZgQkrijpbtg1wGK5j4iLR5UGHyDrLIxMwPaNakutC1r8i61sZjufu4lsrtEDGKrPmmKVY%2BAyLiqgKHdvvQBCqnhH6MZz0l1TzAxOt8ufIBSTRUlFuGrTr0L2oRZuYKtl4zEq%2BtXvHMNPZco%2FRCqn31fF9G&X-Amz-Signature=81e9ad06299fffd252dd6795a7b2bb1c1b31060ebb403bc99c41eca99d03dfe6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USWAA4O6%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIHZdDV9XvRkNvwmszySerLzfYtAd7r%2FWaiHyJnZcDhn%2BAiEA55zVUQ9xfyDHzDe9mdEVzJbfuMutOZNv6CgX5%2F5J8dYqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDTwN0U47d%2BeJWkVCCrcA3EzzIZZCZaKafNsHWUOlYwuh1Ybpwcknquo1guBXikMerRgNbEsbED31t7QLxlJmWv9PWi4Mye%2Fun53M4f3BCyPmuixG24%2BYY9K%2FneWMkL6YOpOY3I6jtx7%2F1U11lJGrFv2PhGSja3gwjZm0C4itWUPP477ttZDqW%2F4yt32LCAtrpEdI1aB%2BY6i6LueX2AVG3Zy7SwZs4bnSbfax667DybzU9YpQEIHgUCQ8CZpBJ11QD3GCu%2Fpw5ZL510yb0UOFRSVQBi37wq2H4aJ7ZQRRl6LKc3o9VL6hv8S9PhMhyKWK8OUbFm7UE8ID6lvkyLVjH%2FRp%2B%2B6ZV6dLf5ZLUJih1c0H0YS8nCbM0qjhNRO0kezVuOlspl%2BBNRjS8gc%2FANcHbKcDMIHuX3Jjq0eYPKex898OPrIzxYnF2WE70zPGhaxpkt8yvMwFNvd4R4CbO9yGrLrPpSryQ%2BN0Nz36cQN0Ffk44irwe6sEjyLLGmc6Hq41ZO9PIyOq1Ry97X%2FbBMcTH0esQiIg4mtZCH6YA1BAXYk4%2Fbe77d9PQ1pENQqxhGvWNKM6spn%2F7%2FjmFhLS9S5sXweu%2FXGrxaVGbYsTG%2B8MhxcxQXTNy%2Bj03mLsco9NEe0RxQy%2BMdw7jPxQ4zQMITEzc4GOqUBy5m039qLioegO5DRAwGS9cPnI%2FME%2FKbjMOYTrXwB2hTRqcftoPYlofM%2BTl6wJandCTZgQkrijpbtg1wGK5j4iLR5UGHyDrLIxMwPaNakutC1r8i61sZjufu4lsrtEDGKrPmmKVY%2BAyLiqgKHdvvQBCqnhH6MZz0l1TzAxOt8ufIBSTRUlFuGrTr0L2oRZuYKtl4zEq%2BtXvHMNPZco%2FRCqn31fF9G&X-Amz-Signature=81e9ad06299fffd252dd6795a7b2bb1c1b31060ebb403bc99c41eca99d03dfe6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNS2G754%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIF%2FbhPDDWAh%2FMhxpjT1s2yams%2BA1zTU3RuV1M3pzdDFmAiAk9HA0XQr8MvyyZIW1eFaNdBq2wjkZPrDJc3bQypfUuCqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfzZ9bksbC1wsvKN7KtwDAuYi32pAEPqayWfHk2k9uZpGPx%2BL6f9Q%2FgeI7eZtBp7z9JCMzDERaa5fM3MgUy6CvFGwwQHDiYbnv1RbuSgm6G%2BfUbacXNA2S%2FdK4xEtg9etups3dbFJYF0xRFqzW8w1V8UA3LyND6rZP8%2FpkGRFRqipL1vYqO%2BRLikEFDZjoz3W290RR3KBwqJ%2F5OvD5o9zOy9borUc4RtsG%2BgLB%2FZqef%2B9vcRlpXrx1Bh7iQJQTaRIgpowCa4lusJ%2BnfXw0IPv%2FnF1dXaCmuQZWJ3BhCfBRxDVNDHJaQpJufioU10F0jPM9PVwg%2FnwdK6Q0rP%2BfKz5Ivtn2VCqJ%2FXEiCiWSFzv9DnkexITqGeeAoNpY5HPRH812NQk8%2FuaGRoKjv%2FyYDm8xgrVF6U7QsA20PjDgZMDd%2BO9JH7pgJUQNtMJzyV%2FRwOBaH3ckUpUukf1aRGk84fZ3gwtThjPj1hMuwiu4Mkm1YGCfkEq4z8bcdYKFo4M3cA2hypt7si7Y5pjGTDcuCQLUi5kdkiLJ2BHPlHxuoYmo8fYGhRmOPuvTJUEwr4zgiIdA%2BTUaHUbA9RW7PWqx47Xm9HUdfgFb0Q4tK6J3dFBNv%2BpaDUU5fcOiPmk82hlBYWHtZZdCiYDhnzaYE8wu8XNzgY6pgGdPmNzOnGOktohO1%2B7ce25M4iySJcEDaNoKqhh5yT9s7DolF6dD2fQ0PfuAnctZlnytJLKMla5x%2FkWCNsPWw42Q2vQ1rQetvcj%2FQTJJ5mW5wAuYOrhnZmatA3vZBosyBkuZN%2FHtKH0ceVPuO1NJrX%2BEt3DB6b1p6Wx9EqSQEfKSieeuqIx2sukjLtAYQDyIiKPbo2ykUE4V40DmbGP9JVFQA1r4HaH&X-Amz-Signature=ed11855d8090e9cc79213798eb0c3bba2cf525aedf404a921b716b03d1e346c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT27KV4V%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCICCgzComZeref%2FPqSgBquyr5TCHApJHuFwEr2ENEP7dVAiBpf01mN4LTDz08sZrwBHgZAm9tKb7jRgA9aRgCv0jTSSqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMskEE9NMS%2B7ZXbn00KtwDTSR%2BPDNOye%2F40Sn1ucLq4LIuR7zL8gH%2B8mdtloHlH0eSQYvQ5nCbfhFDjyPUhAM%2B7MUENyXjaeglMxxvo4w81vrf%2B%2Bc2uH1Lat3BoeliW6xp1fN1qTQgo1sSaBJSeMqWUetojGFzPm2U6g34mtr8Ze3hu6jmKFCGBQbI6%2BxqXYombTOk%2FyDQY9qe%2FoGtOkz1fJ%2F6rh7J7Z8jcmcvrc0432xXlb1tDN76zelGCzL%2BFyN%2B%2F2qfrHqCXurXN1w8w20VEfO2mNjnhOfyzEU%2BYbF2DT0uHQf1nmrLHxGhSSxki1OUzghz%2BqXnmNx%2FYjNAkE2sqfPhEM8AxCDnCfv5I69a8NKFTH06ZaWGhp8YIX0eMz3NBRZfg8QllETpUQZPukBFkJioixFOmMm%2B438ZUfbGLXhYqMPqclHIpA4cFmmdXlaxosFYu3AGxPzgykqd8aOiqA4tr5okPwnFzol9yJka8dToAhGpRjCIUereZzlQglUHl1ckx66L8aDEvk%2Bmn2zXKQ81iHjFFl%2FU0jYIZgnes%2FPUOwJ2ztbMuIEMJerPO8abdxdhnXS5eE%2FAg4wF4IfE7ClW7%2BitpWd60s%2BsLqCfPEWS8ClWi2vxktbIxBmRvVoXrj8fjqcK53K3%2BlcwqMXNzgY6pgEPs4foaHbbFixZWgwWsV%2FXDh0BordAaVa8gUbiCjFc%2BOPrDVZEypi%2FsIofx8tVd40O814B%2B8BGBvZ7kH94MPp83PlWeoJ2MTR7e6WROnOr7leHHe%2Bis%2FZQn7JqmsLxb7icCr7ZJGxT522evd1lRe5K%2FDKjqhOEGgAGD%2FF%2BvGaUOQnv3oCEN6tze6rBJOL6FivDlIxLz0930F2yBbe0enVt5XatmhvK&X-Amz-Signature=7d9bdfdf83abc74b98b9c11238accaaf895b054bcb3f74c79c54de4c28701d8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT27KV4V%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCICCgzComZeref%2FPqSgBquyr5TCHApJHuFwEr2ENEP7dVAiBpf01mN4LTDz08sZrwBHgZAm9tKb7jRgA9aRgCv0jTSSqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMskEE9NMS%2B7ZXbn00KtwDTSR%2BPDNOye%2F40Sn1ucLq4LIuR7zL8gH%2B8mdtloHlH0eSQYvQ5nCbfhFDjyPUhAM%2B7MUENyXjaeglMxxvo4w81vrf%2B%2Bc2uH1Lat3BoeliW6xp1fN1qTQgo1sSaBJSeMqWUetojGFzPm2U6g34mtr8Ze3hu6jmKFCGBQbI6%2BxqXYombTOk%2FyDQY9qe%2FoGtOkz1fJ%2F6rh7J7Z8jcmcvrc0432xXlb1tDN76zelGCzL%2BFyN%2B%2F2qfrHqCXurXN1w8w20VEfO2mNjnhOfyzEU%2BYbF2DT0uHQf1nmrLHxGhSSxki1OUzghz%2BqXnmNx%2FYjNAkE2sqfPhEM8AxCDnCfv5I69a8NKFTH06ZaWGhp8YIX0eMz3NBRZfg8QllETpUQZPukBFkJioixFOmMm%2B438ZUfbGLXhYqMPqclHIpA4cFmmdXlaxosFYu3AGxPzgykqd8aOiqA4tr5okPwnFzol9yJka8dToAhGpRjCIUereZzlQglUHl1ckx66L8aDEvk%2Bmn2zXKQ81iHjFFl%2FU0jYIZgnes%2FPUOwJ2ztbMuIEMJerPO8abdxdhnXS5eE%2FAg4wF4IfE7ClW7%2BitpWd60s%2BsLqCfPEWS8ClWi2vxktbIxBmRvVoXrj8fjqcK53K3%2BlcwqMXNzgY6pgEPs4foaHbbFixZWgwWsV%2FXDh0BordAaVa8gUbiCjFc%2BOPrDVZEypi%2FsIofx8tVd40O814B%2B8BGBvZ7kH94MPp83PlWeoJ2MTR7e6WROnOr7leHHe%2Bis%2FZQn7JqmsLxb7icCr7ZJGxT522evd1lRe5K%2FDKjqhOEGgAGD%2FF%2BvGaUOQnv3oCEN6tze6rBJOL6FivDlIxLz0930F2yBbe0enVt5XatmhvK&X-Amz-Signature=5119a6db9728ca94c2c2da90755764e120d9f1376f1e451a95940c527f595ed3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BMXXZSZ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCpMM9tbq3GAip%2Bo%2BnoVHP6iulErx8gjFbI22XpDiXZwAIhALbNVyc1nWW1ghqXPeF40an70UQOV5ML56wJwyVd6hDXKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzczwRXyMcw0hvNoxcq3AMOSa4FxVnawXnkumngfd1sDBFXItnYzbQ4ivZ%2FaMKr4VuZH5Kbr%2Bvnj5aToDzIJSnr5tidvnkyUTpIBZ92e44ailBjXwsJ%2FrDWm%2BGv9MtMLJKLJkcmkz6CN%2FLjwjM8btJuOdQVcA5rcpr9SsQAm7ZenOmZOzahgt0Nc9fJBMt%2Fx1iy%2Bdfrs6wM6q02jcFAU5o1QNjj7K0ryAE439qwNFvU1DjQN4xHvfXjEdFh9Bu%2FeLhHNLdtRTx7f%2B6ZQ5tv5tMCvX1%2FGIarNIyCZVrLqGaYOHeCe54OQPGAjXqcKkHifazm5yJeoTkLBMttIN34FzXnjmc%2BOmI1ZAP%2Feuc8G8xSfQvcbEtEJ%2FhTBntmpz1iMcK4lulIYdb9dHHAbjBC%2Bgts%2FS1cNgeV28bh2YkJMFh9Kd3pVE8BQil1kxscaaQdq73kotz8rMxn5%2FL52zUfZDbrrMblHkdOekOK6H0bEi48ts65l9I7JDnab6p%2BNpHsPzz%2F6RVNB0A6JeobFl8PBEF3tnKImIQlJ71m70mJlmLJLAFk3Yq9ST3zbn2J1BDVBim6sratIDKnD%2Fi8OejORkVCENVlcWrEjdWSR26cejSxpSVlvILt0DMp3oiezVXAakplrt59fM40TEZOgTCFw83OBjqkAYpDIArfCbHe5QtUPestQF6zhIzIgvsztY%2BhtKJmq6ZJ%2BzEv%2FDvlt6YkKKVzyPnF6DHAQtDXTPlg6gvMaN9nNqcrI2e015p2N8G%2FBeFyrmDE2qXfLirfh%2Bb2gtak%2BmZUOkzZs2k16xe7w%2BMmnDXPbCWTLqhGTed0cVS1kdE3ap4jRMgZATwX8Cyf0ECJ44A%2FPalrzli6oCf0SNR0qxQfyt2Wu7fw&X-Amz-Signature=e9f524756cfc7a737b1a9d697e0a8a072fe0a9ddd22c109c1e1d0313f161fe35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VOVMTXA%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIHdJrRAgdY8rsaT7uQIrFvBh4NR39vU2mGzoYD5fDBMeAiEAhj%2Bfyq8oOxQ%2FdvwPKyJCbowvC5PTKOKsSqMsDw91e1cqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAiAulbxkHY36mUXRircA6D71iC7MG4UsW%2Fxz8yu9CktW3ql9RC7W6GJ86x0d1kdveq1eel1SuhXcX5tDiuRH14XSqCiTq0xzvq37j7pgB5VTrDY4mgbQz0YGDwcFl%2Fhsrx2geob9mvc%2BH6dv5%2FPVAWaPwBOwW%2BKMPO4v65XeAZsNZq1LZa7QOjq27U3%2F65Efukj63%2BmD0ruWUWuc%2FqI%2BqkeVhuaKvnmfcTDizI5qRcGgfAth032isnHpLz6LUp62l4DuSBWIMUAs9zuJdKQ87PPITYlBhbjP9ssUsA2BL1M84M%2B7nX5DRIJvKnKi3zKKeYnoCRKiCuEeI2N9%2BMe9v0EHYuGTts%2BaHbbr58ymsEZw2ET3wJU6Jmm0W%2FZwJnbVuTjLTxVzQTK5H9MIEk7kmk4s%2F69W%2FYBBJ%2FIREOKzRt0N7md6YU%2Fxq1i9VrYCocMby4%2BZaINr3mLp4fYThB91Bp5mE0n3Q25CJwFZHuedS7409knmJRG1WZpauSvdmW8FfVreOStTtpsFgUrE8XH6EJdm6cqeo68VFiJtjhSGlHTYi2wY9m3gfosvG1PnTaM4F3ACLl5VrGVEiD9dXgQBHszLx6vR0kMnH%2Bc9KcF%2B8BCZMjUDHnpaNTZ7jr%2BvojkDYWnxdtRobKw3WM8MPDFzc4GOqUBD4Bg2dRHaNMkJprGUFHuFBnZFrxhAhuGOnoDP1vQxyjiOmsCmkePn7yXscfkJAOJ9x7vuEFp4JZwRmha5ktA3MK1iiqQVLcQYsBKVeIROoyTXZP9W910%2BdVaAY%2FBCaDnis2lizKgZTA0bWk8f3qjnEfPkU3E%2F86yGtFhZvNFwdo54gOzasepN727lPqJq0nDlSWhk2FnFvKtUkcKOl80EzjOb7jL&X-Amz-Signature=274aabf9f5ef69c1f01ae8af05f600c18b24414c06c28567b16978ccc3811f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UR7HFVDO%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIClOR6AlMwQiS9GxdAdj8F4RqDGXQM9CAX06V1xd%2F2H%2BAiBZ%2BejEDLw5qBFwbbuRcrTh2ZPxa7S0iFzN2ZMWvpAj%2FyqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnt6GJb%2FEf3oK8hD6KtwDxSpSjaFfkYvVxZdv1hGB5gS3Cqb9y5fiAud8RSLSfB3%2FM0aqESaD%2FerRKikmzYYO%2FsCLkmeLYD6QGzyTbX9JFMVupg%2FoAAKjFtUcDh5skabV9AEkAKrVgc5fjdQYabtHSZc2VCsukWgZn%2F1Gad5vvVriHVndwZREjumIQo%2BGLDmwIr8FB%2BLNp51GeAHx7B0We7TUcyVpvNxpwRl%2BigpSjFJqgIpyH3MpRhHfkfFAp1J0jm%2F4yf%2FvAacEK3lnYzaCyadE7thLphZQUD1bPlVuTYUSwDolFSnFyQbcLIMQ3YkerhMPKWxx2Pb4oGEYnGzknAMm6uHX9%2BfRYJ%2BEAzs8c60HF80me4j2DJRtf%2BWKO1Zh22dTwp%2BGOHuHHPrhJaUPuCHW24Z9hSDIaoY7xaTWMBi5NCRWQc2WNIjs5cGbYQZP2F0tR3gdvc9Ww565fdMyfnIDtrlWxNseTcOg%2FgLCmN%2BFTmn46kCsv%2FxvieguRLWcrwDEUEB5ese5X3kiBw8ml2fSjZVLu0LquI1bQfThYAqnH9nPuqCqMEUhoNy9R%2BhyUWaO2orG8a6jtDP1BJbx%2BXZtMf1FQf5yGA9f2SEOaxWNXdl3qtTaH6eatdHqZggTyCn14dAYIhzBG5kwncbNzgY6pgGiTHWwtfPcqCxgw0ZjwjjD8GHyOWTBA4Y%2B9w3x%2B9i0qm9%2BOLmFydAcKnYTyRkaTwIw5wAuVwTdeMpc8Y9ifds%2BaADZt6Z3C5m8tCV2QAaLELAcJVOWuHO63mhQxOFDPYBzV2NVuygZylvi3dwcoWXqKHBxhdiH%2B1QDO60ObH2vDUUl0yWJNwSFnJCoM51Qu8FbNEQhTjSErRHv11Itr1WR1f6gSutF&X-Amz-Signature=c38a697150c7a9e2fcde450b470980ce878e23ee4ee0212c52784c9152f0ef80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGC5QBCA%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIGv2%2BOEticTkSNxP6RzI%2F3nUjAGaNmNEdJwvgAggGSKEAiAfMxsMO3lZaD7IzobtneFmbrmGilEa7EI8vAryt1FUlSqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2nP%2Fh6pw9oHw7geKtwDmBGbrLgCp16gXIlJgXTUQM9jz5TYhkvG9gQcts6CK%2B0Ersy3Mwyg901mi3aAoPxJtix1JunfaUCNMTGS1FMOFmb0R56IJFPagpSNW1O%2BbAWD8%2B2JcbcZxmLjkTeWoYd%2FnJ5iH%2B2oJ2kGhdmq1rxus7bVWz7tncC9RJWFeeWMyC%2FcS5mqAmvrm78SIKDIA9DEOituO24sFaIeXStAyF5Myi3xhMVy%2B6DlAppV8zkIWRsN9wdwCyRQ2fjooPikwZ4oHJQJISzp2oAXvm6h%2F07wh78zCvujAeKsUo0MiLECb0WEPBcuXj2bx74xxVGCwxUNEjwi%2FHeNe1rHoAK4Ly2Ve3eQ1MYNJO1oOJbXnwa9hTQ1W03Y0gmOm3LOibp%2Foapq%2BX%2BCc5DMbZnpldfCzK%2FmjunUhsJcHI9BUJVbi77jFbcv9Su5XLDSiwG3jhsHUUTLiNrg0LNpdb4nuNWfXREEeN8SeQqVoCqoJ7F6aEV09bYCQWj3m%2BETjpa%2B5Yvq6LrCgumv8bwIy2xBEgbDfxdpTzScIsXwdRe5%2BwtNSihqyRJzQK04IcOoDWffSUW0FPqXszGDnZ5PWMhcZol7JzFzZuS%2BYLpjJjhHPKef7iv6v6FI0u18eli0FzSzYLcw1cXNzgY6pgHZ2RbuFtBP22lc18N9p4xmDceD7LKwOLGMLdXGEfvtr9UVewqSrvGopgbO6%2BUnKb8hAuO9P0errpXK3CLGSzmOph2yQt330yjCWa9lnRLQ3EJUUlbkN%2BVpXFCeFZvWmOMikln87NIkf7MkleANX%2FRUaUmRAkpsojOs7VRVXqeiitqLIALnJBIVc3SW6UBQMim297DXa4jlkxEv6xaidjOahmHjnOu5&X-Amz-Signature=e03427bc0765cc89bfed0ab7f26aa115f1487af287d4f6ef50f896ac596bc800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGC5QBCA%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIGv2%2BOEticTkSNxP6RzI%2F3nUjAGaNmNEdJwvgAggGSKEAiAfMxsMO3lZaD7IzobtneFmbrmGilEa7EI8vAryt1FUlSqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2nP%2Fh6pw9oHw7geKtwDmBGbrLgCp16gXIlJgXTUQM9jz5TYhkvG9gQcts6CK%2B0Ersy3Mwyg901mi3aAoPxJtix1JunfaUCNMTGS1FMOFmb0R56IJFPagpSNW1O%2BbAWD8%2B2JcbcZxmLjkTeWoYd%2FnJ5iH%2B2oJ2kGhdmq1rxus7bVWz7tncC9RJWFeeWMyC%2FcS5mqAmvrm78SIKDIA9DEOituO24sFaIeXStAyF5Myi3xhMVy%2B6DlAppV8zkIWRsN9wdwCyRQ2fjooPikwZ4oHJQJISzp2oAXvm6h%2F07wh78zCvujAeKsUo0MiLECb0WEPBcuXj2bx74xxVGCwxUNEjwi%2FHeNe1rHoAK4Ly2Ve3eQ1MYNJO1oOJbXnwa9hTQ1W03Y0gmOm3LOibp%2Foapq%2BX%2BCc5DMbZnpldfCzK%2FmjunUhsJcHI9BUJVbi77jFbcv9Su5XLDSiwG3jhsHUUTLiNrg0LNpdb4nuNWfXREEeN8SeQqVoCqoJ7F6aEV09bYCQWj3m%2BETjpa%2B5Yvq6LrCgumv8bwIy2xBEgbDfxdpTzScIsXwdRe5%2BwtNSihqyRJzQK04IcOoDWffSUW0FPqXszGDnZ5PWMhcZol7JzFzZuS%2BYLpjJjhHPKef7iv6v6FI0u18eli0FzSzYLcw1cXNzgY6pgHZ2RbuFtBP22lc18N9p4xmDceD7LKwOLGMLdXGEfvtr9UVewqSrvGopgbO6%2BUnKb8hAuO9P0errpXK3CLGSzmOph2yQt330yjCWa9lnRLQ3EJUUlbkN%2BVpXFCeFZvWmOMikln87NIkf7MkleANX%2FRUaUmRAkpsojOs7VRVXqeiitqLIALnJBIVc3SW6UBQMim297DXa4jlkxEv6xaidjOahmHjnOu5&X-Amz-Signature=97f6cd54efbcb2b04ac93fbcadce96d3c404c82412783f8f8b065c4f10081568&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MID2BJA%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQDOM940trWEd1%2FCWUS1livLEid2Ec5K4IkfkIJcuQBdLAIhAPXUvZRgvJp4Doj8zTahuK6AU8Nij9zXT%2B5aMjIGvzVIKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIk641aEOrzoVrbwsq3AMf%2FqTvMNpcZmhuMRfvRWciokz4YQGrlQ7t8gcnUzvHEGBzyOguSyS%2BBXf2NQj%2BQZ1ydb%2B4Q4JKwWtFY404Apo%2F85EJjVnT%2FWseYkBtVMDtVq6hCOCxcFQapF0uxCDHDo1iy1qaJKKlMEWZJqijxVF5%2BxoNxAjQw9pekbQDpbYdnsjvIoOCi6lLbbtO86KBTPnUWukpwZYQFYVK8DW0WhWMtL7%2BbzxSTEorG%2F%2Fyt2dk%2BiRhbRakQtc3fN9bHYDNDqzcAi9BuliSqTucRAMLsRelRilSYq1O3Wh7EigddelVnyXtr0Na4A4uP0ajFU9CpB0DG2NjVHVFB5pwqkyr6OfkrNniT6x9ouFLki%2BqZSqYCiuxFXR%2Bd3iE%2BFvzQ1%2BD5rnJIYCLVFifJGlaJ0uIvGOk5R1F902xr6zb6GSlANzA1OMO89yBQJQnus3KVm5XBqZ8iP6Z%2FsoWrhYhEc1TYpXoQTerVQx7OYiEpk8O%2Bk3sQ2Re70ndeoR5ftwhkRgqQNPdSKJ2PDQzWF3h7ba%2FmH5dMANIdN3WEBmI7gy79ztnKBIjNvisClHUKCOmawDqOjwVerFMfEXjlM9ZWntoeJEumlnAdfFLFhLrDtppZS0FARmJ11HgOuoI5bnizDCdxs3OBjqkAQwzWp%2BIYfNoh3oAppghHbhouA9dfXyoH1%2FDE1o5C%2FnO%2BqfcPSETa17eBm0yYLdUWCpfGIu%2FbweQ9iNM0sPF08iazwOHWRDl94%2FMB9cO6NDFv6oNb1zX569AkBfLQMdy7h1CXaWMz5DBKOngNvHmc%2B%2Bd0vNV7p7MiAsBNLzRyWVbuv2sPD%2BYSoFTyAEFyOsvxR%2FaDgW7EnuWyoUN5Q9DK5BgQAWZ&X-Amz-Signature=1289b5e44a08603354a2c489085fc6bb120afb61f88ab0110bf6bef50f697325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBP54LBK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQDUGQHsqTzD9bQ7KCckB1KdSIPn5c4RhumMTRGYb%2Fq8NwIhAP5KGukU5H0CsM%2BCjj1XPNvRQSOoyKe0Q13TSmFyVjXGKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzKby%2FyOxHVekOrfXAq3AP%2BOB%2BpwDZhau49i45RC8rQjhUdfIB34yRqzcm5ibTc68n0o%2BQ2%2FjZWzFKU9L4zMZ2bfeARiJPm9D8ZniJyIlTIUVmrs%2FBQzFnYLJ7ZfrgAgDP0uyLW8DTPZ%2BwZhPM%2FAwLygwtz1lAXHqp8QdjJqcERyh3zQ23FRIHcnCWKBn5yxdNESLvvyN0jg9V%2FbeA03d7D51O7lE9vDauJE4om5eKTRsX9ViY1s4wkrtXQ6aVYDh%2FTnzjTvsU%2F2FGmw2OhKuSO8rKZqNuBr4zfJE9j%2F1JOwJniII7MKHXqiwt3i%2F%2FsyOe2PBcSv4UAlduVchH%2BB0qjuqNI6UWyszy42AEQXz9JudWYFTAqq0RIo9W1bECmcrGg5J91vZwcdJY8itA9uCuR4InC%2BqVY3V9OnWk2lm4vuCSkyvhM4bwEW%2FwvbX43YAjNvUyfXbK31sD9LTBAVTyE8vwQXa1KGw1vo4v41EiSsKak%2FTPZrXKczwxRJVO%2BQ6viALmxHKqwcUOhElyK3WUhRfisbxdgLqRR%2F3FmoV0Pi3vYi4McNGSH2dX3eGrXAW3IecUV4Y58KbGxhuAf%2FW8CNDTsSnZpcc2RO2LtcE3TKOTQ%2BQFAEx89UrC%2FGl2Naav164q45QvMwSOVaDDBxM3OBjqkAWZLjAWT6sFGuN1jeQn02k4UzukOJd9mjHLPOFGfZerutvB%2ByytKxQcLyZVeVt5g84gvS%2BbmCO1uQCUBMTu98ppaaH%2F%2Bc%2Fm2HjfwE%2BA8Ypct%2B5L98UF8sm1C%2FiNazRL94uy37dMJhCCvvISmNBuGGsr9xzTxbVmdMWefLIidAk6b1XVfJAqEp4lWTq7eyp7X%2FPmcYEjHEra%2BP%2BFSTqE7TTcaPzpg&X-Amz-Signature=16d3047ce3f42405de763653b48d41539db7497fe520c29b816339c2b39be910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBP54LBK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQDUGQHsqTzD9bQ7KCckB1KdSIPn5c4RhumMTRGYb%2Fq8NwIhAP5KGukU5H0CsM%2BCjj1XPNvRQSOoyKe0Q13TSmFyVjXGKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzKby%2FyOxHVekOrfXAq3AP%2BOB%2BpwDZhau49i45RC8rQjhUdfIB34yRqzcm5ibTc68n0o%2BQ2%2FjZWzFKU9L4zMZ2bfeARiJPm9D8ZniJyIlTIUVmrs%2FBQzFnYLJ7ZfrgAgDP0uyLW8DTPZ%2BwZhPM%2FAwLygwtz1lAXHqp8QdjJqcERyh3zQ23FRIHcnCWKBn5yxdNESLvvyN0jg9V%2FbeA03d7D51O7lE9vDauJE4om5eKTRsX9ViY1s4wkrtXQ6aVYDh%2FTnzjTvsU%2F2FGmw2OhKuSO8rKZqNuBr4zfJE9j%2F1JOwJniII7MKHXqiwt3i%2F%2FsyOe2PBcSv4UAlduVchH%2BB0qjuqNI6UWyszy42AEQXz9JudWYFTAqq0RIo9W1bECmcrGg5J91vZwcdJY8itA9uCuR4InC%2BqVY3V9OnWk2lm4vuCSkyvhM4bwEW%2FwvbX43YAjNvUyfXbK31sD9LTBAVTyE8vwQXa1KGw1vo4v41EiSsKak%2FTPZrXKczwxRJVO%2BQ6viALmxHKqwcUOhElyK3WUhRfisbxdgLqRR%2F3FmoV0Pi3vYi4McNGSH2dX3eGrXAW3IecUV4Y58KbGxhuAf%2FW8CNDTsSnZpcc2RO2LtcE3TKOTQ%2BQFAEx89UrC%2FGl2Naav164q45QvMwSOVaDDBxM3OBjqkAWZLjAWT6sFGuN1jeQn02k4UzukOJd9mjHLPOFGfZerutvB%2ByytKxQcLyZVeVt5g84gvS%2BbmCO1uQCUBMTu98ppaaH%2F%2Bc%2Fm2HjfwE%2BA8Ypct%2B5L98UF8sm1C%2FiNazRL94uy37dMJhCCvvISmNBuGGsr9xzTxbVmdMWefLIidAk6b1XVfJAqEp4lWTq7eyp7X%2FPmcYEjHEra%2BP%2BFSTqE7TTcaPzpg&X-Amz-Signature=16d3047ce3f42405de763653b48d41539db7497fe520c29b816339c2b39be910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626SEAZPU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T081455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCy0Yxt3JRmHud0ObvcmXCK2t1xBeLsrAM8ODGZt8GIaQIhAOiajYfSAxqsN9dPZmR5qVJ8VNOLxxVPkTOtpvvOQLbqKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzCib%2FjdqPDK8cVCskq3AMffqPM11%2BqKPo4t2NzrFp2i5GdwwJD6DomuctYWN9nVPJfiNAg57yjJBX5%2BPb%2BFs9tXUO4NmHkCgAQRLO%2F8Pl%2FH9yAjw1ZutvsZ9YYyPE8WTuKU%2F7t1VeDJw1iiT3NTMXyA7gSUFlOC6pK2%2Bzar7Ypjd297xzwopngrNk7cuvWke%2FbPwgzxt50Q6DuuVM1oQzWUsTwJLTz00mU8dlDGaJuPJqjcA3eThp2pmyWKKR8CFePtl5kV03sOZoqsDm%2BYtD6aJFLJeU%2BPDRWVKSi7Gmw6XCc8Kb3LrDdMcmm3UadxUi%2BEE3D%2Fj%2BqQgtWbzxkoHFxWgtRLoI6yR8IeIR%2BtRna1G2eAZcZAdDL6fmsOwVGG7hl2wHkzu%2BuH%2BUdvtrFO5OmRGMwxb0kY6rhCOKzKumIS6FRoDJrV27MaRDa5oc8%2BedO5fqKaLiWipiIkQ94u6SL6kxm5kHQCepUvraUS8R773ZL2w3CiK%2FS2KSW%2BUnGe5QfVgp8LerGrjqgrvYnDD2vC5H%2F4vUDHg%2BKwDvJf3Xy9v21tgLTlSZZX%2FoKhzOP50GRKsHiMNL4184jBwd8ZX6lC1GwvblFyZZ3W8AjpW3zVbvT4GVh16WXW%2BJI98x6brBVmKcgiaQUK6JwnTCCxs3OBjqkATJi8MtTNsgObb46rgFAjLiPBry1LbsJRcAAwJwTzEZbpFqDpkAZWtvPeJ99oBQSjfpV5yl%2BoQyh35hUSObGrMH%2Bc89ZpdKB45%2FGL7qTwb2alubVdNwdk9KwE0hmEUEJi2Syxu%2FKb9Bu6%2BPEwYRRlwg6c9bCmJk1xIByDAIbdnzhTe3mVv7XEp7Gy2iBf9XcGorS1YkXzy7netj%2FhPL7lYg6IjGa&X-Amz-Signature=89b3cdc6d1b9fc3429156724dc013de1a4af327d76d5b59b4273ec13ba3cc905&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

