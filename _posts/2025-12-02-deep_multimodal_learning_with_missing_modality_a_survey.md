---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAK6GUPC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJEMEICIFo5WDKrIN28MBqG05vbpiafrYr1eOSMYMhZsV6A1BMrAh4QTrRri9ts1KwQjEJzpGWuKyZAYd15Vyy6J6jaIe8q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDN6Qx0puUMOrtmyxVCrcAxTvfFl6p00UN%2BcVqV1puF%2BUOJXMW4ZvOLLXZxJe59ffzEBsDeV6hKrsrLK%2FobuGztPE3xzRSs0mO6G3h3qFuu9x5a8dBIl6WHGz%2FGR7C8Xlkcrh5X6JPwrs61SoKwfrdHqJNFW7SGlH7DdJCSLV6tGsK8Gc04c%2B9wnVwLi4PDBuwttvmgFz2TAZZGDRNYhY0ue4GUr0DHeVbrsqMw2B7zt4MKn9QE7GRSHilkc4ko0wtP2D1Y%2FVPmmL1BrXFBcB3EBdJjgyah7XmrcWqVpKv1%2BrUGQvzNY8sIeGlCmjxShTu06QHC32JGo08I247vqkrJCUiAxVRY0G1TOFSLAMHEv14IrQ3EZSchBvLy8xKIIVhQwx4lWTGAgYIFrD%2BTkoPgGREv5zHW9E40sDZoY4xOqnpg16uj7lgCvaB3tM5ktg55qAnHcvkUlj52SmIaa5cDn9%2B6iY9zXcqOpN3%2BEwAhyEFFW2bXBBR8T5Imv0EnblhGrho%2Bx%2FvV4DO3ywEJzhMIld7D0oSNvcBXN7ZXf176IRd8Z%2B2WDiz1Zj71WfN0z3aDu2%2FTJC44FaOMBdmmXoETR%2FfR2bda8vavObm9dLipj6MQoRZ3jTmarmCiE8zPdfkb6dJkCsfFz0LjQoMLGGuckGOqgB7lZ5ll8YArncM3UhjStt9xm2ydv0IxXuwwS013gp6W6ny8dQEf3h%2BK9IQeYi1b0mk77bom9Pv1MBWQzjaq3vFq6VsKlvqiUFj18tZxBuW03TWp1MrSyhM55IoYK%2BaPLjj%2BKN4YiMMqE2TN%2FdDviQTvansnWbkr1pQRU4xv7m%2FijBjkQUxr616uGrNwQr6szb6ZmZ8ff579oLTSCIuVmrU6vK5WOVc08n&X-Amz-Signature=2e2dfdcca8f93a2527c73755c0efd8b65bf9b075f9ba84c62e610cde77cbbd3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAK6GUPC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJEMEICIFo5WDKrIN28MBqG05vbpiafrYr1eOSMYMhZsV6A1BMrAh4QTrRri9ts1KwQjEJzpGWuKyZAYd15Vyy6J6jaIe8q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDN6Qx0puUMOrtmyxVCrcAxTvfFl6p00UN%2BcVqV1puF%2BUOJXMW4ZvOLLXZxJe59ffzEBsDeV6hKrsrLK%2FobuGztPE3xzRSs0mO6G3h3qFuu9x5a8dBIl6WHGz%2FGR7C8Xlkcrh5X6JPwrs61SoKwfrdHqJNFW7SGlH7DdJCSLV6tGsK8Gc04c%2B9wnVwLi4PDBuwttvmgFz2TAZZGDRNYhY0ue4GUr0DHeVbrsqMw2B7zt4MKn9QE7GRSHilkc4ko0wtP2D1Y%2FVPmmL1BrXFBcB3EBdJjgyah7XmrcWqVpKv1%2BrUGQvzNY8sIeGlCmjxShTu06QHC32JGo08I247vqkrJCUiAxVRY0G1TOFSLAMHEv14IrQ3EZSchBvLy8xKIIVhQwx4lWTGAgYIFrD%2BTkoPgGREv5zHW9E40sDZoY4xOqnpg16uj7lgCvaB3tM5ktg55qAnHcvkUlj52SmIaa5cDn9%2B6iY9zXcqOpN3%2BEwAhyEFFW2bXBBR8T5Imv0EnblhGrho%2Bx%2FvV4DO3ywEJzhMIld7D0oSNvcBXN7ZXf176IRd8Z%2B2WDiz1Zj71WfN0z3aDu2%2FTJC44FaOMBdmmXoETR%2FfR2bda8vavObm9dLipj6MQoRZ3jTmarmCiE8zPdfkb6dJkCsfFz0LjQoMLGGuckGOqgB7lZ5ll8YArncM3UhjStt9xm2ydv0IxXuwwS013gp6W6ny8dQEf3h%2BK9IQeYi1b0mk77bom9Pv1MBWQzjaq3vFq6VsKlvqiUFj18tZxBuW03TWp1MrSyhM55IoYK%2BaPLjj%2BKN4YiMMqE2TN%2FdDviQTvansnWbkr1pQRU4xv7m%2FijBjkQUxr616uGrNwQr6szb6ZmZ8ff579oLTSCIuVmrU6vK5WOVc08n&X-Amz-Signature=2e2dfdcca8f93a2527c73755c0efd8b65bf9b075f9ba84c62e610cde77cbbd3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNQZBOSJ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDQIHLcTjykWCV6sGdlYz93olj0wgxUfNtmpTlCDh7KHQIhAKyneIWsYkW8LvqMyrsD21FIXiswYqewVH1dFMWovOrjKv8DCAsQABoMNjM3NDIzMTgzODA1IgwJJc0KaEs98iSQw8Yq3AN17rR3%2BM%2FWpiWWEA8Z4VuQaSJsuUuP2iwwgBLvxx1E%2FbfY9V9fpjUP8Lh47v88TITlN7%2BwuqfDeeRBifYXS3uiiOWJLShPsRkXpkxtCW4GCUWlME2kyK91NMw%2Be%2FDqUQbu6wgicFun8f82GVMskUn9IHYxHG7ufVSTCVBjZSMCMUqx5ro%2B%2BWxaNW7LSEopx%2FlIG7mD5lwvrE6gHrkvn%2F7ilAmuhCRxLsk6FbZ50M6s361e9HdNoNtub0gU%2FyLHFip8hkyM7gDrHk54D1%2FUMr6UUME5kcsNc%2BU1sH0kFJ5ocuwgte0Ld7WgTb30CcFvuwlob7Zx09xVD6KSyD6wmd3wtsJVuIAF3hdkpOdc%2F6G6OxgJICeuqAEs28uJnsPg%2FuyXLroHHlNQnNl4DdUD%2F8mif0UsCyDgjcnZJovRNYW5RAWVAHAsRLKKbtzj8CnFYa4D1Csb%2FKtqDxZH2gTcX6C6avQ5Gh8jpG8foDqpFBUInGfTDXI%2FgJZTdNfz%2FM5XjY2l9LABA9ttqRioMpa3Djp4JedKyiqnh3ZwRiSa0nLTaaRagDzh5sGfpbh2O%2BSuCev4iP3p3sn84OZWJluwDD%2FmbANYOnBbHRJD7OcRFu1azNRJfvqDZjbZPj0F8DC0h7nJBjqkAYZkVH65fRSZ0B6yNWLNBY15VoptuR08xtI09UMs%2FCELeM%2BORmgChBBM93nkOf3WaPbq49gFTJFazihEjKzfkItt51uARHVtO8POySvkcDwvTvGb7rgHJ%2FRDOQ8zoCkRVWnhMVwsuCLV%2Bwf9eKYaNNLZffA5SEIELj9ry%2FeeinfFIj8TZrXKDUc1hsWv5UMEH9KEBAYXwbmf8S%2BlWHWMfxuqIPx%2F&X-Amz-Signature=af0be5809c1ea095b9f2a05e9098b062513b9d896ceb1d4868053adb676b19aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNQZBOSJ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDQIHLcTjykWCV6sGdlYz93olj0wgxUfNtmpTlCDh7KHQIhAKyneIWsYkW8LvqMyrsD21FIXiswYqewVH1dFMWovOrjKv8DCAsQABoMNjM3NDIzMTgzODA1IgwJJc0KaEs98iSQw8Yq3AN17rR3%2BM%2FWpiWWEA8Z4VuQaSJsuUuP2iwwgBLvxx1E%2FbfY9V9fpjUP8Lh47v88TITlN7%2BwuqfDeeRBifYXS3uiiOWJLShPsRkXpkxtCW4GCUWlME2kyK91NMw%2Be%2FDqUQbu6wgicFun8f82GVMskUn9IHYxHG7ufVSTCVBjZSMCMUqx5ro%2B%2BWxaNW7LSEopx%2FlIG7mD5lwvrE6gHrkvn%2F7ilAmuhCRxLsk6FbZ50M6s361e9HdNoNtub0gU%2FyLHFip8hkyM7gDrHk54D1%2FUMr6UUME5kcsNc%2BU1sH0kFJ5ocuwgte0Ld7WgTb30CcFvuwlob7Zx09xVD6KSyD6wmd3wtsJVuIAF3hdkpOdc%2F6G6OxgJICeuqAEs28uJnsPg%2FuyXLroHHlNQnNl4DdUD%2F8mif0UsCyDgjcnZJovRNYW5RAWVAHAsRLKKbtzj8CnFYa4D1Csb%2FKtqDxZH2gTcX6C6avQ5Gh8jpG8foDqpFBUInGfTDXI%2FgJZTdNfz%2FM5XjY2l9LABA9ttqRioMpa3Djp4JedKyiqnh3ZwRiSa0nLTaaRagDzh5sGfpbh2O%2BSuCev4iP3p3sn84OZWJluwDD%2FmbANYOnBbHRJD7OcRFu1azNRJfvqDZjbZPj0F8DC0h7nJBjqkAYZkVH65fRSZ0B6yNWLNBY15VoptuR08xtI09UMs%2FCELeM%2BORmgChBBM93nkOf3WaPbq49gFTJFazihEjKzfkItt51uARHVtO8POySvkcDwvTvGb7rgHJ%2FRDOQ8zoCkRVWnhMVwsuCLV%2Bwf9eKYaNNLZffA5SEIELj9ry%2FeeinfFIj8TZrXKDUc1hsWv5UMEH9KEBAYXwbmf8S%2BlWHWMfxuqIPx%2F&X-Amz-Signature=af0be5809c1ea095b9f2a05e9098b062513b9d896ceb1d4868053adb676b19aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKO5RICM%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDlVeaNsYsmywKE0AYPAGgXy44AbOxOjAPjFUy2irEZVgIhAMshH4mH6XgMiJn4s5wRJezUB21PdFEEmT2krvwUP8p4Kv8DCAsQABoMNjM3NDIzMTgzODA1IgyyUhx0kqi23XkMVpIq3AMxquW2t3qdo88RBGOdx%2FMAv3jYNMqMBezc5OXQcpqyhS%2Fk24YozS9xdPTkcaRptPtw2WtYi4VHsjBq5MJLgm1yJLPPiH95ilWHDY3lzoXuDVnF2mpWze9oFcwtipoJhe5AdyioOur0PYfIhivDadribwkNYbbzhUnGhBLyU3Z6uhWRT8pN9rXqsXf9vHUmBeBRvMHggnBs7IyokJgZJDW1ue4jYi2UH0ToOB1jZxThPCdo9ik0zX5wzR7u6rOovtqHh%2BW2qPD3ziqqJXrmSGNjtpbZkai%2F4TOzy6ZNmOduPttteIGMQbt8liMxvMv0vhCa1oQk%2FtbbxXL1INbPxcX1rDj%2BsfKVDH5j3GJrNMajbs6fhxwRNHrgVerKPjnmBMvaNXKeqwSkaRHZ82cr5ozsNREE5k6ZVsyoJKJVS%2FSLvUFfh0FUkrpWu5Sax93v5m4VddWjgCXvD6ufJJ0W37r2X9hsj4R7foYJCNJeZr8dUfE0MO07ETW%2B5C2gH2J15XeMohtYSLLFx%2Fi4QVFfhdlSQTUMK5%2FIBr9ztm8CPd58osZ8cMAIA3O6w0Txc1xdPcaGLe7HpbBNyeiCy8V1kUDJv%2Bvsd2nFIzZAd37%2BulECsKup0KC9qoGECxQnjDC7h7nJBjqkAeXQTRfpnu3%2FKtutAkJakIXHFr94jSsquz9BTEUUPwOyVxULCyLkBZBfL4Z4u0iuv3j3HeW93J5egrCzZ5UoNJ5AejI%2FqIK46XCqMV0ZQKsKc27XgjRoU2ig8GTj7o7B3EZ8JCdJmIAoMi5tPz9R3hrnlRKPcZz0kgQlCIHcZm972Zq4FQK5NSitlaACtvXWwIHMOyQctxwW4PPkK5COjjHAIakS&X-Amz-Signature=c816b3b40b2def09f7b4497c2209e80078545c76508081089f60d2267d9d38d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654A6GFK2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIA7AGQs43EdtrdsMOhfZ5ODjOlA8FXtR5sQio2lV43m1AiEAzk%2BDptB5amYNTu%2Bfzf67oCNq6Uhr7kHEKm35Btd5OzEq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDFCywKHDM7%2BgtaYAFyrcA51PkXRDAGbW1gO4qBr4ibi8yFQJFYPPPSZ8UuLOwUNdHFhuTzNFMM11%2B8qLFFuzQyHOUmp1K85H6N5MkPcYsXqVnxC6EgrfhW0rXAdGyZi46nd%2BvNg0KNBHByYFmGuY%2FeT%2B7j5u7gBqgOSa4sP1wnFvGqynfyn5lD7zPNX9O3GyKzTswUW4l%2FU9QkGX4UJvrsT6sQcdzT3yaHN1ANtkQ3CDmaEYQhfCtBwjNbLQUU3GXNArqnl3DL4uP0Ll4Yk7cbi9q2Lqr6asNnkCgnEobRnKSVJCpMOh%2Blm2wIdPKjyshGhPvH13gkPhiISDh2Td%2BX%2BMwkyLG%2FYkT2h4IEIY9qEULXe56%2F%2FOTMKUvFEjSQ%2BfwkL6uSgjJgCBqLto%2BvYqrVc1ZE781JJ6GkD%2FUujaaz1PByOhHGfcQjbV2dbkH93vwdACZhReOnHpmJpIEGNlGtgtshZhywdZ4i3Vyj6ZLnr%2BjPo%2BiwXIhSdk4Fec48emaQZZjPNJ%2F9BPvHh8pmEJipvUsh9WEBUw8uVeyax6McZXHNYNy3Wtn6PpgE3iZFRNjp%2Fi5WfC44G7Zr2h%2BTJUahbkyf%2FK2YJ2vR6962HAVSK159q0%2ByYq3hRU6vDAX74LDglIm8X5LBzKhEZqMJKHuckGOqUBRT9tTLBpPh0ZS0mkKKA3hpfKWMSDw5kfWB7Z5VZuxK1iBrsQiFaPeB4mDJDkxreT6xEKM0DmVKq8%2Ftw0Ji%2Br67FVuPmqd8fOLODNHpS6tJ2377f3Kyas5GGz8kCfmUBAeIuVgGovxMJZXhP3dMVdwsc3h5GCvHm76bI61Y0iN7QotJKl72XMVAo%2FSUwWE2g7I2HaaTPFZtuOVuByD1U%2BQt2oUop%2F&X-Amz-Signature=0740c41e45cdfa92c6bd335886c84908ce9cca491decf0545188b63ca853b75b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654A6GFK2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T022831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIA7AGQs43EdtrdsMOhfZ5ODjOlA8FXtR5sQio2lV43m1AiEAzk%2BDptB5amYNTu%2Bfzf67oCNq6Uhr7kHEKm35Btd5OzEq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDFCywKHDM7%2BgtaYAFyrcA51PkXRDAGbW1gO4qBr4ibi8yFQJFYPPPSZ8UuLOwUNdHFhuTzNFMM11%2B8qLFFuzQyHOUmp1K85H6N5MkPcYsXqVnxC6EgrfhW0rXAdGyZi46nd%2BvNg0KNBHByYFmGuY%2FeT%2B7j5u7gBqgOSa4sP1wnFvGqynfyn5lD7zPNX9O3GyKzTswUW4l%2FU9QkGX4UJvrsT6sQcdzT3yaHN1ANtkQ3CDmaEYQhfCtBwjNbLQUU3GXNArqnl3DL4uP0Ll4Yk7cbi9q2Lqr6asNnkCgnEobRnKSVJCpMOh%2Blm2wIdPKjyshGhPvH13gkPhiISDh2Td%2BX%2BMwkyLG%2FYkT2h4IEIY9qEULXe56%2F%2FOTMKUvFEjSQ%2BfwkL6uSgjJgCBqLto%2BvYqrVc1ZE781JJ6GkD%2FUujaaz1PByOhHGfcQjbV2dbkH93vwdACZhReOnHpmJpIEGNlGtgtshZhywdZ4i3Vyj6ZLnr%2BjPo%2BiwXIhSdk4Fec48emaQZZjPNJ%2F9BPvHh8pmEJipvUsh9WEBUw8uVeyax6McZXHNYNy3Wtn6PpgE3iZFRNjp%2Fi5WfC44G7Zr2h%2BTJUahbkyf%2FK2YJ2vR6962HAVSK159q0%2ByYq3hRU6vDAX74LDglIm8X5LBzKhEZqMJKHuckGOqUBRT9tTLBpPh0ZS0mkKKA3hpfKWMSDw5kfWB7Z5VZuxK1iBrsQiFaPeB4mDJDkxreT6xEKM0DmVKq8%2Ftw0Ji%2Br67FVuPmqd8fOLODNHpS6tJ2377f3Kyas5GGz8kCfmUBAeIuVgGovxMJZXhP3dMVdwsc3h5GCvHm76bI61Y0iN7QotJKl72XMVAo%2FSUwWE2g7I2HaaTPFZtuOVuByD1U%2BQt2oUop%2F&X-Amz-Signature=0740c41e45cdfa92c6bd335886c84908ce9cca491decf0545188b63ca853b75b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

