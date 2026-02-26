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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYN7JXRM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIHA0xwvg4jSpu3H57kbpqhwyWu%2FTtXgBxSFXcdVhUwsgAiAf3R3haDgVeP%2Fv2KaYFFNAyxp1DuTYRdLecEahRCjnhyr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMqaLffw6%2BRy%2Bn5lmpKtwD7axymGwviV8zMaVmELjG4PDK1ND779wf5v2x%2Bg7MAQmcwdrpBrknTTT6XpdXjyh2MeD%2BtariLeHdNj%2Fw6o76dgrq8MO4%2FM204uZbkNM3mGY7e3iq15bq6pf1YZZ2y3qJY7NeBqmTgh7dOSl1ZOSNZsla0EVt7nV%2BB1crdpfL%2Bf%2ByDKx5Vc0%2FibVl3dpTj4W%2FPOIha1757YqMaQmCt3miGb9q84YCX1BnFx2WlGnGpvgekgp2zbxXZyjycmm15kz2JQ2v4Szx%2F9c%2BVSPRUtOA2OGlTrp4LQs6OvRTD9K33%2BY9mgBuz2uphMnHKvLEuc6Oh2OaDGdijB%2FqRoUOw8uUGaFtMkVTpzTt1TU1VPziF5qDEcGFuH8mDGVkHvxveO0U90zjKXiKiWw8QBIc%2BMIXvzeYDXhBsoiAepFN5fk2x14ryuDnV%2FLrSmxI%2FqxFdHsBiJSytc90JQmmESdT4gHjd4FQVZviCSgCLRFUDjHm475iWuwPJRfPXUDIq0DQvF6cH9t17cHN2QlLCueL9aQdkS5j%2B%2BwRsuBXTfeQII0TqJvrPktk89gQYK3drHyoFJ31G%2Bq4JV256UQJIE5OKRsbGOOxJUXMcSSHq43DCwNFpAywX7%2B%2BDSd8nA1%2FmMcw6ZGAzQY6pgFByEc8Vqz367b9IxJ6KSYD4tGfEG5pdNg9IRKPcwsdDE4Vz4RzfwVyndskNZQqbZ%2B49U%2FMD6JWIFKJAMFsLzx%2FY4Zi0Cwn3Jkde0KRK%2F7uMN4fDJ2cPGbYCOo3wSLmxhuQ2iq9jWmUKR1iX7iPaURqcu9gnelweJ0miWazk3spDA1WwxFlbOv%2FK2qXlZGR88Md%2BfeYGDZDP6CwT9OiZG%2B%2FMmjw0Z0r&X-Amz-Signature=4038d397d9427498816074c0489e6662baa64de040806adb227afe5d3e1f4d79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYN7JXRM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIHA0xwvg4jSpu3H57kbpqhwyWu%2FTtXgBxSFXcdVhUwsgAiAf3R3haDgVeP%2Fv2KaYFFNAyxp1DuTYRdLecEahRCjnhyr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMqaLffw6%2BRy%2Bn5lmpKtwD7axymGwviV8zMaVmELjG4PDK1ND779wf5v2x%2Bg7MAQmcwdrpBrknTTT6XpdXjyh2MeD%2BtariLeHdNj%2Fw6o76dgrq8MO4%2FM204uZbkNM3mGY7e3iq15bq6pf1YZZ2y3qJY7NeBqmTgh7dOSl1ZOSNZsla0EVt7nV%2BB1crdpfL%2Bf%2ByDKx5Vc0%2FibVl3dpTj4W%2FPOIha1757YqMaQmCt3miGb9q84YCX1BnFx2WlGnGpvgekgp2zbxXZyjycmm15kz2JQ2v4Szx%2F9c%2BVSPRUtOA2OGlTrp4LQs6OvRTD9K33%2BY9mgBuz2uphMnHKvLEuc6Oh2OaDGdijB%2FqRoUOw8uUGaFtMkVTpzTt1TU1VPziF5qDEcGFuH8mDGVkHvxveO0U90zjKXiKiWw8QBIc%2BMIXvzeYDXhBsoiAepFN5fk2x14ryuDnV%2FLrSmxI%2FqxFdHsBiJSytc90JQmmESdT4gHjd4FQVZviCSgCLRFUDjHm475iWuwPJRfPXUDIq0DQvF6cH9t17cHN2QlLCueL9aQdkS5j%2B%2BwRsuBXTfeQII0TqJvrPktk89gQYK3drHyoFJ31G%2Bq4JV256UQJIE5OKRsbGOOxJUXMcSSHq43DCwNFpAywX7%2B%2BDSd8nA1%2FmMcw6ZGAzQY6pgFByEc8Vqz367b9IxJ6KSYD4tGfEG5pdNg9IRKPcwsdDE4Vz4RzfwVyndskNZQqbZ%2B49U%2FMD6JWIFKJAMFsLzx%2FY4Zi0Cwn3Jkde0KRK%2F7uMN4fDJ2cPGbYCOo3wSLmxhuQ2iq9jWmUKR1iX7iPaURqcu9gnelweJ0miWazk3spDA1WwxFlbOv%2FK2qXlZGR88Md%2BfeYGDZDP6CwT9OiZG%2B%2FMmjw0Z0r&X-Amz-Signature=4038d397d9427498816074c0489e6662baa64de040806adb227afe5d3e1f4d79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPYSYB4R%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCICYyv2FHITzCkr4fNr8Df3f%2Fp%2BlGzZ8FbuVOw5bGYx%2FEAiB6IHFyQDStdlhp9KJw1ollfCn05FE1HeW%2Fyj8mZ1VNkSr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMgQ8NDggFCPzHMt%2BDKtwDoIl9lQuW%2FfmMdrObumVPUkQn6VVzEElLj%2BDsBcMu%2FschnHpa9Eym4L2JomtipA1bm4%2BGxZ06ol5xwH%2B5jQi8dZwDB6JH9caQ01F5NiAgQx7sjldZ9D1PU7MwYWNIRwz42o5r8fULvWYl6P%2FmG7cHE%2BRcXIBgdUAckUP%2FJ27yWqEtBC4aMWsjXXSF7DgEXPd3oFkIe5eyb%2FZXLgPi87T7sefQkY4p0CDE4ZQpjwNXM7r%2BLOdWNezyqunTnwELJVQcIv%2FJXCY6csjxu8kxaHf%2Fh%2FjKKV2fMo6D%2B32E6GE1anCfQn%2F8FwtqM7Me4I8TTrEj1RrqIRq%2B%2FDQnNNLmAHzEZ30FFGjoPr5ZkARP998GKnY8gF3LGkHkP68rbuZFZ5rS3k%2F3X%2FntfYwb%2F%2FxpA9yvi38Kr4oN91FKE%2BPwjlZC%2BDd7ESSHCvPJI9a1UfdHUwezpwPfrNcWVsyVmTlgkfBUyg8K%2FJ%2FomjQz5HP%2BjfVsAeuHuYHqDgYqnVyHLg4E16gnIK0sdXqwGK4OWi9EopLsi9dwdraHw71O%2B5hvTn2C3kEsfG%2FFktLQP9T1ix5efr%2BBC217pREEoGKbnAqr%2BfAdmQA1BuazD1x2pRqkJLN%2FaZMP7Q2p7o2MmBCC2nIwzJKAzQY6pgEwtF3BOYJUCili%2BAZoburymrHRO%2BoZhPFxhmYJclkKbNJOMoGGtM%2BP%2B6x3E8v%2Fjft0wvyQgeuN15aGLbcF9mSdTsZTidYtYJfgabNwqgdwpn9vrArH%2FBlUuTw8XXco4xI%2BGcnZxA8U%2F1FMspFr2e%2FthKTZtapRYLyfPBzqew4g3elQIimLfY5sUVIqYnlYlZ5q%2F2jV6YMqAtj97ZV4nOTswsQH1lto&X-Amz-Signature=97d624cd7157d7cf69711c8bcdd7b1b535fd7e4d239a75b5d0537efb0a06125c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C6HBOX6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCID5xP2UGmtTvVKEM1rpDA%2F9ZomxiSojlj8igJLpRcV40AiBwbOQEfyMF9ib%2FRN3xE5L5epLxs9mkzcs5JWmownS1aSr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMiE9FlCLFz1ztAxh5KtwDZDtR5vY45%2B7JY%2FvN45D3MJw%2BIL75nb1AdGkMbbR0rxVobbQH92sMSeziDWifGDspofuLrYgoCORWnvTBr4iTmuO1jiEn7%2FP3DruAuDcJfFvBcqf%2BbPT3LueUOce8I%2FBgmTtvxp8bYOpyR66eE8i2UF%2FQFpOiI2x8iE9JwtHolv2hB1NtF%2BaBax6jGcwJbmTY%2Bq82hVS1Bt0sER0MucLmGJoLcpTp7dCgqaOpZuMHVTEgSfS%2BCs%2F4m4hpKbE87J1APjuZstO4VbAslJkD5uOtiweDFxrtkZrxfNTVM3koJXTS3rlL24Jue%2FFN7LN23gXlMnw9P6HDQ%2FOvDszebdyZfOWGkrJ%2FyWLjOcH%2B0uZrxRyI5PQTbarTU4s8lNgtcNmm6Icl0fOKUrwtpUeymu94dg13NGzBaCGGJOUBRW1ySfADuhMz5qsUWMsG2ZgMLSQQ9oG7bB9b01I7ASSJ4K9%2BuciD%2BftNqTGZjbWUwFHBIwVFN1VHR7n%2F%2B%2FQB%2Brr528C%2FCNJ2TvsZHRRTdXqHtb2tordVlt1rCPku2ra53TwNoWKCZf3Ujaf5qdGWvJINj2uGPzaJ6db7A%2FA%2FsSs2hPavVe1aK2ZbXL7r5%2FXM9OK0Y1TtvpZveVs0O9Kg1rcw3ZKAzQY6pgHHbQI9XZPm4NLHxLkkPwFf3SaNgib8oldLK0sOaGizmmgPpAW4FWjyprI0I2jRy2pas8d%2FhD9w7u%2BpOf%2Fth4526NUBHbskqUF1o3FvBdNrhexVxL0BufsoCMBxO0zv4AjpXCdaeR6IeaEIAbN7HM27xgo0hWocQMnic%2FUmFMgB%2FrL68zH5uWr3AYm%2FSikPxUf9NDELHEf8lK3A3GbO9RTSCU%2BZNoQX&X-Amz-Signature=53564239c1e83fdff94a411db7301d3cfbf3becb016f06c4cef2ea180a187b64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C6HBOX6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCID5xP2UGmtTvVKEM1rpDA%2F9ZomxiSojlj8igJLpRcV40AiBwbOQEfyMF9ib%2FRN3xE5L5epLxs9mkzcs5JWmownS1aSr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMiE9FlCLFz1ztAxh5KtwDZDtR5vY45%2B7JY%2FvN45D3MJw%2BIL75nb1AdGkMbbR0rxVobbQH92sMSeziDWifGDspofuLrYgoCORWnvTBr4iTmuO1jiEn7%2FP3DruAuDcJfFvBcqf%2BbPT3LueUOce8I%2FBgmTtvxp8bYOpyR66eE8i2UF%2FQFpOiI2x8iE9JwtHolv2hB1NtF%2BaBax6jGcwJbmTY%2Bq82hVS1Bt0sER0MucLmGJoLcpTp7dCgqaOpZuMHVTEgSfS%2BCs%2F4m4hpKbE87J1APjuZstO4VbAslJkD5uOtiweDFxrtkZrxfNTVM3koJXTS3rlL24Jue%2FFN7LN23gXlMnw9P6HDQ%2FOvDszebdyZfOWGkrJ%2FyWLjOcH%2B0uZrxRyI5PQTbarTU4s8lNgtcNmm6Icl0fOKUrwtpUeymu94dg13NGzBaCGGJOUBRW1ySfADuhMz5qsUWMsG2ZgMLSQQ9oG7bB9b01I7ASSJ4K9%2BuciD%2BftNqTGZjbWUwFHBIwVFN1VHR7n%2F%2B%2FQB%2Brr528C%2FCNJ2TvsZHRRTdXqHtb2tordVlt1rCPku2ra53TwNoWKCZf3Ujaf5qdGWvJINj2uGPzaJ6db7A%2FA%2FsSs2hPavVe1aK2ZbXL7r5%2FXM9OK0Y1TtvpZveVs0O9Kg1rcw3ZKAzQY6pgHHbQI9XZPm4NLHxLkkPwFf3SaNgib8oldLK0sOaGizmmgPpAW4FWjyprI0I2jRy2pas8d%2FhD9w7u%2BpOf%2Fth4526NUBHbskqUF1o3FvBdNrhexVxL0BufsoCMBxO0zv4AjpXCdaeR6IeaEIAbN7HM27xgo0hWocQMnic%2FUmFMgB%2FrL68zH5uWr3AYm%2FSikPxUf9NDELHEf8lK3A3GbO9RTSCU%2BZNoQX&X-Amz-Signature=9c1c2eb4899a9c6ce07ea5da50ea859fd01289a1c1777f65f4e3e35688f78e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667O2JNP6H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIGC1SCmFjMfJaRayEGCncG62aN62iyCMn6QGJAUaIeowAiEAlBoanz2HmqmdvDAWNcj6Y1QBVI%2BTd4vu8p7yN6RXOTIq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDA5z17BM7t1KbxWkFircA2CSCtrAMuYbP25HdOf3I4owxc%2BKBnsO6RQtjzFO2Tpv03ZBczofqLX%2F%2FcG6zRBnwubEsclELRNKRJ8lYVJ8lVBPMSJPjJKRsJxJefzzlQ82NDGq3M8vxb5bhhtAjKfcYDsl0FE1DfIVksHxqPBcd%2FzABYGyCNicZnyhUYTjz56SSSaO4ttvbuB0BZKQH8EzWDM7woWucsS8zRsPci6GzZ5LH0PVxGefmC%2FS5snvK8pET3D5%2FXnn3Mv7B%2FlPzHODTDeNi%2Bpm0pxEIq%2FNJ8ris%2FAf%2FvuBlaWtdIIqJ2CtLpCTckZ%2FNMq6lroFKS34pIjPVQ1ARHAPv5D6zCU4s8ciTdpZHWtH0D%2BpZMaheCdyPqfIc9CnpJ%2B%2BYn5hjdPZzfiVxC%2BOYmNQ81dvz5bfuoztd1FAwBxFxHz4EyZlw2%2B6Yqy1tkInlISRr%2Fp%2BEYnDm1Gv241kNGM0t2RF0%2FNi9aXqDEQXcjhtLr3nLLGCwcsusEFS2I0Wh4xL25Mt4M5cTsyUHRWfKrGxazLCJAWFDKblVByNCA5e3HHy4EyBD57JW7vonPY5pJ0sd0iKnIb9wjpioDQ%2FLUumY8gJIk1j5BwkB3h9LxtkLtqiLLnH%2BUp6FUEL6JQziZjD1VVo9sqxMK%2BSgM0GOqUBhxH6pSLGdlhLozv1KMjWvF9WjEiftVnlqLKMCV39vGnC7FjIl9MLQSYph1DW5xB10ZtKZYmmZDjy59om%2BuTjed7H9%2B1%2B0i9vKu%2BB69%2BXCmnqMVAFVo3%2Bbzdkzw0im8KUOxU8nKY3%2BXIZ8uwKs4ijgdlvyVzDqXvVdVF6IEpeCYLali6KDnEvXyQ69hsK4vbz%2BVlEv8foKTnzzi6eFRc%2B%2Fs2REVag&X-Amz-Signature=54ada453aec192ff7e455f7a42f1003774b05de66e8e173f31058d025cc4b394&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RUUDSTM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQD3wJ0JgTOrjrhvVQBd9j8gV1cgckXrP7hebGw5sAIYvgIhAJ7ME1bJYDEr2eLCmXBsh27KZp%2FAipmhGhRMMHt4IyNWKv8DCCIQABoMNjM3NDIzMTgzODA1Igw2QlE%2FhOnuXLK6qt8q3AOTGYuylf8nAoMtFn2wWeYDAnVxFKBwuY3hT7q%2FCQPYZq6s2KC5MkZKrSdpcqfVSuXImKKzmdbUXvLzlDRqxwCVyvk7RvmlHPJ4mT0X3K0TAfoJzrNI%2Bn%2F0ou9mBfgmv33esXffUDH096qCEO5ee6Ayowh%2BqYiC0apII19xdnRdYojXU0ZsYyJM%2BZpTPwFqC0i%2FdFhSsJTWgHc42tUZ87%2BfZ3vlQzKPN2RYRdbfxanqUKcXu4hxuachAAIKbhlhcWG5cWYLBUUDm1LHQ%2FIdpdvn8U%2BOC%2BWy7HdZ3FJAcv6CJPEz3lQ8acmhdeK%2Bqb0C5hQeerk97fIK%2FipOZgMZ1jtgcK4lYJOObprv9KmuFX9x7WNQDdORrHYovF7w%2F82V9dHNd16qLcgrzbz1pmt5nSqleGbIUyVJqbH46qJ5UcUb26AdDvHWR6mCBfTwpwDHXUa4cFx8niEksWOvQtgjSjWhiMg0QjCJwwDwG3ELxcRAky%2BBjRHNLIz5rF1IY9IovnTDkW5sTGVg7Frm546S%2FuQDFBiVb2Z9XGHVyQTuEEFecl795f6CgUdq5EgQ5lnmFsKOw%2BI503lNLrPCN7JDdOtVPckLgRHP6TUNWqdUNMnP4Q0WFuINOHkXtlqhMTDWkoDNBjqkAfl2eCY9oxhvYEWeUMBO7I58hf3Kmp8qiIc%2BE58OWdw1wwycpoUV1Fx9Xpf75e6qdhzqzxFUWtkEkbYXGCYTvD4Su9rs29F8fhqEtPKBL6ROjBMDtu%2BNIOrrQbRVFylDCr4uCmZREdCgGNxgKSYCqpCM8uJfKiZs3kesM0iu4e4mb1xrO%2BZiSaf87Z3IerZNH6m5sJw5%2Bm17cAgVBmAfhXCl12Ay&X-Amz-Signature=839b79fa0faf43f3af609d811c9f3d395cb1399346e095dd5af2906e594c8b14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T26NI43N%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIGZ83FRYSvL0MMKJ0bhavyYDFsTuMAskkGRGaNGKGdQPAiEA4U6OXpSmFnFYIzzxu3YQDE%2FM55R5GiJqvm%2B5lbg6LZsq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDHBaNtWtp8gzxxG4gSrcA5iOO7%2BpYSJeZjIgXpyMUSmetHV77VbrkE50kD%2Bp9zqRfYVdo%2BzvhaQRyEBchjcRdOoppBKqhK64WEKdetVeB%2FMSkgwXmjVszzb2OnfZOHya1wHePYbUTvEkOM9KXf6w3%2F2Jpo1FEJ%2FnUG7nzy1A9cLNp7YfVARXIcjHoPz%2FUlVPhzU0TBBw%2BzXUjYwe%2F9Pys18ZkL3C7L6TjX4Ye8a1jN4kb%2FkC3xPKgVpb55lVEqkOvJtcvnC2redb0Io%2BxEAWEfUNgQLDh8JrhE2zoonVIaJyJ5d3jaJpr9KzWJcN%2BlMh5qQd%2BB0J0jUUcCPsg2s5ybqFft%2FoEqINEv1p58UIslnbyaiViqprjZ2FRM26wLROOaIEmVotq16rCmGGWgtox8kWykLRBWme36FWhim98xv%2F7u1QLEj5HAnieGhLuWppdTsF8APUcTYAVOAOsanmK%2BkvAS9ZCcglub3FTG%2FfSmFSCR7TVEU8xYSE4x%2BkKTb8%2FxsZqiMa4Eaa%2B43ySe50d4nOwZZ88HlDzORlDLPb1ND2Kc6roiPsmHDF2nxgd3sMGz%2FU%2BFJQ0P31XvpoXx8e4MptcZE47JXo%2Bn9P4g30hy3SzwIqtW%2BrX3qlKuF9CTUKgkIv0ENwPXWHarJvMPWSgM0GOqUB5Hx79cirh5dpeWwy4UwRBOEvDAZmokhvwHFFvHC3wEhDCvlf5EM9UgEi45CyoURtVlenHD9whWa%2B8lAroPIOqmMSJJGjVh6RE1b0%2BM%2FkET2wSIIBPgZhRgnt2KTMMBbF9kFmLEeut%2Bnr05eFGbl%2FhQ8yS5xWAevXEHQ3ZulWJj9mJgamqIIaYUVvammkgqOfcRhLZPmmyoCLtDQKvFMgWnk%2FGlrF&X-Amz-Signature=f79e1151e34edb38b36dc175d630d95c492504a0683175184381b58d5d5898b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGNT2AIH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCvywFvgDG6K5HYesPR0onToy6hngepvEVi0dpKFJEWHQIgTvNHnSgwo75HQdfCR1ssFwsTZf1bBi4jDDK8t5fvVYYq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDG154kwtEhOiSOmyyircA2QyqYssjUprJcUflcmJ3bUGKdN%2BsVnCP8xRPYi%2F4x3lgikBTNtc1yMChfuD6TJJcwXuLpWuKSoBJ2ofdwWAnumiSTzSF%2FN2c62ZECQS1ZTMuc6GoBQLV6naLUdlOyfu0ECEtxf3uKey3vuYEcYevsQ%2FGzSY6bEg0HXgMEYuu5CIuIt0CUEPijPuY%2FJWmYgme57LAN6nYWi71S0xMz9QJT%2BXFXI4qKATTh8b9I25RRnw4v5xcr8oI5YMFDgaFI4lzUcPDrF4WagQovamlxTSL8F0Q09WLNdMArNnzaSLghoia9reZgL%2Fs39E1b0uq898dTlTYo0HZaAqj7XbDp6FZjAR6fr1UwUK05r3porGw49XJe1Y3TIQGydbWLRBmBsd7ierrZ6YahGw5qnCIET%2B9biJvkDeOvK53neio7lEzBNjF2KzUvVYBS6NCGkcaSwfJb%2F%2BK0TGF4NrTtxLBazsLSQi3whcQGVFBNpdPa48krz7dApbtzkQ%2FZUAwZ0jciLW2nHtokQfAlpRQWcuDeLGFpZoX0zRo4Ik%2B7Rwd2xd6b3zwHHu9Rh%2BG9bL8y9OrlbbNoKvZBpoBL6Uv1ZcY7f5qQcV%2FVwME4s1Jh%2BJEJJElAk6U%2FhzXBbCGeOXzbWYMP6SgM0GOqUBpNQX3qKbk4U%2Fqy3IgaeiNRIO4d6xwHuZ%2BQafHLZZGNjY6fJ5ThuIB9VkSgJ0D6A4KQHQEyoRO1zLySoV%2BNs95DhC99v7XGECdS8ZBkEOzXwESm3OtpJaIEEy%2FQzKcg5fJq%2BsH6BjjtfPn2l%2BtRWjfWG64N8%2FsYbORD9AbQFBN7HWPrkmuErYNjBxAUBHdINhRt1MqvC2%2F856tNbJyl6wbgI%2FwSUp&X-Amz-Signature=8716b91ecff58e3c8ccc22230b26f845f409eeaa6956a43bac6fbef5e1b97bc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGNT2AIH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCvywFvgDG6K5HYesPR0onToy6hngepvEVi0dpKFJEWHQIgTvNHnSgwo75HQdfCR1ssFwsTZf1bBi4jDDK8t5fvVYYq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDG154kwtEhOiSOmyyircA2QyqYssjUprJcUflcmJ3bUGKdN%2BsVnCP8xRPYi%2F4x3lgikBTNtc1yMChfuD6TJJcwXuLpWuKSoBJ2ofdwWAnumiSTzSF%2FN2c62ZECQS1ZTMuc6GoBQLV6naLUdlOyfu0ECEtxf3uKey3vuYEcYevsQ%2FGzSY6bEg0HXgMEYuu5CIuIt0CUEPijPuY%2FJWmYgme57LAN6nYWi71S0xMz9QJT%2BXFXI4qKATTh8b9I25RRnw4v5xcr8oI5YMFDgaFI4lzUcPDrF4WagQovamlxTSL8F0Q09WLNdMArNnzaSLghoia9reZgL%2Fs39E1b0uq898dTlTYo0HZaAqj7XbDp6FZjAR6fr1UwUK05r3porGw49XJe1Y3TIQGydbWLRBmBsd7ierrZ6YahGw5qnCIET%2B9biJvkDeOvK53neio7lEzBNjF2KzUvVYBS6NCGkcaSwfJb%2F%2BK0TGF4NrTtxLBazsLSQi3whcQGVFBNpdPa48krz7dApbtzkQ%2FZUAwZ0jciLW2nHtokQfAlpRQWcuDeLGFpZoX0zRo4Ik%2B7Rwd2xd6b3zwHHu9Rh%2BG9bL8y9OrlbbNoKvZBpoBL6Uv1ZcY7f5qQcV%2FVwME4s1Jh%2BJEJJElAk6U%2FhzXBbCGeOXzbWYMP6SgM0GOqUBpNQX3qKbk4U%2Fqy3IgaeiNRIO4d6xwHuZ%2BQafHLZZGNjY6fJ5ThuIB9VkSgJ0D6A4KQHQEyoRO1zLySoV%2BNs95DhC99v7XGECdS8ZBkEOzXwESm3OtpJaIEEy%2FQzKcg5fJq%2BsH6BjjtfPn2l%2BtRWjfWG64N8%2FsYbORD9AbQFBN7HWPrkmuErYNjBxAUBHdINhRt1MqvC2%2F856tNbJyl6wbgI%2FwSUp&X-Amz-Signature=6c1a7da2beac596c32c945c3350ae4f25c82b086548fee0671d72bc2deaef17e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3ZKDSHU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIG7cNzxMEgKRJf%2BLrgvORxuTHTelkrppO818XwUst%2B9LAiADq6kc69c0VUuVMQ6V%2BB62didBzqlc9ztUcuYUEybOWCr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMfYbXTEHRzWqKgiPHKtwDVPgy57rq3C4JwMMntSumbdU1ZOHOplAPWSNqxma4hM3W7AzKYTWecea2LbDQelW1EfwV58YJdqnyloizb6a45H04c%2B6%2FILZ4LVrepBkbOwaadux4%2Fmt1Omr2OH8tz5xwuXp58eIf4pUpCIc5QLy3EwgzcjrrXv7kByNpH0SrFtllgpQJ3uwcrDL89yBMauQejqXuLTxBsccceXgreAKzMAsmteVrcBIKxt6Xb0cPamvQr3z6lYVQi4kPJ9wByH9Jie3jRmRtu6pj9pLprciwDopsBVgGUUojPgS3ieRbkalqlrZtP3XsTjs%2BH5fiT0iTW5JxMYnz5CHBfykMb%2BSNUDEJK4fcqff6HSIF%2BZmccZJsrieTeN537vRJ3JgGJxKIUM1lLvS%2B%2BwQc%2B08%2BHUTggGsaQRFwBW3WiJVCJvDVv1%2FHFBKNiuKU1Dr3Pg2CUxxAph2oXzs66VAjZ3qVZW8NZRURrb7UNEVPk7XQOO99GQBjx6ahNy%2B1cJYHU2pLsCCTbMJjiD003u8fzoW3c4a9CYi%2F1rRdOJfKshd%2FfpeYvOJwun1WYXUa2vw2j18EgrHbftsqnLb8CCsHQiVQ%2B2QYOiRPi3QbwWSwQplkj3JRjTHacJ3JJUm3wG5%2FQ9MwhZOAzQY6pgFsIikF60t8A%2BXtCsYxBnaH4vg%2B28LTsmSu3B05E5%2FQdgtHugyvgBrDLt48ZH3IRaMk4FbbT6d%2BOfg6iDAy7hYBxVKglmVP50hOrIpChvcpeK3WCsF56qhfXGqXNCmWQodHgIi6MzNTou8Xjv7BDO1CawlXk15XvIv7bxyTIUrZ1IKsZfVUsN%2FY%2FbZJwx36tPiA6Z1I1CZV6Kt6codbVTDQIJ%2BkNDTm&X-Amz-Signature=b9d099232fb428668f51bbf18de92fcf821be738994c9ca581ffcf7f1a59d376&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBWSJOLH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIEZ7xsmAlWy5eDFVjfGBkyBaP1R%2BjjuweA561RCWyZXnAiEA9M0xYZsX673Clx7PGz7T86GcyPFX1C2ONuoO%2FooylwEq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMUghOFDqfxXThgQWSrcA7YC22kGnb7luAeMHTKZng5d1XVQY49Z9KON6PUdMG95yQUdTioRAjd6vpdhwFSdbTxYMPcP0bwEfkMeg01792kEhZ9PF9nN2NOIfZR2gOTaOrnFDEPLjPyaxr%2Fky%2FBC8mVNfDuXNlc4aj%2Fx65Wt1tR%2BNOynWOc8ju68Vd%2FfQojtNQou56%2BLs%2F6sdmfq8pVn04O%2FQ6M5bUSfwb7HvBLFUAGJvZnB4QJCBo1OMiYSGLwJYyNwpIx6nuY1yLx1%2BCKtnLHw80zSCHySCK0WLv4r9SJNWBX%2BMNlccUS5bzPd7oP3U7HdyLNCdSjJckAwLLrXTZXX87yCGHuTPaV63ySY2hyYzC8YEtJsNuFcKU9%2FLSu17r32wYTdI1Lc%2FImhX3DKCIZE%2FovtAygWZ9W8BRfCmoh3zfk1sn5D4caU3cgdJCZWdQjbjv6wCXTTvVMKsukbaKPx1WulxUPtmwW%2Fo%2BOU6O%2BrrOIVM8HsR0qkkZOoaTXR%2B%2FrFQjNOZ%2FKtopBMX2DYQRSyDR9xRWYGnluCOXzGPPs3qFftndWmku6k%2FFxPtB6l%2FgtXheQxvWoXcMzjA9yF1M12g93CFerSHHNojFJKqerKuBdLI7qUZ8mH1XMDt5B6QJ4yMCK1YNZRgXcvMLORgM0GOqUBs5qk0ll%2Fc9WPDTDwR034SEkcFMmSGgjh44hxo9XZv1a0n22xhLGWzTA%2FD%2BFWSDnTn7%2Flzg1znWSP8rjWkPg6Zh3hzl4Nc8PTob1QiE42%2F9nDc4z1OZSwlPHNIMQbV6OlQTxFROKa3ZdBaGOSxbavD1NQ9XPnIqVFDU7cOLcKecN1GuSWfk60iFYHfci%2Fv5Mf6cjz3zke745cX1cvg0960hJOt5cy&X-Amz-Signature=adf16fa4a6fba82f47d633a013817895179fd90edf0b9e6f105a2c141824433e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBWSJOLH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIEZ7xsmAlWy5eDFVjfGBkyBaP1R%2BjjuweA561RCWyZXnAiEA9M0xYZsX673Clx7PGz7T86GcyPFX1C2ONuoO%2FooylwEq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMUghOFDqfxXThgQWSrcA7YC22kGnb7luAeMHTKZng5d1XVQY49Z9KON6PUdMG95yQUdTioRAjd6vpdhwFSdbTxYMPcP0bwEfkMeg01792kEhZ9PF9nN2NOIfZR2gOTaOrnFDEPLjPyaxr%2Fky%2FBC8mVNfDuXNlc4aj%2Fx65Wt1tR%2BNOynWOc8ju68Vd%2FfQojtNQou56%2BLs%2F6sdmfq8pVn04O%2FQ6M5bUSfwb7HvBLFUAGJvZnB4QJCBo1OMiYSGLwJYyNwpIx6nuY1yLx1%2BCKtnLHw80zSCHySCK0WLv4r9SJNWBX%2BMNlccUS5bzPd7oP3U7HdyLNCdSjJckAwLLrXTZXX87yCGHuTPaV63ySY2hyYzC8YEtJsNuFcKU9%2FLSu17r32wYTdI1Lc%2FImhX3DKCIZE%2FovtAygWZ9W8BRfCmoh3zfk1sn5D4caU3cgdJCZWdQjbjv6wCXTTvVMKsukbaKPx1WulxUPtmwW%2Fo%2BOU6O%2BrrOIVM8HsR0qkkZOoaTXR%2B%2FrFQjNOZ%2FKtopBMX2DYQRSyDR9xRWYGnluCOXzGPPs3qFftndWmku6k%2FFxPtB6l%2FgtXheQxvWoXcMzjA9yF1M12g93CFerSHHNojFJKqerKuBdLI7qUZ8mH1XMDt5B6QJ4yMCK1YNZRgXcvMLORgM0GOqUBs5qk0ll%2Fc9WPDTDwR034SEkcFMmSGgjh44hxo9XZv1a0n22xhLGWzTA%2FD%2BFWSDnTn7%2Flzg1znWSP8rjWkPg6Zh3hzl4Nc8PTob1QiE42%2F9nDc4z1OZSwlPHNIMQbV6OlQTxFROKa3ZdBaGOSxbavD1NQ9XPnIqVFDU7cOLcKecN1GuSWfk60iFYHfci%2Fv5Mf6cjz3zke745cX1cvg0960hJOt5cy&X-Amz-Signature=adf16fa4a6fba82f47d633a013817895179fd90edf0b9e6f105a2c141824433e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR3PJPNM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T093520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIGE%2BtZwJ8Qfsmb0LDeFS7RLkYyoXjTrJN2sLBA7tZfsoAiEAlN%2FYoA%2BepNguqDW3tN%2BL6N%2FXGzEil98fbgHxYAjhfSsq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMeOWf7TcSh7H0NY5SrcA0HNF2HGW8hiCU6k8qoESTX%2FgUZP%2FiX1wLvTlTq%2BtND%2Fso1V1KEWjPVcUdvzfld7SLguTbI5RZ6KuLNEsNUzrQHsNoIaXUSp%2FifA7qul4Sq2PXuE5lVoXtEwBA3ZHVwcIsbMkybENOR25ExNAxBGGfPjqoyu%2FQzitzbpHCnxiVvyHkgjVO02Mjvc%2B1wnbq68Kx5RRuIwZO6BX8HJSqkDxsWFzqH8tSPmhUOFFOmqmwlRzk0D3n0mgg9fpxdXMq8lx7fLjgr%2F7TOvRUVkiDEXVdl72tFsQN%2F%2FnTidTdx%2FMTwwhP1Gec6qRDeCDKJjmoM6f%2Bb%2FVr%2F6Kr%2FYApsCpvDFvJdKWI1%2FtonuXyCKyT%2FNZ8m4sDSPyZ8lRBAMgoHWDqduyLU1GTVBGYcKOSvCDCqH85mCk4iGseztkiYL6dT499wGAwqwWExRYebuP544VJjFuIE%2FhTJm5U8rZ00UQ68LZJH62PdaizCo2EcQ9KUIvLDCfcpjG8g1igCs7mals1EE12mveGFCKCheCzd0V09acnougpLXe6qhOKmdUzjUbPudj6%2FV000%2FA3vLCjzer9758lXJ4w%2Fmc6PxXzHutm7b%2BUQfYiBWDsMsfx63rH%2BLvnAI3ocvkIfEgsnCJSWnMJGSgM0GOqUB67jx4ShZNo5vQxqMXOeJKP%2BGP%2BoPjs8jxSynx0t%2FIsjeyp0ZmgxnJU8kVexisP%2BVxUa3XH2ZGc9Bwam%2BfkHIixvpwftTiCiI48DiAcvVg9fLSQK8IJ62sbEP8RoKSrIEWIzT1iWZg3zLzxDQvbcohd8oH%2BcYDFN%2F4Lh1OUwJVB%2BiF1zIonZATjaafSDpUFIb5ZE76KMYK427ZL0DVgUhg21%2BYYZ9&X-Amz-Signature=690669923fc42f98393d9897fd314dcd45cf40aa2775294c97fee1d1c727dce8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

