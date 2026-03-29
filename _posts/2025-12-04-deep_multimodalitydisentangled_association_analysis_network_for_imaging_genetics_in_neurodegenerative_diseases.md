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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CTI6QT4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDvlUwbwlj0kDf448wKn%2B26T0BwlWC%2F%2FcrHzE%2FkfNHN6QIgY5KQYbAwH%2BnFnSl97MonJz8wpOotVYmZGx5tM9vhJM0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDOyrGvmI06P6lu762SrcAzNXAICbTpL%2ByZ2XNKkaZDDn5KyOB5Bus55HzQn9oVp7ouaIfkBLmBAeMi4N1QYl%2FOBl%2FX8QFykBWcRgXMcLNr1GbQF1OWYUxbiihR8c7TAyy4v1JO5LsGAWniDB%2FFDHbem6p6u2fNDSkOs0cG4%2Fm34DQqZ%2FyJQ%2BQy8V5%2F0Vg5%2FeMAY5UWyYz0VjbyfDv1lLKC7%2FlT1TxHx2bHvV9LmJtSeEiACgSLpr%2FyhzkGLjPbWL04S20Diqwl1S4leJ0agkNsWdAPd5mUgbM9nM%2BfbM%2B23L%2BtyDM%2BYwnSUbEu0iio906r2GCczOvEsm%2FYZrgsohcRZScXmYzrCVsqI1bREiNio1HojSQ2BuEr1Skm6fHBveWjpO0oFgV1wKXIFayMIMBk%2FGFqGbonEdfpVLtopU3tyiw2FRIlwFJalQdR2IW9kVLNgoHi%2Fyy5DNDPRjRBwXj07TOfJ66IB5zTk3CRsx64chVVR7IHcxVu%2B15MjE3%2BgEMsNOid2G%2F3rg9UMfv2Vdb0JBlktrqUw8x4FBllUFOYWAfnMT51HBcUMmQav%2BGM9Idrezw5xWWf0Ix8fEFCGYUHJvwno1cw6u0XGfus9VBJ0hJbkdBDJs8FfVj0CNnIOJ3tcCOc0rEsdjj7fbMJ2bpc4GOqUBbU80Troqmv9z%2Bk7UUg9HFc%2BxmYPLo58vbyxws4ElugFgbhjnFE0LPi470q0dQ5kfHCzPoRl9gPCIIkJjaBkH2BSI1faBumlvoR2Rabgp6GWZ6p%2B5JvaIPxXCtdUJ%2B0aOHV5fvH%2Bw8hAzTIAetTSkLyRkOJLQSR%2Bhj4WH6zIjK3Hnz4X7WzEfuLwFf%2BOYWclhxVJ64YTnYizjQmdOAAQmRTQ%2FSY1i&X-Amz-Signature=112ba337b43cd97b31759357cbf03376ad2763d29a454ea36586b672a222702d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CTI6QT4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDvlUwbwlj0kDf448wKn%2B26T0BwlWC%2F%2FcrHzE%2FkfNHN6QIgY5KQYbAwH%2BnFnSl97MonJz8wpOotVYmZGx5tM9vhJM0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDOyrGvmI06P6lu762SrcAzNXAICbTpL%2ByZ2XNKkaZDDn5KyOB5Bus55HzQn9oVp7ouaIfkBLmBAeMi4N1QYl%2FOBl%2FX8QFykBWcRgXMcLNr1GbQF1OWYUxbiihR8c7TAyy4v1JO5LsGAWniDB%2FFDHbem6p6u2fNDSkOs0cG4%2Fm34DQqZ%2FyJQ%2BQy8V5%2F0Vg5%2FeMAY5UWyYz0VjbyfDv1lLKC7%2FlT1TxHx2bHvV9LmJtSeEiACgSLpr%2FyhzkGLjPbWL04S20Diqwl1S4leJ0agkNsWdAPd5mUgbM9nM%2BfbM%2B23L%2BtyDM%2BYwnSUbEu0iio906r2GCczOvEsm%2FYZrgsohcRZScXmYzrCVsqI1bREiNio1HojSQ2BuEr1Skm6fHBveWjpO0oFgV1wKXIFayMIMBk%2FGFqGbonEdfpVLtopU3tyiw2FRIlwFJalQdR2IW9kVLNgoHi%2Fyy5DNDPRjRBwXj07TOfJ66IB5zTk3CRsx64chVVR7IHcxVu%2B15MjE3%2BgEMsNOid2G%2F3rg9UMfv2Vdb0JBlktrqUw8x4FBllUFOYWAfnMT51HBcUMmQav%2BGM9Idrezw5xWWf0Ix8fEFCGYUHJvwno1cw6u0XGfus9VBJ0hJbkdBDJs8FfVj0CNnIOJ3tcCOc0rEsdjj7fbMJ2bpc4GOqUBbU80Troqmv9z%2Bk7UUg9HFc%2BxmYPLo58vbyxws4ElugFgbhjnFE0LPi470q0dQ5kfHCzPoRl9gPCIIkJjaBkH2BSI1faBumlvoR2Rabgp6GWZ6p%2B5JvaIPxXCtdUJ%2B0aOHV5fvH%2Bw8hAzTIAetTSkLyRkOJLQSR%2Bhj4WH6zIjK3Hnz4X7WzEfuLwFf%2BOYWclhxVJ64YTnYizjQmdOAAQmRTQ%2FSY1i&X-Amz-Signature=112ba337b43cd97b31759357cbf03376ad2763d29a454ea36586b672a222702d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCDBWSPW%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIA0n2uRZg9pBvPXO0SzqRdJM6pzEeW1TsNE2KEGVyNYEAiEA8rCAACNnsGcPLbUbRTJyryZbsA4JrXXbcs%2Fyod08Q9Eq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDDzTaahvTMSEbflLoyrcA3%2Fye10rNSzy2Vyg7459B1PJT4QzmVYca8GASBmXwQsRAldqjtcfFrf13850Qigcqpe8h%2FaxkREoZ1fVxpz6DpRLrBQBod0yy5mmcHe7yIn4WZ0x1LOYtXu1CEYuFwRDIVWw3da%2BaOGnmH%2FGrSjOUkMeFKC1vRScIH3OE6%2FpwrrdCbVB%2B5slLXMcswPzilgcALWfw9H6MS6IshvykjU06zZ4AzOXTolOeksGKdFIfcMthRqPaVTGFZeJUQgWvs%2BmVWCWNtOI%2Bp1l1P2PYvGwSzv4DbisoZFExt7CadtLZKzfCHWA8TF6LzAryZZm7Ht7lf751MbRVD4MPTF6TPS65rStBzZulGj4KNn%2FjAyeWm4W6WNtreDxY34MZTD9%2FpzsRu4dusyXx2g7AdtrUx1uib6drhmpFe8YmHEUmNw9z5yAyKh8%2BY2HCfr8FKU7vVy%2Bxs4N4u0h6Exz2nQokELsQOag%2BSxZbvSLB54PhCb%2Bxa47%2BfLHWtHi9%2F6q%2BhWDRgKKLRTJB5FGbXhh8gKoTGpO1xrM3p3HFPVFk0o9VZ8yXeDv%2BGTCFM2tdths%2FUG505zGGVytFdkusZ%2BBOcO2YfvVyG6b9itDJ3jUzIGBwSg%2Bviwfkjh6tyw9o6DIPyX6MOmbpc4GOqUBec6EdFh3B6hOAfZVXcjRJ5LVBwY5hzWeX4eNWfomrPN93yTQalmnA92YAoUlvSusAkhXP2uy%2BQ1%2F0OQ1Td2PXnkoaLvUcOBSaDebbP1Ei%2F%2F7xzf%2FF5BbXaLKSbiTPxh6IyJ0XY78fETnIM98SaGhHPRDkW4sQUVqpLsA82Yyx8%2FCSAb5SXJqDTJ%2BEKhkl4V%2BiZBSx%2F%2B2hv5zrCuibb5%2BbGzxy0jn&X-Amz-Signature=03155cd4149cf85b227ca04e2ea957bf77cfd77fce382c937bf839e46dfe73b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ENM5YFJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCFv555POxJCmUZDsxbaZJsDX6fVooRs7Q50dRJYx%2FV3gIgUGzUlEkkiWRDm%2FucxOgRM9YksaEJmurVjv8%2BcVmBrP8q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDESdCKSush4wsPH2dCrcAyCo58zlPAcCDB%2BGZ3ZG9Ls%2BtWusaIuBnHaOCmydKQjWi4wv6qmtGvxktflXtkJvSwSmGdjh7W%2FKT2nRcWdgOeI%2FrZIGj92ubx7gT9PuCVzddDuPbKNmSkk%2B0fAljkHyWMi75cSFcKZSnAhmKoxd%2BIoweAv8yl02ergFEGW81s4133y4jDnAmkDdN%2Fi72fqCyRmWBsn0YoQC0ep30q5uFFiEpf6nm%2FCpQD3Mzhr5Ke3MX9dZG46zyYr13UZpZL01I9nYOlw%2FqepAySCdgf1qPSxpYvvuHCaPvp1Q7JJZ90fxX8p7qO4uD0R2LyJR5WDlWQ6%2FFq9EYAX5YUdeALFEyhPuh3Doxj0aSV5pzjMRS0%2FGHKnFpwwRVmSRqyXuSDsHg7NFiMC72%2B0sDqyVa7ljijGjUtGVnSc74SZhyy89ghbpCI%2FzB4J06l5sKnE5VYWQ%2BbWjJCyXIUJ77nd1TDDMwLyp%2FYfDQXS0J670JmmBxGI567%2FjUgsZA4%2B5zFZ0LWSV1Ktu4md2JAMaR6W%2FRLYPe7c4Sm1WUImg8RBF6FGpMAd1eoz5OluhGRs557U6158XZBoxQrMqautqBltRR5KjB0Nv%2BiTvvufEd8s5CPK1ClpzBAth7fF1FNQJoPqRMOOapc4GOqUBOZoHy3JSr%2F74djZbGSuDo1khRKn5y26wG977Lk2r8spMm92Gzh4UCDikjj4C3KSj8UC8aqA5p3PC6dFTZvjRc4fuSuGA20LV1m59QP%2FFVPIAJ5bIL5JV2Imn62zp%2B4eaXB1eLFKCROWQZZ5lpZ3YUNdJHdpIhuDXTOZ2kg%2BSh4NM2tzkd87kgW58fdzF3OUYVgcq1idwwV9X01E%2BhFqeXxXD2To3&X-Amz-Signature=633fe332063adae0afd08644a8a2816b1e5dc5e4858b557c18c599686d57f209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ENM5YFJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCFv555POxJCmUZDsxbaZJsDX6fVooRs7Q50dRJYx%2FV3gIgUGzUlEkkiWRDm%2FucxOgRM9YksaEJmurVjv8%2BcVmBrP8q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDESdCKSush4wsPH2dCrcAyCo58zlPAcCDB%2BGZ3ZG9Ls%2BtWusaIuBnHaOCmydKQjWi4wv6qmtGvxktflXtkJvSwSmGdjh7W%2FKT2nRcWdgOeI%2FrZIGj92ubx7gT9PuCVzddDuPbKNmSkk%2B0fAljkHyWMi75cSFcKZSnAhmKoxd%2BIoweAv8yl02ergFEGW81s4133y4jDnAmkDdN%2Fi72fqCyRmWBsn0YoQC0ep30q5uFFiEpf6nm%2FCpQD3Mzhr5Ke3MX9dZG46zyYr13UZpZL01I9nYOlw%2FqepAySCdgf1qPSxpYvvuHCaPvp1Q7JJZ90fxX8p7qO4uD0R2LyJR5WDlWQ6%2FFq9EYAX5YUdeALFEyhPuh3Doxj0aSV5pzjMRS0%2FGHKnFpwwRVmSRqyXuSDsHg7NFiMC72%2B0sDqyVa7ljijGjUtGVnSc74SZhyy89ghbpCI%2FzB4J06l5sKnE5VYWQ%2BbWjJCyXIUJ77nd1TDDMwLyp%2FYfDQXS0J670JmmBxGI567%2FjUgsZA4%2B5zFZ0LWSV1Ktu4md2JAMaR6W%2FRLYPe7c4Sm1WUImg8RBF6FGpMAd1eoz5OluhGRs557U6158XZBoxQrMqautqBltRR5KjB0Nv%2BiTvvufEd8s5CPK1ClpzBAth7fF1FNQJoPqRMOOapc4GOqUBOZoHy3JSr%2F74djZbGSuDo1khRKn5y26wG977Lk2r8spMm92Gzh4UCDikjj4C3KSj8UC8aqA5p3PC6dFTZvjRc4fuSuGA20LV1m59QP%2FFVPIAJ5bIL5JV2Imn62zp%2B4eaXB1eLFKCROWQZZ5lpZ3YUNdJHdpIhuDXTOZ2kg%2BSh4NM2tzkd87kgW58fdzF3OUYVgcq1idwwV9X01E%2BhFqeXxXD2To3&X-Amz-Signature=9450f9f955ff4dec4abbf67bf9ae754851d78d79db252da66cd6a4aca6488f6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL5ZQHWI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHJPDRHTVWcDxq4cxELGw9TcER9tPB1NYdbxHGmPdiIrAiEAvRD5miwvug%2Bq4WWnGVOk68Tv%2BCYJQmfD01AOPQpWRNUq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDGKEdoaAkrWFlmibnCrcA92S79FyN4y3LhjZUe22Bo8PF6qc7hcNzdM%2BM%2B17Zf2ZgpWtsJ96Bb8CeLU3ib8Bu08phegg0e5F3WkNSIzMotHUqWnVYiBtMz2RB58709P7aeEGry9JyUvPUs67%2Bs2Cf6Bl6rRqkcKq1jiE4p2p6L9zCUd3klDekmazn2vVFgp2EUqgLXxVKZrjczq6pNx800E4kxRtlmegfklrgb2m3iv8Mz3dfm1lOFC%2FITaKqCNmWGzE45uT3RhOzpJ%2BAtIG%2F8iV09wKNmvAh76fcF7yM9YDbeobv5HReoCjRq3%2Bq6s8l3H317VsvV%2B8m4Rl1ImN1G9V8M9LeedzUCsCz04XWENnIjv70mbuou3bXiskfX81E6hInIDNz8NIz60D7htBjgLWqBWiVpoKde6Kxcm4lSMyxpoElR7ge2WMJdFGZpdMF3E4RwRG5t04a9TpF6ABEfEIa8yJ38iFlQAc8UOwqI5KYiVThZdSDWokk3sHtr8utimhBGfx5jcpOh5Bpqki%2Fy21VAAXVzmUFFXnqK4Zo7PdRxi3%2FFWHYkdKLpxtk2ttD1G6Pq%2FGx4PuB0Afc01NzvxC0FLfp7BaXBXsBLW2CA2uKJlGmxDiaTUm5cHh6HYLBZSGQGZIRr9tGrpdMJCbpc4GOqUBIG6L3RsOS%2F%2Fy5w4Ga%2FRlSdj862VAd62yNK6KxhMCcAHdyGD%2BkV%2B7zzr0GK3Q9%2FrCm2%2B%2BMxDoDo%2BphwjGeqAQC8xWISyPPpjryfLmomr9LT0q5%2Bf6vVBk3yIQOJtxKN08HnAVrsS5D%2BEVQTzVZ49EmkYcG1mbERatIZyb1ghoLU9Rm%2BOQy0mP0oHTLv9rzU22EdKP44brtTpFqFpj%2Br3LxZI%2F6uBx&X-Amz-Signature=fed7334075b590491f3c359ed18ed6a9b5592e45dc5a592069c8aecf74176864&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPJCEKDM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIDSZZUIMr95CvUmuSjppsaiPCWWn%2FPbRtFyfB1BjYhSeAiBONKppRiUJdQ%2BSJvgGmvCmGuKF72TOxuVTUtDWqO161Cr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMn6WBstgy4%2Fchg4b2KtwDjkW9YUHlu6OiEZJ%2BdS3M%2BZXgvsmyKNqeEg6EwqfMeXk51V%2BFCoCTjaMl6%2BQAhHIVpGEYFAhEklNEOdtj729i9AD%2Bx9uF1IAtokG8viuM1CbMEi3ZkyqEXWb3YNr11G2LSdz6vUMBBX2KPtTD9IULV2rsKvaOR5vR5VqgSoYPT5LuQp8A52FRaOtIVTFwfND1ZM0wDXGK83ExMNp5Rz5CufO5%2BsJ4HwSKfdrB27Zc1oLi%2BX%2BjVBaOJLr7TgKyTl1gJAGiwu6SlADFOeTy2XLxLlj2BZo7%2FZK1A6VgopZbexcMAmYuxDw2dd12LszN4b%2B1HeaIv8FubrRmnReQqAfmqfYA3tji%2BJGxSuHrtd5gi%2BiQEgV7RL0mGEE8B8hblX%2F%2FrL0UpkPNpgynkM6MqvQE6SqUcoRJB1sIi4Yk89WtcO94DlMiRNCbHAXEYry0vICx3%2FrhLybdK%2F%2BxNqocm7Di9cbOpgo3cQpP7AnYTr6ayQLJxTTb0aBiakYkxcbqJ2gAIcq3Pvy%2FfmbwZ5zDjeg7lax9lYWzF6fSRaoiEKEyBbHN%2BfXlm8Mr4lmev18m4bMlrK7PmgDvwmLUwkpqYQ5Lzwd4kEhG%2BifPCSRt6UnagFjhkLNuYkIQHhmsudswy5ulzgY6pgFMS6qRE6dlgXt%2BdFdXosSh%2F3p7ORJUnFg%2BB9us1y1ryiGtcp6wwvdmkW01puV%2BQ8JFgjFnPpg2jouX49u4xFjklUjzfLf7jQ7Sd51ICKLpvx3do9j2%2BmzvzbRPaoae%2FCgGexEX6WdZfBcL6ZT8Fx%2Bf4lpwBnY15vdE%2BdS8Z6DHgZpYmH%2B5Wm2g%2FrQFy7m5UIuqUaZ0NDDTTPlLKPrIWfXe4ofr4VIA&X-Amz-Signature=b8da599a3b7b1fb8e84c693e66c688489abed0f3b08ebc40a775b4de977d60fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCL6PJ2Y%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIGWKRBuAG4rjqjhmbjcEmMXXsqe2hiXV%2BkHC3mbx6Sa8AiBfIH9jwRN8s%2F6d7PrMpzNNpU0qqIAOtKQT3EqwOk70syr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMh4MX4hWV1wo7Z3AjKtwD%2B4G5MQTK8raP1G8HXKJbFpUYSah%2BWmvcgFaeuSowQ8MldaRdZuvAaDtOlgtgOLk9DvWXTkVyDVIyx9VnapkeVv0UN2%2B0%2BEt5M6%2BtgAtWZI%2BBchvwMVqPzVybKBLtjFwnzYeO9gqTd3M5aYI2A1uiUVV7baJCGjwJFEPCcBevzPznWOLlnIvpsZSS3RRtNE5UNuVLQgk64K9jxy5dsARdTbo7gMYke4FlOnGsu578buXz7nvr3IhKlsM%2F%2Bmobn0ncqogY14LiDZ3QfLGdAAX1%2FvGK6fhXO7gyW2UtGpBF9YWUTx1iTIYhXRtEp%2FZeIaG9oFrcX036aUia9xMqSg8pYBfeD8qj1vrOTXaBRPdkbpreKZYffoeELvEHy866r1Mdi%2F5VHO4IHU0zI7PiW77NOdrvn2XOb38qelUR%2FN4N2gGbgKUZKl1XE%2FcDoyxc03LXeuzMXzfF7Lg3WR3Ao%2FoQywJOwaohOPdu2njO1kbHyM7pfVJJQcFqGalz%2Fg5ez6uBlVHdPDSI8%2Fzj8rSi0UByeBE7C7Ht5gP2XvGdJu3y5LiDZnr0AAEBKeztS4Q6KNX2eV3SYCZKApO0vpTZr4a4MiV69KraHN%2Fv%2B7kteaN7eL10yB51sQlIanxhNYUwnZulzgY6pgHv2PwlSwkZ3CoWjOmxC5bEbtbCR%2Bm1%2BuO2m2m%2BK%2BBd86LBrlBlGboXrKAl1XegM%2BLGYGRivUaCYG98kb4nEWEuGpGM4Aa8B4PKqEzW%2F34I8XQ9qH4Y3HQrF30W8fGuMj6MWck3OmiAeUE0gPi4NHvdcfdp6WHjc8%2BGW%2BP8VCS9kVQmITfsPHyuF5frXiA8ae%2BlqiB5v2vHNwqQpzdhlKwDLfd3TQqO&X-Amz-Signature=5321bcd04b42cb8766f69deb779d4e1b18d45e7f8779d90774f737d137ab4c34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666K4GBZNA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIBb6jW6zDqKKznfTeLb4Ha2aEoHoZSASG1sf2CIhsHK4AiB1V5WRdssxjjv38g79MN7henCivxq320ri8dDXogPkryr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMBTV9zNKUcVm9m%2FBcKtwDIWmZ4Y3BKqjMhE6yi%2BHo%2B8xusBJCef8WRIngAGI5SdnxisPo%2BuJGN8Yl82Wsyi0HVfIHyw4NCxhFXuJGnCfjsg8D1gLgehNU3%2FQu1G3IGuJC7jSThLvYkNLW%2B%2BC8oi7nVgWJ%2BGzushfeNQJOI0upGFA%2F%2BqNDDhwNFOzWfZRu8ISq1mJp6CkdbGfJboMDv4fAGoqkyBvGonq0j2Xwa0MhqkjXd86DADppLuiCsl7XnuwkkTxCsih7%2F5YN38G3zN%2FU1C%2FnW1yNO%2FH7VfzfYkn6tJIRXBQbLy273NBrU4a4xNIt6vr8sqAttqHgHf3w1L8%2FEni2Dx30Nq5OnpLIq4%2BdZ0WdYAJoEKcgDtWq%2Bgk4vebzmGAPOXuxG9Vp0Tx%2FE8axbmbonpQ7XU5Vhgu8Am9SEMnoB5xUII0qexAQFoD5oRrUxD9fKPKmtndIzKizCKD%2F11P4aSiXmIGMqj7LRiy2cy9qAhZs%2BQaAohsWHQpp5eeyevpvMT2E%2F2kHbPKlMZZCRMdE4XWc3rSeY5GeAZu5DGBb5%2Bqce8vD4kWlJdz2HHRG6Di35Y1tGn1vriKhduqRE%2Bgb6D%2FpYzB8QqJIz0Q4QG9jhWvizWuEbybnWBpSA9LPG6X69F%2FQSJYk4fYwiKulzgY6pgEf49PugNJwrkaVknBH3ttKzfUjRtIXOKnoZyOmmcbGZvi8GiRolHsLFIL2EMl3%2Fk%2Bj3x3tEP7Gs9GGnd3FUL5ow0UhSRlSiqraKBp%2BMwC1Gpyy6WTTV12B44tmYgGa%2BNLHUm3Vlc%2BIY8NAu5jNQASYmfDq%2BTgQ1FjsGfQ59uHn6gqQpM2TGm%2FV8v%2FDJeksZKYywfq9hQyXjwMScOKF1hiAi1U%2BlWQb&X-Amz-Signature=27341994c2c27bd5b224c2086ffde6a23cdc5bca80c5a54910e2db1257b3d454&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666K4GBZNA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIBb6jW6zDqKKznfTeLb4Ha2aEoHoZSASG1sf2CIhsHK4AiB1V5WRdssxjjv38g79MN7henCivxq320ri8dDXogPkryr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMBTV9zNKUcVm9m%2FBcKtwDIWmZ4Y3BKqjMhE6yi%2BHo%2B8xusBJCef8WRIngAGI5SdnxisPo%2BuJGN8Yl82Wsyi0HVfIHyw4NCxhFXuJGnCfjsg8D1gLgehNU3%2FQu1G3IGuJC7jSThLvYkNLW%2B%2BC8oi7nVgWJ%2BGzushfeNQJOI0upGFA%2F%2BqNDDhwNFOzWfZRu8ISq1mJp6CkdbGfJboMDv4fAGoqkyBvGonq0j2Xwa0MhqkjXd86DADppLuiCsl7XnuwkkTxCsih7%2F5YN38G3zN%2FU1C%2FnW1yNO%2FH7VfzfYkn6tJIRXBQbLy273NBrU4a4xNIt6vr8sqAttqHgHf3w1L8%2FEni2Dx30Nq5OnpLIq4%2BdZ0WdYAJoEKcgDtWq%2Bgk4vebzmGAPOXuxG9Vp0Tx%2FE8axbmbonpQ7XU5Vhgu8Am9SEMnoB5xUII0qexAQFoD5oRrUxD9fKPKmtndIzKizCKD%2F11P4aSiXmIGMqj7LRiy2cy9qAhZs%2BQaAohsWHQpp5eeyevpvMT2E%2F2kHbPKlMZZCRMdE4XWc3rSeY5GeAZu5DGBb5%2Bqce8vD4kWlJdz2HHRG6Di35Y1tGn1vriKhduqRE%2Bgb6D%2FpYzB8QqJIz0Q4QG9jhWvizWuEbybnWBpSA9LPG6X69F%2FQSJYk4fYwiKulzgY6pgEf49PugNJwrkaVknBH3ttKzfUjRtIXOKnoZyOmmcbGZvi8GiRolHsLFIL2EMl3%2Fk%2Bj3x3tEP7Gs9GGnd3FUL5ow0UhSRlSiqraKBp%2BMwC1Gpyy6WTTV12B44tmYgGa%2BNLHUm3Vlc%2BIY8NAu5jNQASYmfDq%2BTgQ1FjsGfQ59uHn6gqQpM2TGm%2FV8v%2FDJeksZKYywfq9hQyXjwMScOKF1hiAi1U%2BlWQb&X-Amz-Signature=4f3d2daf145f7a041fec6332948ad2532361b5ffd53f21296e076e73b9d9df60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646MPQHCD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHIA6%2BXpvnZWDo9q%2FhICyyySDZhiPa0nRkC8go2Jv0NNAiEA8zoa8SzJq8f41ccETk5IT7ivWu3U4qkDaSdApXinBA8q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDL8HCTAO1t8uAYQI%2BCrcA%2BCMipOKB%2BB69%2Bzbl%2FyV6yMvkN4s7uQdeP2v6k36HDYHNdwItyjqLx6mDsFJc6Ckh9TFbFJCDxLOUhmifBi1ofOR5H4q3e23za7RJVTSVLi73oBEqXmTVHNh1YESvFcLAvtwhjayXDqg4YkpBCkXmfucRz4CkGS7jkoePiXnL5T7OALGujtDkn%2B2Nd3C%2Ft2nEOg77dnsMc%2F%2FOb0z%2FFgY8VUvsrOGei8mn4uyM85GIJXfJLjJMegBlLwCnYHSRjXkIU36KFAUBQnMaF%2Frv3uZdhRMB9gKp8mHUgnY0xZfjlE%2BRuYs8l2qys0CLiM6M6AOC24EgWoTZGOe5u%2Fj2hppld5QGhF6SbEEIeKkaI1%2FJmrV%2Faw8wuEMJNsiEgSb282X3Ct9KC1Ox5DKb%2Fnmej1viWF2x7R792huHZCnpYzwEq4AIonQMsrtUX8peG%2FL03J5CFUhQR%2FEaUgnGtAOV5LhCNYJZV88pdpd%2FCBF0co20nN5UD%2FPy3PUNXQEi7fzISQr6b7297IbKSI4hHviMMv1YBVJhMUMBS13Wl8pp0yQa7BkNjJp8nJGjdDr4hKl1vdPQRHIBubgI6ghkED0nUBsEvCJS1%2FITg856%2FcYglrQaptb0mLupb%2BFi0pLx1GsMKSbpc4GOqUBypsCCareFBe9y%2Fdbl2qTfAPAaxhXPc3Ijfb7zssx%2BAod4zt3%2FzydXqTGPL6VbeNxxnSyDmN5pfj0mzG3G8p0ChqrO1yaY8zKR%2BI5H4kuLnUifQfqmSvw%2BiWLKs4HgYKg4Lff1AdHrSgPWelZXqUuqwRMrR6Vz5Bc3LyUxNKtadisZao3ypNNw45RG9ieeOowQB7Bcj0MPu7meR7SiYQ7iK86dgz3&X-Amz-Signature=db33be9dd96ccee04fd9c79465724b537c8da2d839ee710c8a9c7a746375cc1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XFXEUTO%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCrpcRGgdgvo9NxUYugB%2FFkLI0GZoulE82jYRdoYhH5WwIhAJNxaj%2FCey6Sj4XQy0ENOPnPZ1AIov%2F5iCl12Iicykz%2FKv8DCBEQABoMNjM3NDIzMTgzODA1Igze6lDDBpbdo1dd1qoq3AMf7mheKMC5joXPVOJ7yldgVJAbiG3IbmiX5U7NrBiXPuxT5%2F56zkTcxCNWLRjALkG6CE%2B%2BvFlqitGuUEwmj1eOs8Kw13rioDfUdI9%2FbfkKSEIUkowl5CfpeF6wZ68s4EajGPtW7h8DfEFOucrT85%2FbwFfXqH%2Bdu9dz%2F9XzPSfIrKvMm91PR7Z9utHLYTd23cKJ3on25WVLW6n%2FNoXFJAknZd2EetAbLJ6Lsp4E%2B%2FzdRCRxF3x01T66S7%2BgHCDUnSNXmtFpkQZDzxY9JAUrpHPLaYIFv2tgy0CQKbuT5gbkK%2BOzw2WNkOSM9BArt892p5o3OvraiHV83FzKsgIT7XKm8tUz9QrqIgTyxismOv8fS5t%2B2gIErssyciJ1w6I5bEDsa2HYFlsbvgFCN1uFpRZN7%2FXBx%2FDBJJkN165Xllg6BA9Jel1YULYnCDojv5sdwtQ%2FhF7p5%2BOM7fb2DuGB%2F3awkNvt2deUTdJabtP0Lrm8mqlw0LDsnFPLiPOn9Mru%2BG6e%2FosbEKDFBrOBGO5xATziQzf61cHjFVB8oVsqVTStKw%2B9D6eTZ1tE32Lb%2BfJ5ed6NyXgn6jwJFlaKx9Au1fTNEvQMJVORzR9GbOuVKvX9V3edkqfUlDV6ff3dHDD2mqXOBjqkAS7061U3u8R0U84vgG8xeEDb6jNyHwBKymeY4oegDfIFxo7kC%2Fh9Z1zfdbeCJyc9NPsD%2FjME68NHgN4PE6mxDmFjagdnZnl15TbWGixrEE2FA%2BvTOgtwEfp5WLXiXqAXiieJMldyeg%2BaXZrN6osMOa0qgULgzEIeIhHQtue0bnF8bh3XgE71JvEdfJGWlmm6f5SVoBiCPnj60%2FwTS1rMR680Kzdc&X-Amz-Signature=ee5571e029f693e2e834e0ad68106b61297532bb140413386cc9c1e858b72447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XFXEUTO%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCrpcRGgdgvo9NxUYugB%2FFkLI0GZoulE82jYRdoYhH5WwIhAJNxaj%2FCey6Sj4XQy0ENOPnPZ1AIov%2F5iCl12Iicykz%2FKv8DCBEQABoMNjM3NDIzMTgzODA1Igze6lDDBpbdo1dd1qoq3AMf7mheKMC5joXPVOJ7yldgVJAbiG3IbmiX5U7NrBiXPuxT5%2F56zkTcxCNWLRjALkG6CE%2B%2BvFlqitGuUEwmj1eOs8Kw13rioDfUdI9%2FbfkKSEIUkowl5CfpeF6wZ68s4EajGPtW7h8DfEFOucrT85%2FbwFfXqH%2Bdu9dz%2F9XzPSfIrKvMm91PR7Z9utHLYTd23cKJ3on25WVLW6n%2FNoXFJAknZd2EetAbLJ6Lsp4E%2B%2FzdRCRxF3x01T66S7%2BgHCDUnSNXmtFpkQZDzxY9JAUrpHPLaYIFv2tgy0CQKbuT5gbkK%2BOzw2WNkOSM9BArt892p5o3OvraiHV83FzKsgIT7XKm8tUz9QrqIgTyxismOv8fS5t%2B2gIErssyciJ1w6I5bEDsa2HYFlsbvgFCN1uFpRZN7%2FXBx%2FDBJJkN165Xllg6BA9Jel1YULYnCDojv5sdwtQ%2FhF7p5%2BOM7fb2DuGB%2F3awkNvt2deUTdJabtP0Lrm8mqlw0LDsnFPLiPOn9Mru%2BG6e%2FosbEKDFBrOBGO5xATziQzf61cHjFVB8oVsqVTStKw%2B9D6eTZ1tE32Lb%2BfJ5ed6NyXgn6jwJFlaKx9Au1fTNEvQMJVORzR9GbOuVKvX9V3edkqfUlDV6ff3dHDD2mqXOBjqkAS7061U3u8R0U84vgG8xeEDb6jNyHwBKymeY4oegDfIFxo7kC%2Fh9Z1zfdbeCJyc9NPsD%2FjME68NHgN4PE6mxDmFjagdnZnl15TbWGixrEE2FA%2BvTOgtwEfp5WLXiXqAXiieJMldyeg%2BaXZrN6osMOa0qgULgzEIeIhHQtue0bnF8bh3XgE71JvEdfJGWlmm6f5SVoBiCPnj60%2FwTS1rMR680Kzdc&X-Amz-Signature=ee5571e029f693e2e834e0ad68106b61297532bb140413386cc9c1e858b72447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GENS7OE%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T171926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQD%2Bq%2BOEnanv5tjFPHDgOeG1hF8ctUIbOGgo3t6jKf3CdQIhANMI2vWodsAHX%2B1ipzFTD4tTLlNnWIvczqK7kk81tAjGKv8DCBEQABoMNjM3NDIzMTgzODA1Igwg4ywDOr59vEiUxcgq3AP6aW4TiwM4xUDDzrvCM9S6RERXSiHiqH1fhpfIPagoP3hvk7MSwdi9WBxT%2BgWVjdnr5t4zKesQBN1cIWGbTWCyD8H98BYeNXMdj1hM0JWGQ7FZuXYeR6wBOg8MrZ1uKFpMz3C%2FPV1hwuJg5K%2BHfRRM19sRCa5EgRzzRy%2B1mkxueiStbrydgype9m8vvrF9ZjXX4MI47VDrhKqI9y%2FhpPSnMNlUQhM0PrnZzUTlfdk%2B94D4cgL4TWMjwjlgb9umJ2VgydrSjELPWInAdlGKjVCpGGaK%2FCCjX2cOBBH4pM%2FNzQoLnt0k6c1GJy3YUbSajEXQ6pZtW%2BO4PszPAo8yAfPK7hxXyg9bVcF4gvt1zBxT8mRWE8kKEQkitb7cmWVGgU5h7j1sc72eum3wEClvinAT2nxRl2zImTHGl8t22WObFRG%2FyWiIOmXuSr%2FNM2Yb%2FVX75EXQ84fWTL0JQMPySg0Gams3yT4cBpRN%2BaVjeCS3eh9jthsiMkEg9MBJc%2B43c3FR2hNHRZgx%2FAdHTHMwJcszLAGl47FfsNZroVcmPgXRR%2FJsHsmweKfnzQAdJE4mIbkim3WXjbdMCbwkAz%2BPJ5QY6ex%2Bbfy5t7wMMB5kAfay5%2FszwcJ6NzTxUB4cjjDrmqXOBjqkAQCHxGOmcHiVnltEjo%2FzabT27HADPzP395GKP%2By53IIvgmsvDKfS5rjdGLzBF6dwq6YAkqJuGOL6RmG5NX6OUiwftLhtttiabVq0Zvq7KB1iSUWErp1i3FjDSEiyKg7mH%2BkwntfIA%2FHgZcsGhuf6BeXrF9vL%2B6dnjeB9pgHuFfTwompPcBe0%2F9LktKrexrBgjzGjOn9YPPVQ3qjJbUrr5ufEIGyI&X-Amz-Signature=d0f7459be4f92be7512a77f1fa34b4ae8a7116f5fb45b1912dcf2aaa1448dd02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

