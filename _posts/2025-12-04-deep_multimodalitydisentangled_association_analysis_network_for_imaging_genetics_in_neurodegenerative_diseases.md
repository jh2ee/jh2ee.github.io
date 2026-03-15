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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H7N6MBA%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHYG9JNU1iu7oZSISCWIG7yLMU9KvZYGqUllggpE6gq9AiEA0K6gu7XSX5g3Q77yr%2FFObsp5%2B6vrU8EwUYAGolcGCHIqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKrXyhsVp8bNh0WHRSrcA9sTPSj314Pw%2BAEFK6%2BhoXo482joj7cMAJkAQduAS%2BUFmVBTHz8K8AMmSn2HsONjjXmoFTKlNZoQfKvubbKzfOzaY9Lqt37%2FOVeholK2u4edtYcbBx2KPsEP3ybzI88AdwUwGzwoUC1DFIVakGMpb0lFdPGz2qnfT%2B4uqXtOIClITt5PgpenxnIi%2FrCzA%2BET9biVqlY1hQI9ryTzeohW6yoKSHwEKlROQ2UsbrzSEJXi5BNgr2wj85x2F9WAuMQcaLvkpHahwj%2BfpndgyrQqid5wheDkvbj%2FqcZw%2B9AUR2oyQSYwSskdUez8fkhaMn41%2FUankCVkzsoKd%2B6LN6l9pN5HzoYD029k6JCJOJQMyMfj7t6s%2B4MHfacT%2Fb4udBYEJW0QO7vDCL00ppvv%2F30dsiEBqCZso3Wv341R7POUXVzIq98Oa3RFXKBcp%2B8hxeqhXndBRVHMLAhDsRfGidaUy3PUyrAs5ZaKOr77EoIlyrfIzYxBoXrWbwe1EW59CaRSnsjnzcrfR3hNtVu008efiJl0KHGCeRAMXHfGjxQ9gpGrHL%2F11kGGhG0CNh5IhGYN2vxttIzvF1oD%2F7J1lKvkJBMVortMM%2B%2FIurU1jPISn002ls9LIXgLnpnipPQ6MLre2s0GOqUBhSDk2lHKUQsLoOmIJHiv62QxfZrpWEj2pMn7Y7fyC0qvAaBJezIV4cVzBpiA3YRkyj%2F%2FwkHaBnX7%2FzvNQifEo%2BdJvNXn7hVuc6grdQC%2FxNuMdYGA6yp1kfsdDzTuinRxYmhZS%2FwTBuczOfWNMvhpakYIbdogh9HJa%2Fcgl92NJHcb0Wyoi5EHI4%2FOM7kSynd7DQnS0WVrxGFLxCUC75OwvImyah1n&X-Amz-Signature=46b862df655e63304e0d19473ca9b7013143496e494686ba7529ce91da2e8846&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H7N6MBA%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHYG9JNU1iu7oZSISCWIG7yLMU9KvZYGqUllggpE6gq9AiEA0K6gu7XSX5g3Q77yr%2FFObsp5%2B6vrU8EwUYAGolcGCHIqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKrXyhsVp8bNh0WHRSrcA9sTPSj314Pw%2BAEFK6%2BhoXo482joj7cMAJkAQduAS%2BUFmVBTHz8K8AMmSn2HsONjjXmoFTKlNZoQfKvubbKzfOzaY9Lqt37%2FOVeholK2u4edtYcbBx2KPsEP3ybzI88AdwUwGzwoUC1DFIVakGMpb0lFdPGz2qnfT%2B4uqXtOIClITt5PgpenxnIi%2FrCzA%2BET9biVqlY1hQI9ryTzeohW6yoKSHwEKlROQ2UsbrzSEJXi5BNgr2wj85x2F9WAuMQcaLvkpHahwj%2BfpndgyrQqid5wheDkvbj%2FqcZw%2B9AUR2oyQSYwSskdUez8fkhaMn41%2FUankCVkzsoKd%2B6LN6l9pN5HzoYD029k6JCJOJQMyMfj7t6s%2B4MHfacT%2Fb4udBYEJW0QO7vDCL00ppvv%2F30dsiEBqCZso3Wv341R7POUXVzIq98Oa3RFXKBcp%2B8hxeqhXndBRVHMLAhDsRfGidaUy3PUyrAs5ZaKOr77EoIlyrfIzYxBoXrWbwe1EW59CaRSnsjnzcrfR3hNtVu008efiJl0KHGCeRAMXHfGjxQ9gpGrHL%2F11kGGhG0CNh5IhGYN2vxttIzvF1oD%2F7J1lKvkJBMVortMM%2B%2FIurU1jPISn002ls9LIXgLnpnipPQ6MLre2s0GOqUBhSDk2lHKUQsLoOmIJHiv62QxfZrpWEj2pMn7Y7fyC0qvAaBJezIV4cVzBpiA3YRkyj%2F%2FwkHaBnX7%2FzvNQifEo%2BdJvNXn7hVuc6grdQC%2FxNuMdYGA6yp1kfsdDzTuinRxYmhZS%2FwTBuczOfWNMvhpakYIbdogh9HJa%2Fcgl92NJHcb0Wyoi5EHI4%2FOM7kSynd7DQnS0WVrxGFLxCUC75OwvImyah1n&X-Amz-Signature=46b862df655e63304e0d19473ca9b7013143496e494686ba7529ce91da2e8846&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBTSHPAC%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEfqHqvAK7VzDnh6DbQTciLGdcLTW27RI2nAY9zcCW5QIgDiSUN7bsPxaYdPwaFrDyOVCkN1uGxwEEkNHOaN7YsPEqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDfyHw8i1xNgdHR9tyrcA0JhWCrkVLGTi7rzag2w24t8Rqr9W16w1cclLxRmDMDnrI0PjQJuMOOFz3Pk3GbyCIr4yjrrPqZRMSBkOE4jrM56k6oUrTM7q7dIjk5cEuDhZeGXqatODxUxUJX8JQUkRhdm2dtxdmGZStC60GHTldzFM%2BipJX0sn6RVq2Qwg8CDVuuyAzV4945UXzP0Jsf8RJ53RjknZFVarLXUKggzt2%2BNl%2B5FcFNCBlAHZ3scW8003VKyLQ413ax935DXZDChS0codbp2u3eb6TKRK3nPGJzMzP1MPZJICuzDRNlr4U5wN8CVeTa34yq%2FII9m2tXofoRHFVdiTnnyLWU7w9hB1g%2F%2FuHII7jKA22VBJHT1OBCBvRRyw24U4gDJKIZUQQOF7N9MNHSA2w4X9TF9fO6roRxQJm55MQ2IfgZUm2fJ2M8bgJ3jYN7sfOdhpvtorOWPmeedUJbawwk9A3mB3AQygJlpW%2FcaZVtBfvwl5W0mMOVxy%2BRBMxh7j%2Bajr9%2BSmCP7RXsWDgqe4FMASinllIQPrKvPgYoF0DJD9X1FQHQqvWl%2FE2IUyRkrIYjEATmYeMsGoTw9GopaDVNa%2BOo8ddO87hFolBkCWlpwHWjvNQQRt5RY0idAMuUbeVatovxYMNrh2s0GOqUB%2F3nr0%2BaVeCPl4cjaXDuXKROumPwpL%2F%2BhPz6MwTApWoNDOEA4O%2B22Z6YW%2FWv7O43wnsKzURjTih32G9JzfSrVOrqnu4zL778UxZACRJpm30X1aG5gbRBz55GBUS1rs8zEK4IkpHbBFBPllfelAX2IZq9Ytpodp%2FjP%2F58TmjApJM7K9%2FgnL1XnmbPO0X5eCriMsfgAy2VjotiZLHFNmA5esb1botN%2B&X-Amz-Signature=e7c048d8c6534f539f3e13860cfd9ad0f98a9948e3bf4430e2047b7c85d83e47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQVRQG24%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIExJ1HSKyJJcwxouT8ruGJUD5yvZrjCPGizCsGcjnpoAAiEA6FhP%2F15n3rswT6Gxi3deqE4HvYNSVmstgkUWeM0bQ%2F8qiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3Dy1YaAEWnQoXatCrcA07w%2BywuhAW42aJgSUW0hjUDJkWAiXl9dYFzR8xXNR%2FBk7QEGEOajonRXex6MG7uvyMpuIz5GxSBRni%2FIw0Cfq1iOqSGURBjP017UsVCFZJpnqRmLFXc4n%2BP8HNWdV1MZ7zAvwf1mcHSVy%2FGgDaShmZvRDFYv5uNCIYqB5C7DlWLaGiRnPmVMzIW0%2Bm5nWQOlQ64CMUZg%2BVYstpbDPg1hv4Gl0eDWABNRZ90oDCXllWM58kH%2BCqX%2BlMrZV%2FzzdpmN%2Bt4YQdL%2BTbxsTz0dqUhBYJweZLzpSwO%2FP1UuN9zBkbfji4Q7p6vJ%2BefVK8beAENwSqokMFxm3BKMQBBNiEXSZnB1UHKLzITtfE%2B1qWcLFV6i7B%2BcanIj5Ussk4T7oZY9EdEcxCgrnl6PufCFp%2BNc375FLKnKE51Q7vMk8Nq%2F9kqjxtLZIc3S2IpVCw7Jrm1czZ36m0XIjZJq3momADhQGbRVhTbJRovIIwfpSK1INQFbU4Rz89aAEXYbnbys9y78H8PH9gD7DibN90meIdN0mXNmtbAtXNedpPpAlSqy5Xo4uFvSdzT35pAh1KlW5uhKggGjcjZJFdgTRrTz6QXF2ixFEp6UjywHn%2FsiWO7sby7WWELPV6XUzfHzOmvMIje2s0GOqUB3SiQymb7CLVJ5rE4jiFa1DDE1NkZpzOCQWh4EwbJ68JYYiV5iBv4Ecjox7YePfU5C7iJPJKtlTB3QFHeh4l6clpDD5xmE38rHycfepmW2%2FH%2BddWS1JYEbETc1ijTKnmhlsK3pIaB4QA%2FFEX2o29RSeVGGuvicjxLVzFzrYw%2B3MDzQpmGhguWuWLILKpp7Kk7e4%2BEVxUYd48oyXPUyHPnAXth0%2BmE&X-Amz-Signature=a324c546925f316c3e863a61d8fd1e337a9db2e9e63c50b5180dbc9eb8a74701&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQVRQG24%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIExJ1HSKyJJcwxouT8ruGJUD5yvZrjCPGizCsGcjnpoAAiEA6FhP%2F15n3rswT6Gxi3deqE4HvYNSVmstgkUWeM0bQ%2F8qiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3Dy1YaAEWnQoXatCrcA07w%2BywuhAW42aJgSUW0hjUDJkWAiXl9dYFzR8xXNR%2FBk7QEGEOajonRXex6MG7uvyMpuIz5GxSBRni%2FIw0Cfq1iOqSGURBjP017UsVCFZJpnqRmLFXc4n%2BP8HNWdV1MZ7zAvwf1mcHSVy%2FGgDaShmZvRDFYv5uNCIYqB5C7DlWLaGiRnPmVMzIW0%2Bm5nWQOlQ64CMUZg%2BVYstpbDPg1hv4Gl0eDWABNRZ90oDCXllWM58kH%2BCqX%2BlMrZV%2FzzdpmN%2Bt4YQdL%2BTbxsTz0dqUhBYJweZLzpSwO%2FP1UuN9zBkbfji4Q7p6vJ%2BefVK8beAENwSqokMFxm3BKMQBBNiEXSZnB1UHKLzITtfE%2B1qWcLFV6i7B%2BcanIj5Ussk4T7oZY9EdEcxCgrnl6PufCFp%2BNc375FLKnKE51Q7vMk8Nq%2F9kqjxtLZIc3S2IpVCw7Jrm1czZ36m0XIjZJq3momADhQGbRVhTbJRovIIwfpSK1INQFbU4Rz89aAEXYbnbys9y78H8PH9gD7DibN90meIdN0mXNmtbAtXNedpPpAlSqy5Xo4uFvSdzT35pAh1KlW5uhKggGjcjZJFdgTRrTz6QXF2ixFEp6UjywHn%2FsiWO7sby7WWELPV6XUzfHzOmvMIje2s0GOqUB3SiQymb7CLVJ5rE4jiFa1DDE1NkZpzOCQWh4EwbJ68JYYiV5iBv4Ecjox7YePfU5C7iJPJKtlTB3QFHeh4l6clpDD5xmE38rHycfepmW2%2FH%2BddWS1JYEbETc1ijTKnmhlsK3pIaB4QA%2FFEX2o29RSeVGGuvicjxLVzFzrYw%2B3MDzQpmGhguWuWLILKpp7Kk7e4%2BEVxUYd48oyXPUyHPnAXth0%2BmE&X-Amz-Signature=09675a179d93cd1911c6cdadf90d587d04c92f560d689a5106d82f11bcefaa27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3K6HCQH%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDbH969mxwtW2CmyKTJvpTyyUF8dtb28V3Q2ZPOfta3EAIgJmFl3A70EK8u8F0sYQGjF7hoeAD8qrAkYPWF62AlycIqiAQIvf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIwsmE1XNYx2K2p55CrcA5j7g85IkBtUKsG0PFc1uCSNKw8bMy6AcquXOwU3hEOcfj9doKWgGSpkWhQIq5ugXafCedqbQhnYJXp2YjOr6uRtMwMeq5fUS%2FtqYqjKoHSnHASvHZJr%2FkDLxegkxWeb3akFxDNDCSkviWV6RqoTrdQjPTVyEoKyI8F4kZriXt9m5%2F2TaM0GIgEVMZyCAFoFjV%2FImscJmMQ0Xeko%2BaWucmkR2YkN6E1PNzhoaNFyzpwt8NWxCWuDCwp%2B5Q%2Ft4eyQ71ReVMvZg%2BP%2BnAqdVidaSTuYiaihl5Sv2U%2FduBtkKgxmDE%2FdvDM%2B1b8OPL8qupXpTkyjwWXHxEDHpISfKTM2xhSOf6z%2BujMzngHRdT3beZ8HFhVwuv0GPbIwEC3UO%2B%2BseJ9PWiOk0%2FqT%2B1VA7QAFU9TpiskR6m3%2FtRjiZzPa4fV%2BUBAZ9WRXaLnKFkvuL3gGU5aayeO1%2BukkUmva4Y9TU1ksJGx9ZOFFO%2BjpmQBrtc71AtWhjqi21pe6gnCCorNMztfJvm5kAyqr66BlH74mHGrv6rat9UEIwArbRSZcnSGZrFcTMQliwTjoaogJOPFJLmM5kt01f%2BzNaY9g2FEtXr9ACf5b37YonkL8Tt87eDdQrZsTFmP9i9gocYtZMJzA2s0GOqUB%2BhY9cIPJw32sEjoyXRM8AoPbgBKIIYuCTbnntx9BBosFWJAQFaZvKLPtzSuoreq6X5gHkynNAU1IlFaJxHDC7T2chL24bF78Zcko1iB1MAzkldLtP0%2BdaZnClBr%2FFFHv4nLrtABaTpe%2FiYdEbSaxale5bRGMnOnL7eoawl94uaW%2Ft4tCBqpNwTV15O4I208jCs%2FjnC1KF%2BErnqtM%2B02Rv37jiouv&X-Amz-Signature=f93f622ac5b55ac561ffe4d18ed5fe5f07285c4f2d3211e6cd643c03c353f435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634L23FCJ%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDOr8sfRgwD55XORWXgMsO4GLb00Il3AhLfZvAy9otEaAIhAN7sUh8UlvEeg3HSq%2Fdd2peXrSBRFTgcnoVFcCt5OrRXKogECL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BRCizKfcp7Tsh%2Fh8q3AOJnE1DzW0DauBObABOjxx0w0pWWJleMhui8%2BceTwKgmw9MjW246kqNHmidwDGjvHUbKlGQveYWc35rQFXAuDg7ucvMBKLyQFtJFrArot2MPkhHyDlhG%2BzjffkWUyrTkcb3JUm4uFT3yZU9ci6AzJWb3iyEbMId1wFwLK975b%2Bz5ECHiYBfHOZk6GDe69%2FEASBQVGUiL%2FhFmn4UWKpG6T85tjwj9CAGg3Mtac4YpmU9AceftP3NKijONbT8sykjbYxakewKtVISC6qwHhPy9Dn%2FPMDf66OFeeTfli4vXliOdbqqgLvxejDpy%2FtoZYRlg8o4WCnJ1%2FlzFNYJE7wM2xCnhLpYBL1z0lXuHTdpxiJYdgE43mZjIKm8x2YpFob%2FS3K8onJPg5Rsnk7nhfBVhkWth93b5S1VrkZ22q6lDR%2FEMv2koan6YcxLAveBo95xX8yo7Jad%2FRcbbVnFaPHXCCAKfwllZnxkbr0yfrVO%2BexIMrKVw0GB2ow8hE%2BZoOV09rQbTIo2f3fCP7H%2FwNdPKxHhO6rBfcy3JCV4AWxLOKGLwo13c9xcN%2BwhmKWq5dXMKJNQw13CoyWs7whofob2I4cSitcmN5cAzBzxqAVK8dB9VeX2LPwejp9hako8EzD559rNBjqkAVkleWaLZmYFhG6Yw1EUzkC6o1x6lROLXNvRyIC3cWXM9EG6520VUcB4hxqjCtrH%2FRCQcB8by3SJ8%2B2XsWyjXYm4N4X113gtcGAsDa43cTKeJv3YrZjfsBORZxiFUtoyetou57cuYvLGo3dmO7p%2F4Q5UuK0494Ka9fssXSerbv3n0oueNZY3yr%2FlAR2jngy%2B0IpQkBWqFrsyG0J%2Bp0tINYtJ6dfU&X-Amz-Signature=7d1a70e12e7d928be81a64de7baa0a9f1029244859579094fa038644916a9b89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T35KXWX5%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGjfXE4z2TAo0gC8VHuIaTR1Mve2CyJFMC%2FHVMvXlqEbAiEA5iMronec%2BGs1ZLtKaPjSOHBSIdy58fEry1dO8vgK7AIqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNlMFLG7WTs1tcf0jSrcA14DvQ%2BKjDW%2FAX3GDn1PN%2B6yI6IuOCg%2FZF5oOoUCEGPraCr7C5BUd01JgdN8F6KelCHsGBGrIhT90aW%2Fu4IwwxtSMwOM6IZDk4a6K5UNzvcHqdOxLHmj0kbHT31w6AE%2BzxUVarGyZO9d74vl1mgmtuHyWvrxVkT0hE7hlkopgmnrMVUW8ldBPIq5cmgXUWKDm65BCyTFhphlxnqmL1NKdk1ZTm2MyODG6LU4EdAsCYz4fNoI1SwznKN4a6XeioexSU7XV%2FUE%2FNvgOXdbQnYNf%2B5cE9A%2Fj7sHgBsGY%2Fv%2F8mc%2FuokfhYYBie%2B0MRQG4M%2Bgzzjo09p1%2FRujhH3AZNKuHe3xaJf9vxXV%2F1NdAboMPZZmPKish00F1Qya6z31mPzEh00YtRCFF%2BUJUBUVTs5VK%2FmcCvqVUic%2BHWmgMmKvjFBkhCtgQ4XJa7wMU5uX0Ne47SOWOf7BktMJyt%2ByzfkpuRmyc9NgYkIQehtuIkVVa2yJ3BTgAJRH8dkyK1ymaePP3fiDk50yKYUHsMpESVhW0aFcb9ol1aBFLyZwv8RuVGRCQVnVjBiQ4Xgq22GFATWLm6FR0IjtSe0zQjk271EhOK93a%2B5gTq81cn2crqKc7l%2B2VHsac14pl842IGRbMNvQ2s0GOqUBzmnGrPauXKYdAr4jPk6qbTyHf9LABcCAAdklpmvGdNQZIB0s3rGy0chKuRnM3ZHv751OX66M44OKjOmbJ8z7hSBKEF1XzGkJ8W49brRHmwIj7T7G1Vjru8YkfzJdMTi%2F404%2BaXpU%2FOKvx2HcKTDnrDWqnT0WRLwlgntotUoiM4q795dzcItB4mAbIMBlEWTzof39XGovKQMzTB%2F43%2FzoINIAqVQS&X-Amz-Signature=04f490294b12dafb6bfac136ef2257c3e27a5b73fc7ef6a7dbde1dea7390b62a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IOPXX63%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2Is0VuLZGD5UF1Pazcd9wYzrz%2BXE1n7%2FAWinuziJlMAiBXWtaHF%2BBKZEQeVeWGHF7WDKU%2F5owZO9yxOiCifv1yACqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSELlC%2FvpZ1M9to9jKtwDWfZlzGmyERdPqhtLxZ5kLPO0GgdJHMybuCBvqzR2yfKi267a4hNlmr%2FpYQyqN7H4b1mEu%2FzBqUaKiKPKHQmG75qIYXNn6gyedhGGzfjqzz7CXhaD2PgdHB0IzvFUEBrtsw6U5mJ1O7qgL1dpontkJZkgOB2pqhvZIVyCXYmHrbecgE%2FevjficIIRhZdWm530eZpFUaEITMBLtMjDwHhmdW%2Bh0pyZ90gTftfTccgzKDBjZqejnKqTXPpr1L52%2FTbQ34Dnn4nvrc7sbcl01csPXPPBJWdKU%2FLSVlJC4rjPe95jNSJtpUr2OxmdZgQGW7L5JcHUoyopq%2BvaTvdWeJtlO1C7HUu78%2FwJCzusujuf9I%2FWwaLFV5xTEtPXjFLgoT3go9cOjTHtgg4HIeZnQJOHX3ZIhLptKVwgwBrMt%2BoFfxS8O%2BApvS93ajlG%2FfCKS%2BafZEukJNS%2B7xXjQczuL7gk8Z%2Fv4fij5unmxWpWtim1Ne2DF%2BQtNIAO0pIYDRbGHLeJJVyhFuzNRChWrqTId2ex8UGb6vzwedz%2BVuU97Tjy0S4tOD1MSI%2B%2BrBvGBDBhNO2UaBYnrlw3byI3uu9%2FfaUQP75bE1BNd5SuTpJT7NLKcfWqDWyUhfPdKZoO9CMw2d%2FazQY6pgHc%2Bd0yRzKNZB2ur4xvNW9GiXzbPvbIr4NrNTWGSn23dImHsoSV3fYmqnlRSvXQ2q3upqdmRSA2akW1766HCpgmZCpfoS6SVa23ZD3VdVM0gh4E%2BVX6BRarvZm%2FVgB9%2FR%2BiW6iDr9YQ6ooGi07ay1RfxNnrXf5yGqUdv608JfiX%2BGO%2BUclA30ARzHV2CLzpzc9QilwITsHgNak2s%2BsdzK92amFbR5ny&X-Amz-Signature=3161cc41e9b94f375feed7a400d1ce2dd3085f788a65a8218555c5537791d02f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IOPXX63%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF2Is0VuLZGD5UF1Pazcd9wYzrz%2BXE1n7%2FAWinuziJlMAiBXWtaHF%2BBKZEQeVeWGHF7WDKU%2F5owZO9yxOiCifv1yACqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSELlC%2FvpZ1M9to9jKtwDWfZlzGmyERdPqhtLxZ5kLPO0GgdJHMybuCBvqzR2yfKi267a4hNlmr%2FpYQyqN7H4b1mEu%2FzBqUaKiKPKHQmG75qIYXNn6gyedhGGzfjqzz7CXhaD2PgdHB0IzvFUEBrtsw6U5mJ1O7qgL1dpontkJZkgOB2pqhvZIVyCXYmHrbecgE%2FevjficIIRhZdWm530eZpFUaEITMBLtMjDwHhmdW%2Bh0pyZ90gTftfTccgzKDBjZqejnKqTXPpr1L52%2FTbQ34Dnn4nvrc7sbcl01csPXPPBJWdKU%2FLSVlJC4rjPe95jNSJtpUr2OxmdZgQGW7L5JcHUoyopq%2BvaTvdWeJtlO1C7HUu78%2FwJCzusujuf9I%2FWwaLFV5xTEtPXjFLgoT3go9cOjTHtgg4HIeZnQJOHX3ZIhLptKVwgwBrMt%2BoFfxS8O%2BApvS93ajlG%2FfCKS%2BafZEukJNS%2B7xXjQczuL7gk8Z%2Fv4fij5unmxWpWtim1Ne2DF%2BQtNIAO0pIYDRbGHLeJJVyhFuzNRChWrqTId2ex8UGb6vzwedz%2BVuU97Tjy0S4tOD1MSI%2B%2BrBvGBDBhNO2UaBYnrlw3byI3uu9%2FfaUQP75bE1BNd5SuTpJT7NLKcfWqDWyUhfPdKZoO9CMw2d%2FazQY6pgHc%2Bd0yRzKNZB2ur4xvNW9GiXzbPvbIr4NrNTWGSn23dImHsoSV3fYmqnlRSvXQ2q3upqdmRSA2akW1766HCpgmZCpfoS6SVa23ZD3VdVM0gh4E%2BVX6BRarvZm%2FVgB9%2FR%2BiW6iDr9YQ6ooGi07ay1RfxNnrXf5yGqUdv608JfiX%2BGO%2BUclA30ARzHV2CLzpzc9QilwITsHgNak2s%2BsdzK92amFbR5ny&X-Amz-Signature=a435223f7d55361640bd2e5a29cf49e76d484adf2b501ba8bef2c94e4fe6519f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWK2PZQO%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDU7WKPLTiXnjNjCD0VAPGo99p962rVNqCnnGzK922qcQIhAPFIKnVOw6KPNZC%2Byu3dpXTCwrrBVF6MAJMp7ALEWD0YKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyI44ZA1nJmT1aCgLgq3AM1MdUJuLRr%2FfZbvTC9zoHuLZJyg0ztVydeFGLaNLEr0Qr0AO%2B3PEZ3jg83ge4pW5R%2FUWh%2Fh1me2iCVIuSZRSehNsjZs2nEc6T%2FjtGDeqCJcXgcTuSuvkfh3o9lnwysRLF97EXs%2BoRMPwZVf%2BadQS%2FOj6SDFSG3TuXVIx3EXfTCAywGryYVcae7CxtlMI5JTbXxkKMh%2BKCADyP17x1iY07znzwvJ6CW66NURzn%2BG7wLqJTjUjdbpKeQvPYemeVzemXIu5%2BFGlMVnVd20T3MWJLuiH5AquF6w742g%2FVol3soVHDH0Z24iPvJF2awMFXulwuUTdomuiTWDZ74bQZQIgO93okunXlVVFcPJT45IcvtfN1iDwKlFQt4VNfW74EmvyZgd53VAK%2FG9y8GwdPwJ47vE1Pw1nS4VFeykYYHYv4IhCDhaCYicpC1BgwoyLw5A%2BuhgydVMDiQt3NbM7mJDfeEt8SwBYlu%2Fe1WT07ex4cy%2FDAoYCm9l0vvJzrn%2FOpQXbaaPmIuNtpw5NCUYTQ04PTxYQuTiS%2BgO5GevprSTVM3TKxhgjc7ePuS9DFA5ffIplZBHvh6d%2FKPBOXAH9pU9Cn0MC3YjfGoauz9rvdcf9nL8DaNiYtYyoqwgYQbbDDC0drNBjqkAXMk4S7TEXsKkIfdpEkFfu4mnkX2Zn5wX2wyiWZs5J7OfbOXEsBfatcjPaHHqrUYJEkp1ex3on7Has1%2FjY4RKpkf2WwCyWeLNwmtfFWF3%2FM8r4JNx4qjnLVUdHX6DLo5YIgPwRhBjOd7ofVxRAWlOJzdK9yj9Z1xbzo1i2UER4cG4NLX9WnO1RN%2BHQMEJdrBUrnX1DrK0qA1lMr%2Bpi9EaTSGLhR3&X-Amz-Signature=92e0b9077acce79704ab8fc2c3830e456f5c1ab486c65971511329cb3f73a283&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLC3RV4E%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2BNO6WVuJKqTSsULN%2FSPDDGhW%2Btz%2F%2B0eOcP%2FS%2BHRR1XAiEAtZWGUP9B8uGOIGvX0K05bznve4PkR%2B9d1hIEba428V4qiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLwUk%2BxS2giMIo6xoSrcA4zydllUwIZAMFsq8ByHZKpd6WLJgVngtsOts9uHZRmPdvA2tmvOrgeOz5p4F53PMBnWthVlyYbAk2H6y%2FYlDPDigBe7SjVl%2F9YcXUTk8XRURnGyrn9Mnwsj%2FueeaqmFncWXnzj9%2BJceqVw1bCKdeky60IL9z%2B7hXoUbABzsuHJEXhOKfBeXYA%2B90k2BXW%2BSNiJiIqeCz6W99QgoJ17l6Y2kop%2BSria2jZyGKbEJblYs2G%2FDHNQvp4o0hQr9Jylm4DKlkjwZ0xCFBV%2BCLh5Yc8zjoJ1J%2BAb6ElsmoF2AXplnl8B7tSDbpSYlVl%2B%2Fs7yH0Bu%2FiTLdheB89%2FwWwSnc13tieDlokB%2FQDdA5S7u1JfS9unNIiIaXUUs5kbwrY%2FX%2FCtt1lsEZV%2FNE1VcfoS4ike78osKk0XAUbY4YagvQ2mWXCRMA1zgFgOfVnIAzQQPfT%2F1pvm9BTvT2eMn1wBOe7eHDC9yxDnOOeXLQcrkTl9xQAeCfZ2rdBMAXhTLrHtRdsVjq4JH1Bw2C5HF%2BDD2ytbb0IUJ6Y3z1YbeJTIYRNv8SooIo5eSNMo2CAtwi%2FODOLuHb0dAa7tdDTzo%2FTdL3tWIKWyjg%2FdSKvlvIcZ4Cqnw170rM8biPs9oHKq5IMOLo2s0GOqUB6w2eiJzQnnxkUxvScl%2FmznRKMQKr5jKnGHhua5Ng5hZm%2BhO%2F60QT%2BsRwtYIvd8g7sHa05s4sFkkJM8NZRpsMsoiNxPyOMuFfW5OpQ31%2B4w%2F03WvCqjNq4ngH2xK%2Br0ial1AbuEjTlFLjPMOzCWQ8%2FlNekYepPrZLha1DUfMVjt2%2BzmUPRAJIunLxbMNhGRYlqTX7fDn29b9vaFGpDMHS8xqplZkr&X-Amz-Signature=570c6c603e54b70bc463eefe7aee8fcaefc283fcd8e3f7e310d9ab4d21c7c200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLC3RV4E%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2BNO6WVuJKqTSsULN%2FSPDDGhW%2Btz%2F%2B0eOcP%2FS%2BHRR1XAiEAtZWGUP9B8uGOIGvX0K05bznve4PkR%2B9d1hIEba428V4qiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLwUk%2BxS2giMIo6xoSrcA4zydllUwIZAMFsq8ByHZKpd6WLJgVngtsOts9uHZRmPdvA2tmvOrgeOz5p4F53PMBnWthVlyYbAk2H6y%2FYlDPDigBe7SjVl%2F9YcXUTk8XRURnGyrn9Mnwsj%2FueeaqmFncWXnzj9%2BJceqVw1bCKdeky60IL9z%2B7hXoUbABzsuHJEXhOKfBeXYA%2B90k2BXW%2BSNiJiIqeCz6W99QgoJ17l6Y2kop%2BSria2jZyGKbEJblYs2G%2FDHNQvp4o0hQr9Jylm4DKlkjwZ0xCFBV%2BCLh5Yc8zjoJ1J%2BAb6ElsmoF2AXplnl8B7tSDbpSYlVl%2B%2Fs7yH0Bu%2FiTLdheB89%2FwWwSnc13tieDlokB%2FQDdA5S7u1JfS9unNIiIaXUUs5kbwrY%2FX%2FCtt1lsEZV%2FNE1VcfoS4ike78osKk0XAUbY4YagvQ2mWXCRMA1zgFgOfVnIAzQQPfT%2F1pvm9BTvT2eMn1wBOe7eHDC9yxDnOOeXLQcrkTl9xQAeCfZ2rdBMAXhTLrHtRdsVjq4JH1Bw2C5HF%2BDD2ytbb0IUJ6Y3z1YbeJTIYRNv8SooIo5eSNMo2CAtwi%2FODOLuHb0dAa7tdDTzo%2FTdL3tWIKWyjg%2FdSKvlvIcZ4Cqnw170rM8biPs9oHKq5IMOLo2s0GOqUB6w2eiJzQnnxkUxvScl%2FmznRKMQKr5jKnGHhua5Ng5hZm%2BhO%2F60QT%2BsRwtYIvd8g7sHa05s4sFkkJM8NZRpsMsoiNxPyOMuFfW5OpQ31%2B4w%2F03WvCqjNq4ngH2xK%2Br0ial1AbuEjTlFLjPMOzCWQ8%2FlNekYepPrZLha1DUfMVjt2%2BzmUPRAJIunLxbMNhGRYlqTX7fDn29b9vaFGpDMHS8xqplZkr&X-Amz-Signature=570c6c603e54b70bc463eefe7aee8fcaefc283fcd8e3f7e310d9ab4d21c7c200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGIK6GS2%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T133834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBXA7pw0o%2F99VxtubGOr7llV7wiQlTDvz0qEzGpwhC62AiAxv1wpGNuSS8P0WuML%2BWNmWTmJTPNjVEUy0tYZUTXUUCqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMb13Cm%2BDyMUEdLfwAKtwDkXBjEK4iplN%2F4dh6EtxlWr6i4aeSxbbqA08y0xbMuNnw7kc1KD9vM0ETPkaEE%2BBenYlbggIIkbD1twufk%2BIxbS%2B2OWrCLk5GGMZ%2FXfH2wU8unK5t6qZwDZmaicVmw%2F%2FBKBnf1IVzUAmXOR7YwAzESz%2BZnvmr2isSkvcmc%2BTGB4t7jokLVCycx%2FZqgCxk4XlsDvGi0umgFaeeHU770WacZNfEHLDVWDLJkquCDQlx3oTDLACQZfUHp1OtawsqJSHE2xv0MatBlxg8eUCVsrm4VOk%2FP8h5RGTM1TqNfJULmzoY45rHLnY%2BZprxi7oggntYMHF%2BxA%2FoKVPeJFA9k%2BlJADOi3WozLbJCZY5N%2BmWgQFY8aLvs2Dtmh0%2Fy%2BOi8e4NrHmwr4JPwdZw15MJgpwJYWZeqpZA39tEnKCp7urae1eeb1Ra54cCncX7ThxpGmZbBt97OetuLFH2eLOWDTCv9qkP40RwLaix36MTrzbBMjIaPXWip2h7aP6eRbn4X%2BIhKr2evtKSjqOI0%2BLxLSxP8ZeaVYmPyCVIZpqEOSKu2iBJmZaB3ZBUkegCuihBJdMBjl%2BA45eXvXF2ZKysFaP9dtFGuDoHluUR3Cbuy5TsCF7nBUsLvr6efnep9xVcwi%2BjazQY6pgGaOzYbAM7qG6W5vzwjoUT8foD7xk0BuOqCsZCmQo2TmIYEhGgoLg9byK0DNkYmG%2B57%2BXM8ScCVs36YBH%2Bv8SIU8bAr5zy9fd8Ustilrl1ub2PtUtaVTt84nrVANIVwsTUSDHSiXKVp9VowD5lKd2wOGd7I4oIHNZcLUbXTefkR0wryhwMvcBd8X2dTeuet2UMCem1ihXD%2BNsZRIehbFNZRUmsxFVvf&X-Amz-Signature=9a623fb51e574ad2d02f0d6a4e53a1dc9a499b7a16015ce953837166bd3ff354&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

