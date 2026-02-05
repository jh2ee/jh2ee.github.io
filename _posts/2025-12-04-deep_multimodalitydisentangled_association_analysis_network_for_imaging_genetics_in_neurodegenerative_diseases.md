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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ND2GEDT%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIAdS%2FMhDJmSW2HdRWUg3YEcKO98yGuZUNalNODzLMWTNAiBfr33Rea3TP9voPJqNriYisnvTdFw1puMxjnvoMFqk3yr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM4HbOeLGgUq9caIcPKtwDvjJCifk5YiKznyR3Ujy1idnCUH1LHjOSbDSnt%2FODtKZT8x48saR9zyXIwhc37UvK7%2BvnqqK49RHASJdiuLO9oIaU%2BmnnVjQCktBopjd8sKA1KYbL18jg9S82VxKQ%2FSDzCUg9JvQxq76djlm4wGaz0AAARWzG3ZHOm74k0pyHCf5N3i1oyqKBaAy0nw1wa5%2FftUqf3JAplkE9i5tAI%2FyraiXXnH11oJsZT1HQHD0f%2FFqGKExxjSVIyVMxkm2sJfFg5%2F62J%2FZq7gmLIebwaA7sBvGPC6wHoFkxbJsYUmxhUC3s34ryOKKeiFDnQe4nBCqu0UULDNRSSMjPmotp5WLSXrGOdqJ%2FgGUX4Wsog5nC%2Bos%2Fa7KH3HOIL03PJAgR%2FDKJohFty1t6E1ybDMri5JYKNCUOqn8IbGtDZG%2FL832uU%2FOmfnGildq2Kr%2FpqeZuZ4Dky%2BdWo8WSrxWkMj7rlln0LvkRgv1oU8uDKADvLFhJCy6g475Dbz3fR%2Fne%2FiydXqhbCgwe%2BrHSbmwLVFKdWqn3ab%2F275ZUtvn19FLZIluAB2f5dzxnR4jum0Q0V2f19f3RU74uRFf3tyCrgjhnCB%2BKondKhH%2BsLq1L4jn5AZaCtXLqxstPrHlbC6GxxJEwn7ySzAY6pgF9tgwo1HMeFYpb8xmW46ZhmBYreHMbykXAxyKhMxzAEgOo7z64%2FMILfqdRuJUXtUTZhBywp4vbECwh9L9FbyRhNLq4wBhEasFRgKiGPMyLWOdNrJskRDZMias9AcBwM%2BFbLXgptI1u4zt54NAYOBHvbC6Set5nz%2FszwfVfAfvamrvbLVKwWrlseXrSjrmhZyeGDlbMVCzppfjysvJbNOmb3v8qF4p3&X-Amz-Signature=bc9630056af616ef32df7f2f5c94ecc452fccc01508d5488bf503c621e277351&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ND2GEDT%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIAdS%2FMhDJmSW2HdRWUg3YEcKO98yGuZUNalNODzLMWTNAiBfr33Rea3TP9voPJqNriYisnvTdFw1puMxjnvoMFqk3yr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM4HbOeLGgUq9caIcPKtwDvjJCifk5YiKznyR3Ujy1idnCUH1LHjOSbDSnt%2FODtKZT8x48saR9zyXIwhc37UvK7%2BvnqqK49RHASJdiuLO9oIaU%2BmnnVjQCktBopjd8sKA1KYbL18jg9S82VxKQ%2FSDzCUg9JvQxq76djlm4wGaz0AAARWzG3ZHOm74k0pyHCf5N3i1oyqKBaAy0nw1wa5%2FftUqf3JAplkE9i5tAI%2FyraiXXnH11oJsZT1HQHD0f%2FFqGKExxjSVIyVMxkm2sJfFg5%2F62J%2FZq7gmLIebwaA7sBvGPC6wHoFkxbJsYUmxhUC3s34ryOKKeiFDnQe4nBCqu0UULDNRSSMjPmotp5WLSXrGOdqJ%2FgGUX4Wsog5nC%2Bos%2Fa7KH3HOIL03PJAgR%2FDKJohFty1t6E1ybDMri5JYKNCUOqn8IbGtDZG%2FL832uU%2FOmfnGildq2Kr%2FpqeZuZ4Dky%2BdWo8WSrxWkMj7rlln0LvkRgv1oU8uDKADvLFhJCy6g475Dbz3fR%2Fne%2FiydXqhbCgwe%2BrHSbmwLVFKdWqn3ab%2F275ZUtvn19FLZIluAB2f5dzxnR4jum0Q0V2f19f3RU74uRFf3tyCrgjhnCB%2BKondKhH%2BsLq1L4jn5AZaCtXLqxstPrHlbC6GxxJEwn7ySzAY6pgF9tgwo1HMeFYpb8xmW46ZhmBYreHMbykXAxyKhMxzAEgOo7z64%2FMILfqdRuJUXtUTZhBywp4vbECwh9L9FbyRhNLq4wBhEasFRgKiGPMyLWOdNrJskRDZMias9AcBwM%2BFbLXgptI1u4zt54NAYOBHvbC6Set5nz%2FszwfVfAfvamrvbLVKwWrlseXrSjrmhZyeGDlbMVCzppfjysvJbNOmb3v8qF4p3&X-Amz-Signature=bc9630056af616ef32df7f2f5c94ecc452fccc01508d5488bf503c621e277351&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBIE3I6F%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCICbUWB8ShlpAJsSJUto0xxxlm2SeRScFJORfsAenjYMiAiEA2fzesEM4KXMWKdptfWhjXD6iMfWLHR9FPS7SQHR7mywq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDGuX0230n9NlQViOpyrcA7jGaXUjwULiffbmmmDCMUYJ3YvFz82K8eDbs0hOW6hUxWLTTw2jLb20FIhGTAvT3B1RXR%2Bi7zQpGHyjIVrvJ45snsCwjdBmpXqJ8nqw%2Bg%2Fghq0bBn4wgNLMBeMhSe211zSebReNG1yWUIzGdh0pEppglyrW14i%2Fu%2FP2wNc%2BUGrhe2ys3Gm%2B6wT7f4OILZcWGZqSs6MzxXgYNlJ0oMpwJ6zaMvGTG29QD6wNjIJBw7XJR1YMCHRHzoXoOxQRiA0BpvWndvjVTQkulNPNpPUZciX21XRwmOrGRZGw8aSZjyIPpP3KqorKBJMlf7rQbSAXkUAk16myftIioKDJ488hSjE1aca%2B%2Fs7ctljqJhFxV4IaALfpE74vms1ifxmuY5NDvNx7eSUMCVxXAvWupMQ8z1W55D9NNf6mcetGGqH77QlbMAry9%2FOcXSFwxxYzftvYP8vj3KkAXRG6uVXKHTPT2GW4x3AJD%2FRzkJpiXqgylSdKFuAlb84Pxp093km3wEpDCk4fQMXS%2FecWy6GKn%2F4j%2BDDjC%2FFjNqoH%2BPcq7w%2FuzzfJXGlQuYIZE7EQCyakS1J0J2bhHFv5kDdjfTb4QyiN4JIk4LSwNuDh2yH7x%2BpUW3J35IGhKOxXWsSBxaw2MJS7kswGOqUBvnz%2BhEYEsJy%2BEfjvNlvYzKA0oeUJgp7uM7mkTlFE9s1LjfH6r4dBo4LBxTyCADdDFi4SUJL2l7eItzKXmTIuxf404%2Fr%2Fq3JeCdf6Oe%2B%2Fo7umsiCelp8P6bqpQ%2FxsCUva6%2F2EpF4qVMM0VTd36G0CzeieHHZA8xoegqVOwy7V4hwH9%2FT90tIvWNjnxXdpcnk5UOQm3gF53GYLC37YU9EzQXfq1DH%2B&X-Amz-Signature=edf2549da6b405b28d137d1597d592b242e405eebdad40ebd018a862db0bd343&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXWNJD2R%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEjTVXuaWDeTn%2FliJxtuSLcWqJLLANNMy3KeZ5NxxTOQAiEAviMwxmHkylZrgR13SwGQp2Q9xuK%2Ffmas1It8l%2FMGeZ0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDLfayjZLQ9sbrANjoircA85oCAofnwJCjheqsU7VOsbJqrVPDgz9cixEkIiRJ6OtI%2Bo%2F7%2FYGf4MZRuLa%2B95HHWQDl9qQGENpWs4kH20oszXfVfvvJ%2FwTzUKjG6zHRXEjDq%2FL%2FOzSXLbC6NN7ErkBP0X3Daoxf6yksFXKhES%2BZaTUpOTo7caVmUUl2G9Z0DUwTHGpiKAkptEVDoGsQkD42bGzx815U8ypybUYSfd0hrk7V%2BxeWko%2F0LgQmtXvmo%2FhFsBGMGwVyYzbfKOqmU0GjnNa%2F7uomtBx6JL7nzo0dAnHyeOfZf%2FJLfMZqDKZqLjKclVEfE7A%2FNhaX2VGdNKTyaIp7YhMXTD9Xgz07NHmvptbsU%2FfiQjQJJYI8Iha8bhi0OREzWT4p5f2SCrhz1l2M0EpIKiti7zv9ABj3t%2FWDyT6lDybMrbbLvH8mH05x2SWI1PugLyVjA9q0LR4%2FrvDTIPJ30gkZpp6%2BC3bgQNPRB1D2eBqx8%2FPG5ey5jjN%2FmRcjMov19w3q%2F9I2UrKzzVJCflmYPhU%2FQ8t183RXm04n4b69ku%2BhB1RyWR51Kh8QI73Nz1NzD6TNK9pCPVG15TCUrivnG9lrgBPX5%2FOoFCv6brA4OCGYfImD0sBqoTePsRNkUY4P7au4%2FrVhH8DMJO7kswGOqUBeJeKc8KwYcplMho0GJ0lDH%2Bq1J6OLhRI7PvL%2Ffytz5v3RHQ%2F6KJCiUBJGpGmZrEbuVLcsw4b%2Fk9FVTeXC85RWf9v8dR5f70Q9%2FEF3fARFfhmtANo%2FVOOFShE1Rmymlw3fPrNY6AUDecDoeETm4FDTx50skQDmNj%2B8%2BjdgnoBGsIJ4sFz%2BtAHeKY73J3d8jT4jtMQEQAjOrpEQB0l1UGcqY2hSQQ3&X-Amz-Signature=01196ef30d6a47dbe847ac21597c73f87d2a0478c649960abee12b6d3f21f8f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXWNJD2R%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEjTVXuaWDeTn%2FliJxtuSLcWqJLLANNMy3KeZ5NxxTOQAiEAviMwxmHkylZrgR13SwGQp2Q9xuK%2Ffmas1It8l%2FMGeZ0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDLfayjZLQ9sbrANjoircA85oCAofnwJCjheqsU7VOsbJqrVPDgz9cixEkIiRJ6OtI%2Bo%2F7%2FYGf4MZRuLa%2B95HHWQDl9qQGENpWs4kH20oszXfVfvvJ%2FwTzUKjG6zHRXEjDq%2FL%2FOzSXLbC6NN7ErkBP0X3Daoxf6yksFXKhES%2BZaTUpOTo7caVmUUl2G9Z0DUwTHGpiKAkptEVDoGsQkD42bGzx815U8ypybUYSfd0hrk7V%2BxeWko%2F0LgQmtXvmo%2FhFsBGMGwVyYzbfKOqmU0GjnNa%2F7uomtBx6JL7nzo0dAnHyeOfZf%2FJLfMZqDKZqLjKclVEfE7A%2FNhaX2VGdNKTyaIp7YhMXTD9Xgz07NHmvptbsU%2FfiQjQJJYI8Iha8bhi0OREzWT4p5f2SCrhz1l2M0EpIKiti7zv9ABj3t%2FWDyT6lDybMrbbLvH8mH05x2SWI1PugLyVjA9q0LR4%2FrvDTIPJ30gkZpp6%2BC3bgQNPRB1D2eBqx8%2FPG5ey5jjN%2FmRcjMov19w3q%2F9I2UrKzzVJCflmYPhU%2FQ8t183RXm04n4b69ku%2BhB1RyWR51Kh8QI73Nz1NzD6TNK9pCPVG15TCUrivnG9lrgBPX5%2FOoFCv6brA4OCGYfImD0sBqoTePsRNkUY4P7au4%2FrVhH8DMJO7kswGOqUBeJeKc8KwYcplMho0GJ0lDH%2Bq1J6OLhRI7PvL%2Ffytz5v3RHQ%2F6KJCiUBJGpGmZrEbuVLcsw4b%2Fk9FVTeXC85RWf9v8dR5f70Q9%2FEF3fARFfhmtANo%2FVOOFShE1Rmymlw3fPrNY6AUDecDoeETm4FDTx50skQDmNj%2B8%2BjdgnoBGsIJ4sFz%2BtAHeKY73J3d8jT4jtMQEQAjOrpEQB0l1UGcqY2hSQQ3&X-Amz-Signature=ecd9e6a6420de7736e41e3e7f695d01b8a11cbfe71b35a67d1b14a3f4f217329&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRGCDQD5%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIDDDGld8VNSqrOQkqdvpJbBrkeK7If4JQ6XG46WQdTTFAiEA5tbqqmlcvCbIk4zjRiTavOlZiY%2BBqFmRjbu0E8OtSbsq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDLSj%2B%2Bw4h7TPWEXMZyrcA%2B5iV1FbM4bqoeOQjDUEszB0TbehwAUZ5Lkj7LBi4pq0cwlUNbjJGcTZm%2FHP8BP3l%2F%2B5HSClpLqzhUp9lbGIHS6CRZVrPBDZYmL%2FFScrz2tmLNfuEbmz7jR4z0pP0MusC19Z9G%2FHA4GptHYyPPD4U3LcFFW9vxThDLmlAv9miv4%2Bv0Qhb2H7PzikPH76ycCl5zUb%2BbVwYdef14SBKxZ2FgQaSu%2BUwgJgsjptkE6f6RAnwD20Q9sM2vw2ZkNOPhH30V6qsx3Q4siVOgYrw6B%2BVzjHUhzUghuXNqVfFimabyuL97N%2BwGoX%2BTtaEB%2BrXpfxVPRz7k%2FYSp9zTsGyF4PUZxK3hMNr7Y0LQw5xwNoTi6FmHls1qsZSiR6NvjPtQbJ6PZZ%2FH6dHBRsotpo2Sk5Ko%2FpbWXq6hK5gwZ0LsvgzmzNg3OZchoMNl2UtbC%2B06JR3WqSr9inKhzA%2BTmcTb4dhtiPVc2lwcDLXnz7iq9NV9Xhtv6D95xAW73FUCE13fFGeEY7GlSXmNlX9erXMP3cOM49LWoBWB68xA3WVoWtIC2MTaFlwMFH4PgFUN9yVtsO5qOFCExo4hyXIiqITJS3zZpvnvuUCbldNDrO0TbP%2BGExC7Y3MQVstpwqlf9NBMKm8kswGOqUBt7WkpAWNL4Ypmw6E4aHfJ9Y7BAO3v%2F%2FcAqSi2h0clmCGSJLKK4CgKn9gGnDjmax6j%2FaVgFGvQ%2BHVdc%2FN2rqwfX2WuxYZH30MFKI12OgGQ%2FaJI32%2FqOEDZIhiNdLUe5gm734gkFn287J6tK6qxQ0Jh9BYqo4gJgmx87b4f441L9ivMx9NJPcdXT3%2Fhzqn8IGE%2FvAxbVCTixnlsjqfxA2dr5u4ZlqQ&X-Amz-Signature=1c6093c0e969891444979c9940c660d62f2e6cd60fe42bf75c30dd027ea61480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RY35AXG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCzcYZXKK1erKcVX05vYKU4DzcCE28SO%2FlSt%2FftVw7hIwIhAKWaGPqDiTbkUirjb86q8fWa%2BHpC0UVUQubqo4MzBnbKKv8DCC8QABoMNjM3NDIzMTgzODA1IgxzooyH61YWV7nGWiAq3AMkCDAnQIoh6LHTxpTjDMmMp8pavrYMWUpQlf4oBTAh1lD1DZDk1dPq6X7bZB9QYY3wH38VuX2oVpb39DT4Jsps2hZzMYZPZ2QUWhqwrcLszBoNi0OojnRygit1WuIKEp2opbWzAjmzVcaO8wdHJtoPnPmt6b1DbydHsjF8frb0aTcBV2sU9jY2y3WXPWzfZa0YoeXafsJL0X85BXQd7%2FoKxqmwxbGy0%2Bm6idqibWe2qwep0BpMQXNKebE2C%2BoXqBa%2Br4hQRAOgzwvbhRrcWIYiH17I8XpKajj5G5cqHwMYZIcqyUwpdbgRZaMkAqnDZHP7g%2B8l33QMjYC7XHG%2Bm1Wk%2F87GiMncyM%2BvkMNVY%2F7im3cxgQkygRV0TKLkOQ6XeZGUyiU1TskdA7aH5uYCJnfERLJgZXwDG5Ed%2FgAgKc7N1OKbKg2UZRXXjvhrfMFXbNVDfIXk%2FVGRygKQbENjpe2W5EDjDwXG22suNxNjNlIN3EIuBnWhLTVrcma5ZFI3RfGQDITBFAlOhH4TUIarZJb0tfXh2ikgF%2BHMxGw0n7bUTc%2BZeT%2BorIJ4vSX5OP24%2FSgRSf2bfUTCv6STvxeDGCVDTnidJxWkn4AG2S6QmZliAPlC4i0C83LUDAqhLDCPvJLMBjqkAT4z%2FvmNXeSSlmV5sE%2FZzznKmyZor0FA4pNP85%2F2p54Y5lG2Be6msoGzXSNBun8neFRYH2wCD5xnTRhg%2FEYcerIoOhWVS3PlBMVbmuzOKzW4ARt6VxNJLzpJayTzlO9Wh5ly16JLlbz4aC8%2FwiN%2B2KM6m1YkXK0dFqqVD80oh641HEcI%2BAax8jdjqJE6Qq6%2BV0zzF%2Bo7x8iLmHMjrPUy53c4rrOU&X-Amz-Signature=38aa346649d9acd3d2679514282664ec8cbfc4a8baed859bbc24cca8a8f6988e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTCECIAE%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDhjBG3NUYaOe69UVLZnMW6ZD4xuEXNK6btyU3MmFOuugIgLxmbh49SBZ51ENLxz63i2PLxjlq75q5Y7FinDyf73Ekq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDG35bhh2O3RoyoLlpSrcA5UCmcehNCuRZrbzh5jgO2SQXD6fZUjoETeihwndehpj7KmKPv1XbtzbhZendLMy5FjiNIRJIAxJ7OPNvKK%2BNtRebkmK26vY8ed5eneLSx53Ov2pqPXYJMI1E9evAIldywngTMOt%2FHZShB3eiInXdTHbLwIB3dyqk5MNsEs2eOmDqSMTyhhbKXsI94XFs02FoIDXekwp4HEAmxdAFBrX3x5mzK9TplSZfOWk0YMQU%2FkY4unFJkY7jwakOqBL3lvKf%2FgXWxE6rSB5INdDlKadhT%2BY518FIYR6r3rDLev%2F4YT%2FXiPFOPQ6Sp6yAZxEZDHTUO3AHtvqxcp9W0J3Lzasyk%2Bs9Fva%2BwugyMLFJOZKj%2BHBBqpyTNwpQxAkN5CE%2B2Y6cieORUVC253ot9zq1Yj0icCBL5QmXpYs%2BcdJEmtPrkEzl77nphqxc94noR%2F9sEWBP7dl4AOGpIyWCuuBCHGP71w1xeuxiJ%2F%2BWBfHeW6r0CETcHhux9XjE58AwKZqbfNYODbMHnHmLRykeH75ksoKtBtfcXnd7gjtBdlxWSf3mvaph8Koea5hOMEe6sXVYJyHAxIlswG22CBF0p3y%2B40NLpzFUFZe73L9dOxf2Lcytn%2FAAuZI6h%2FWkEqC%2FAFTMIy8kswGOqUBoy%2BJsKEVsMCGOB6YFux6Cp%2FbDLOH1j3PipaF4CqBSJT0y4TiYcTRGCrE%2B8%2B5LVn6ATiAbLomQ2Xk%2FQ7UAigqCsIb%2B0zxwt2VV7oKuzDf0UA95eA9YIcFq1D5so%2F69O1mpTzALq0qKSwvZO7Fz5ANOVw%2FP%2Fw16U0ZgwBens5zZbksMpf04wEVHSGOKcB%2BF004ydDw7U3MQ2OQp%2FKisCZjhBVVIgI7&X-Amz-Signature=1a435f2487ad2abe1c93f03f6d38a2c15ddb1d456f08bea3e9846b51e34b656d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIZ7DUUK%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCn1m1c5yj7fxRjFLFt1Kh9K57jk2vEtW8mhNBSTOIerAIgYokxUcE1WOsxygGXuMl2cwPviMl160bs4LVldC%2Bx30Iq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDBWmk8ZHQABYHXvmoCrcA0%2BdvivYtMHxwbcr7Cq1XWWigH1eJo0UTckrY7x0ocZz%2B4bPOqUjiTMyOb265Vujf2IqrDUSjD7TvLpTh41muv3U2ifFeiDSX4o3V2h9Jq9a3ghoi31I3m7jyLGAS7heiPBhx8ztGP4JF7fhgyC%2Fdmpa5z7vGxVPsNDxCEVdZQCj9iC7ZDz%2BeKv%2B3%2BoZ%2BtwvLiY4T34dUs9d5xEPL0FD2ltktA%2FWz9XXNvCtbk4LajGWpbx725cN02H912u5q5ZrjqN7zzjCXizC1VUUQd4Vh8GypwYPF8hEYvsmlpJhzA2DK18JAhWG%2BDN3Hr4h1yZXkzUHt56oGWqlJ2wx8xjF4hdiq1HCiF%2FwXUKUK36lEkz0nQyeFhslw%2BPlbRXFhkwVRK72Hqt8BHp%2FCVVfatCrydZb%2FDbPYuRvpQqKD%2BnOSU0rh2QxrjeUYb5vdzK48%2BPjse3Dlb4MdbnWDFFsqRTkZdhc2RNQqgAN0Nd6RycSNkJvJfTgGcQx0sZ9T7t7ybyiDy6R5nChXbDOIkrOQt4JFAgIFB50iBc54l%2BIB6Q05ZVQpdNajX7A0%2FhFmxyK65tDywRjeIWltUrp4nC5ACSs1oOfd3Zxjq3eb%2BhjmlnxG8FpinjyHpMFSjQczV0UMNC8kswGOqUBtwvt8JCjdsbFyLaoV4abXhCyYUK7dzNQL60zPZG4UxOxS4MjF9e%2FIihtdbQ4GHFdX3Ah1DktHGNdeNWrWargeU5EJRWR7UyD2gy2tUmIiFrKNGDIO%2FOChMdYWGcbUjxdndOGS99oLS7tNPja29bqjaADPECVRA5egyyhAx5qyfhTL4SxfelN19rXHuoGuHL8TFe0raXIGFBs%2Fa%2BIrrvVmjVE0WV%2F&X-Amz-Signature=0c8e053e010b22d02a5f7e2595cd420f0de66271f6a3e514130a2e1f5f868d95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIZ7DUUK%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCn1m1c5yj7fxRjFLFt1Kh9K57jk2vEtW8mhNBSTOIerAIgYokxUcE1WOsxygGXuMl2cwPviMl160bs4LVldC%2Bx30Iq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDBWmk8ZHQABYHXvmoCrcA0%2BdvivYtMHxwbcr7Cq1XWWigH1eJo0UTckrY7x0ocZz%2B4bPOqUjiTMyOb265Vujf2IqrDUSjD7TvLpTh41muv3U2ifFeiDSX4o3V2h9Jq9a3ghoi31I3m7jyLGAS7heiPBhx8ztGP4JF7fhgyC%2Fdmpa5z7vGxVPsNDxCEVdZQCj9iC7ZDz%2BeKv%2B3%2BoZ%2BtwvLiY4T34dUs9d5xEPL0FD2ltktA%2FWz9XXNvCtbk4LajGWpbx725cN02H912u5q5ZrjqN7zzjCXizC1VUUQd4Vh8GypwYPF8hEYvsmlpJhzA2DK18JAhWG%2BDN3Hr4h1yZXkzUHt56oGWqlJ2wx8xjF4hdiq1HCiF%2FwXUKUK36lEkz0nQyeFhslw%2BPlbRXFhkwVRK72Hqt8BHp%2FCVVfatCrydZb%2FDbPYuRvpQqKD%2BnOSU0rh2QxrjeUYb5vdzK48%2BPjse3Dlb4MdbnWDFFsqRTkZdhc2RNQqgAN0Nd6RycSNkJvJfTgGcQx0sZ9T7t7ybyiDy6R5nChXbDOIkrOQt4JFAgIFB50iBc54l%2BIB6Q05ZVQpdNajX7A0%2FhFmxyK65tDywRjeIWltUrp4nC5ACSs1oOfd3Zxjq3eb%2BhjmlnxG8FpinjyHpMFSjQczV0UMNC8kswGOqUBtwvt8JCjdsbFyLaoV4abXhCyYUK7dzNQL60zPZG4UxOxS4MjF9e%2FIihtdbQ4GHFdX3Ah1DktHGNdeNWrWargeU5EJRWR7UyD2gy2tUmIiFrKNGDIO%2FOChMdYWGcbUjxdndOGS99oLS7tNPja29bqjaADPECVRA5egyyhAx5qyfhTL4SxfelN19rXHuoGuHL8TFe0raXIGFBs%2Fa%2BIrrvVmjVE0WV%2F&X-Amz-Signature=7c7ce7ccf5c5825e9fd213d871da53ac90ec28ce7696ec27a4e6e0e268045faf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJCZRP2V%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIB9URqKeuvlOLtR1uCqlxh%2FwxHFvg0g58Q6hRWV3rz7EAiBD4cQB6ZuXap%2BDnVr%2FuHb6jRLQHHLxDd7wk84Nt4kTaSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMIipj0qrguveLakh5KtwDASI7Jn78ktOt2oL6eDz23tsEuwzxhEB%2BwYQ2vYfeFkqsvcMdh5DPGqWeO2fdvWDgra7fU1jc5zmH85gedgMli47CKs7HogrRvCZdjh%2BqNd8kz4AVbtvknrFHA4KMHtwJU4yYYl%2F9zV%2BQadKunecHAIG4AnG4gCwL1VWwUh7U797West4mPiSA58Fi1C2naG7Klh2k7kRmOzwbsNXO8K1zgZn0culmDvhn0DU2LjCve19xYsPMqfM0QFdY72PP2kAPMv4yLzNwCPNkSd774jfWUpLXshhURhmGsCXRev7JC4QIi4qwdgzoTj894rDnhEe%2Bb6CEJPeUdJOzSh6DnlGMVaFT69NdfdA%2B1CNyWQF8gqTj7iIHadoH2Cd2UqEN0UfUvbnXE7yrVXA0oZ2hIwM7fMi8fxthaedxtE%2BSXrXkX%2FEFHpqkNv1RbbWKFqp9dnz9xy4meEK4RrWCIvniS62fgAGvD%2BBqCQTibGVN9hV3xdW3%2FfQWbyrELwrb2u88KxGmka%2FAY%2BzYpPzieGRSAYn0wUXbltYBL8MWi4xjIpv6FvMC1jka6V8TvQfAcnR%2BtjbPB%2Fo7sAzDYPk6RTwQik4UiqqPCiOcN9Bhe42YjHdQQtQnJcs%2F9rmTE5pj9AwkruSzAY6pgGSBeQZhL78Gs%2BZcOpQTHApVRaKk6QYiZtlBD1x%2F3hhTTLsG%2FOOZfif7XbiC07ngkTRXLu%2F%2FPNbx5DD5g2SHM6EstHOM%2FcYPJ8cZ1Ayj9tQMei%2BKvNbPoyJ791hMQw6yz0qfN69WdeE0YUg3TvT8Usd8xCqg2k78EYjo8I9ES24RvmabTSlY%2FbulDvhfDgNdFf0yhOagxdYYxTu9wwn6igZIAQ2c9dZ&X-Amz-Signature=632e65c8eb489b3bd2e18f2f90c220375f2aa9c89fe028c137d8f56b7332e7b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDGQDFEF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIHGYlYE1wVfFo9nh%2FXRleh2P1jQ8EveYV9kcWkHrWDdpAiEAqkauR552E7WRVpmz0DVLRdHPpDzKFiWtkeC0HY1ZMkIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMT3neCXCsAdzTgUUyrcA%2ByCSvSWoCIFpD87mSiJfi7su%2FjkhmcTr925ZuZ34ar4UK7fM5ap2iON%2Fi3VhG5Ta%2FxKBnMsUXKweEBega4E6o3n1%2BHqY9q3Sdsn%2Fxdk0fAvgNaXkloVcVJ8IYKXfnk%2F8ttUCAEVCBrscoo%2FrVkI24kFQbMZgys%2BciRbbcS89f4Epe2ZroxcoRTsVTUsk%2FupbaQTbbZl8jcxsiJmXgmQ9sLKkux6pyHlYiC3seQb%2B%2BJfEdnd%2BTVaGWA6MzZ3aKlWokWsG7UglQlfzr5mp9KjHp8c0GTwf796PPsQe5d4M%2FRPDs%2Fr%2Bni1%2FATCY8ei2wmN9CtQRW92qNF1f9LeUziNmFp%2F0CS%2FYGGQbtC2AtS%2BXQIt%2Frp0Zhay0oaD2n71gqoVaOLCLkVaMMGUtKtT%2FBQBF0ZVAhZ2OAzK2K0wfVh32kPHtdoDnph7TlLGu3d82G9pm0CdBumOZxbpjSyy3v6DjbSWQHHkcSXDA9LaeOqYiqxGWhzP8Wy1vGsoJ4PBy5PgLCeXMTmS7yaO7kFpQoI6%2BcnjbHz%2Fot49yi%2BiV2fohwNjuXLfJgIB8haylEkugGUWVP6rV7LRFSrUUGzpKiup7ReLM0r%2FaDkh%2FihSj4kocNnXrxQkmxTXjqizvS4OML28kswGOqUBs9DU8ElUaiJ%2BeDStf6E7R0MmBzrbHHytHWO5mRBUSYBHxqaYcC6D7Cc8FlvUqHx4Oj5TbuX6EF2KTgprZMQyXkF11%2Fle5MdVtAKM0OynHYZWkZ7DNeja5pX093yBONTseBTOHYNIwtotYRJdrLe0gyFJ%2BgPilG2yLLGQ3g3JICapXaaQzfi%2Fs72XBb30nbdwx46iXSTwLWHOCiLg0y9wbSqTOXOG&X-Amz-Signature=b95cb25b27fc6a7348eedf338d3379ce3317aee8102250c1ce3a44921223bc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDGQDFEF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIHGYlYE1wVfFo9nh%2FXRleh2P1jQ8EveYV9kcWkHrWDdpAiEAqkauR552E7WRVpmz0DVLRdHPpDzKFiWtkeC0HY1ZMkIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMT3neCXCsAdzTgUUyrcA%2ByCSvSWoCIFpD87mSiJfi7su%2FjkhmcTr925ZuZ34ar4UK7fM5ap2iON%2Fi3VhG5Ta%2FxKBnMsUXKweEBega4E6o3n1%2BHqY9q3Sdsn%2Fxdk0fAvgNaXkloVcVJ8IYKXfnk%2F8ttUCAEVCBrscoo%2FrVkI24kFQbMZgys%2BciRbbcS89f4Epe2ZroxcoRTsVTUsk%2FupbaQTbbZl8jcxsiJmXgmQ9sLKkux6pyHlYiC3seQb%2B%2BJfEdnd%2BTVaGWA6MzZ3aKlWokWsG7UglQlfzr5mp9KjHp8c0GTwf796PPsQe5d4M%2FRPDs%2Fr%2Bni1%2FATCY8ei2wmN9CtQRW92qNF1f9LeUziNmFp%2F0CS%2FYGGQbtC2AtS%2BXQIt%2Frp0Zhay0oaD2n71gqoVaOLCLkVaMMGUtKtT%2FBQBF0ZVAhZ2OAzK2K0wfVh32kPHtdoDnph7TlLGu3d82G9pm0CdBumOZxbpjSyy3v6DjbSWQHHkcSXDA9LaeOqYiqxGWhzP8Wy1vGsoJ4PBy5PgLCeXMTmS7yaO7kFpQoI6%2BcnjbHz%2Fot49yi%2BiV2fohwNjuXLfJgIB8haylEkugGUWVP6rV7LRFSrUUGzpKiup7ReLM0r%2FaDkh%2FihSj4kocNnXrxQkmxTXjqizvS4OML28kswGOqUBs9DU8ElUaiJ%2BeDStf6E7R0MmBzrbHHytHWO5mRBUSYBHxqaYcC6D7Cc8FlvUqHx4Oj5TbuX6EF2KTgprZMQyXkF11%2Fle5MdVtAKM0OynHYZWkZ7DNeja5pX093yBONTseBTOHYNIwtotYRJdrLe0gyFJ%2BgPilG2yLLGQ3g3JICapXaaQzfi%2Fs72XBb30nbdwx46iXSTwLWHOCiLg0y9wbSqTOXOG&X-Amz-Signature=b95cb25b27fc6a7348eedf338d3379ce3317aee8102250c1ce3a44921223bc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y7TUTXT%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T135627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQC122ryAa4zwVKoOgdVjzB32%2BTJsUKuvx2uSHxAXcWjnQIhAPZTLjY5iny0esacd5o0W8hPmBNHgM9SB8CRybdRB4xQKv8DCC8QABoMNjM3NDIzMTgzODA1Igz7MvzeCj%2BxYwGrqkYq3AMRO78e%2BuKVixhnFDtwPw5iyBcYdzXGF07SaLbUBgXQo187mKq%2BYOWRIP5qoqLAIMY%2FXk2yTls4g9PfqDUSHrXwGT3DiG4uiNq4yI9mnwGpqgs%2F7pdm0u1vafgDmFbQfyvmuGlWBY6BwaKLr9Sk95VSlDgmkYSX5KIdWifsCL3%2FEG5k9NT1uWoloGmhWB2ddEvHMbc7WA%2FlMywdjXTqpVyLyUIZb%2FRnZK8Wiy3gE9rPJ2vqjDaQax4GOMSnb%2Bb9RhzVOx7rKKwtW5fMwfRdWf9MYGt%2BAvJGgfS4S0sU8RqjB9hCuWUePNub0FNhOpbOozGoTI9I9n1Df2IBXooGSpf%2FF1iwRlZrh9xTwgMcVpiVZxPglMfQwIpRUWEG3PdtWTwhldLgIR2P1KVKYQCZNTxqehuUdPCa%2FH7m7bCdCn%2Fi%2B5SSQDUZKmmIbAo4GBNkMwck7Okx1WCmfBCBtWAUQUShLJahene4DoplfKFeg0ff4Eg%2FHCWcL3SxkdGoBs3MaFg4njDTwfJzSVBo3%2FFY3zLvvOpT8c66IeCAnji%2BxnlDOgSu%2BkbZlFCjc6Bwy5ZPaitWuVkEhsiYleajb1UByfl%2B%2FfP39DmdSy8d3%2BSNIS3mn332FzmHqpdxI7xlvjCcvJLMBjqkATvWJ91OfylZXlIfK3C3uzn9LsHnfAFycxPoA7mMw07eKXEu9kVUUEyJ%2Fe79K1Zj8a%2BV1OAcC1cn%2FZjp7CINArgbHsROj81s7%2BLkvcSjs2O9zvEFnuqijnw8nZ%2BDqwKCBcdcr6xTdx3XJQ2lb5bnCHYe4Ly3XQX9Eoqiit5GSIPvCR4ZuOBH5sPg%2FI8x7ceddTH2VZNne1LsqxfGsYBWNCkPmOSd&X-Amz-Signature=2ef3294b0f8b0969981e7101169c0c3e2540f0671870b9850126268202ba1a49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

